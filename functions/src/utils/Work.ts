import { Work } from "../lib/types";

export const getFromDoc = (doc: FirebaseFirestore.DocumentSnapshot): Work => {
  const data = doc.data() || {};
  const { backgroundImage = "", date = -1, title = "", url = "" } = data;
  return {
    backgroundImage,
    date,
    id: doc.id,
    title,
    url,
  };
};

export const getFromDocs = (
  docs: FirebaseFirestore.QueryDocumentSnapshot[]
): Array<Work> => {
  const work: Array<Work> = [];
  docs.forEach((doc) => {
    if (doc.exists) {
      work.push(getFromDoc(doc));
    }
  });
  return work;
};
