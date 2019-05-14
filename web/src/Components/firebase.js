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

export default app;
export const provider = new firebase.auth.GoogleAuthProvider();
export async function validateUserPermissions() {
  const user = app.auth().currentUser;
  if (user) {
    try {
      let documentSnapshot = await app
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      if (
        documentSnapshot.exists &&
        documentSnapshot.data() &&
        documentSnapshot.data().admin === true
      ) {
        return true;
      } else {
        throw new Error("Insufficient Permissions!");
      }
    } catch (err) {
      app.auth().signOut();
      return false;
    }
  }
}
