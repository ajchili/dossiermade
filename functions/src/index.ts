import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

interface Work {
  backgroundImage: string;
  date: number;
  id: string;
  title: string;
  url: string;
}

const getWorkFromDoc = (doc: FirebaseFirestore.DocumentSnapshot): Work => {
  const data = doc.data() || {};
  const {
    backgroundImage = "",
    date = -1,
    title = "",
    url = ""
  } = data;
  return {
    backgroundImage,
    date,
    id: doc.id,
    title,
    url
  };
};

const getWorkFromDocs = (docs: FirebaseFirestore.QueryDocumentSnapshot[]): Array<Work> => {
  const work: Array<Work> = [];
  docs.forEach(doc => {
    if (doc.exists) {
      work.push(getWorkFromDoc(doc));
    }
  });
  return work;
}

const shouldShowWork = (work: Work): boolean => {
  return work.title.length > 0 && work.url.length > 0 && work.backgroundImage.length > 0;
}

const isUidAdmin = async (uid: string): Promise<boolean> => {
  const doc = await admin.firestore().collection("users").doc(uid).get();
  return doc.exists && (doc.data() || {}).admin === true;
}

exports.getAllWork = functions.https.onCall(async (_: any, context: functions.https.CallableContext) => {
  const { uid = "" } = context.auth || {};
  const query = await admin.firestore().collection("work").orderBy("date", "desc").get();
  let work = getWorkFromDocs(query.docs);
  if (uid.length > 0 && await isUidAdmin(uid)) {
    work = work.filter(shouldShowWork);
  }
  return work;
});

exports.getRecentWork = functions.https.onCall(async (data: any, context: functions.https.CallableContext) => {
  const { limit = 5 } = data;
  const { uid = "" } = context.auth || {};
  const query = await admin.firestore().collection("work").orderBy("date", "desc").limit(limit * 2).get();
  let work = getWorkFromDocs(query.docs);
  if (uid.length > 0 && await isUidAdmin(uid)) {
    work = work.filter(shouldShowWork);
  }
  return work.slice(0, limit);
});

exports.getWorkAfterId = functions.https.onCall(async (data: any, context: functions.https.CallableContext) => {
  const { id = null, limit = 5 } = data;
  const { uid = "" } = context.auth || {};
  if (id) {
    const doc = await admin.firestore().collection("work").doc(id).get();
    if (doc.exists) {
      const query = await admin
        .firestore()
        .collection("work")
        .orderBy("date", "desc")
        .limit(limit * 2)
        .startAfter(doc)
        .get();
      let work = getWorkFromDocs(query.docs);
      if (uid.length > 0 && await isUidAdmin(uid)) {
        work = work.filter(shouldShowWork);
      }
      return work.slice(0, limit);
    } else {
      throw new Error("Specified work does not exist!");
    }
  } else {
    throw new Error("No id provided, unable to find work!");
  }
})

exports.getWorkById = functions.https.onCall(async (data: any, _: functions.https.CallableContext) => {
  const { id = null } = data;
  if (id) {
    const doc = await admin.firestore().collection("work").doc(id).get();
    if (doc.exists) {
      return getWorkFromDoc(doc);
    } else {
      throw new Error("Specified work does not exist!");
    }
  } else {
    throw new Error("No id provided, unable to find work!");
  }
});