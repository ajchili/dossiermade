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
      const _work = getWorkFromDoc(doc);
      if (_work.title.length > 0 && _work.url.length > 0 && _work.backgroundImage.length > 0) {
        work.push(_work);
      }
    }
  });
  return work;
}

exports.getRecentWork = functions.https.onCall(async (data: any, _: functions.https.CallableContext) => {
  const { limit = 5 } = data;
  const query = await admin.firestore().collection("work").orderBy("date", "desc").limit(limit * 2).get();
  const work = getWorkFromDocs(query.docs);
  return work.slice(0, limit);
});

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