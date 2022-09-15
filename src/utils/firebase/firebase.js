import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCULh7Vo4P1jvQ6kUcE5UQILrw3MYMGqvA",
  authDomain: "udemy-capstone.firebaseapp.com",
  projectId: "udemy-capstone",
  storageBucket: "udemy-capstone.appspot.com",
  messagingSenderId: "845238834097",
  appId: "1:845238834097:web:f8a8a5bcfaf8f67e6ce390",
  measurementId: "G-G7XP7CDNV4",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

const firestoreDB = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(firestoreDB, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating the user ", error.message);
    }
  }
  return userDocRef;
};
