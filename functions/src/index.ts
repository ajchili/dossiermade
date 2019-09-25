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

const getWorkFromDocs = (docs: FirebaseFirestore.QueryDocumentSnapshot[]): Array<Work> => {
  const work: Array<Work> = [];
  docs.forEach(doc => {
    if (doc.exists) {
      const {
        backgroundImage = "",
        date = -1,
        title = "",
        url = ""
      } = doc.data();
      if (title.length > 0 && url.length > 0 && backgroundImage.length > 0) {
        work.push({
          backgroundImage,
          date,
          id: doc.id,
          title,
          url
        });
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