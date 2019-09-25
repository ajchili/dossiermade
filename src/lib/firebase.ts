import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID
};

const app = firebase.initializeApp(config);

firebase.firestore().enablePersistence();

export default app;
export const provider = new firebase.auth.GoogleAuthProvider();
export const validateUserPermissions = async (): Promise<boolean> => {
  const user = app.auth().currentUser;
  if (user) {
    try {
      let documentSnapshot = await app
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      if (documentSnapshot.exists && documentSnapshot.data() !== undefined) {
        const data = documentSnapshot.data()!;
        const isAdmin = data.admin && data.admin === true;
        if (isAdmin) {
          return true;
        }
      }
      throw new Error("Insufficient Permissions!");
    } catch (err) {
      app.auth().signOut();
      return false;
    }
  }
  return false;
}

export interface Work {
  backgroundImage: string;
  date: number;
  id: string;
  title: string;
  url: string;
}

export const getRecentWork = async (limit: number = 5): Promise<Array<Work>> => {
  const data: any = await firebase.functions().httpsCallable("getRecentWork")({ limit });
  const work = data as Array<Work>;
  return work;
}
