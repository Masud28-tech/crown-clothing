import { initializeApp } from "firebase/app"; // importing the (main thing that is needed to start using firebase auth/db/etc service) firebase app from firebase
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"; // Authentication imports from firebase

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query
} from "firebase/firestore"; // Database imports from firebase


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2-LGM1JM6iHh1oJGX4mwjb35RP7fXiw8",
  authDomain: "crwn-clothing-db-3d541.firebaseapp.com",
  projectId: "crwn-clothing-db-3d541",
  storageBucket: "crwn-clothing-db-3d541.appspot.com",
  messagingSenderId: "74407950256",
  appId: "1:74407950256:web:5b8c731d134e7ffed20875"
};

// INITIALIZATION OF FIREBASE APP
const firebaseApp = initializeApp(firebaseConfig);


// AUTHENTICATION PART
// authentication/permission from Google that a user exits or signed in before (like a confirmation by firebase from Google about user's identity)
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();

// Sign-up with Google popup
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); // for create function (signInWithGooglePopup) that opens a pop-up for sign in using gmail


// DATABASE PART
export const db = getFirestore();

//Fucntion to Create/Add/Store (data i.e collections and objects) in firestore database at firebase
export const addCollectionAndDocumentInFirebase = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);  // 'writeBatch' & batch is for setting/storing objects/documents in collection as Transaction i.e. either done successfully or faild completely.

  // From the list of objects/array storing one by one as a document using foreach loop and batch.set function
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Documents stored successfully in firestore.");
}

// Function to get document/collection from firebase database
export const getCollectionAndDocumentFromFirebase = async () => {
    const collectionRef = collection(db, "categories");
    const que = query(collectionRef);
    const querySnapshot = await getDocs(que);

    const categoryMap = querySnapshot.docs.reduce((accumulate, docsSnapshot) => {
      const {title , items} = docsSnapshot.data();
      accumulate[title.toLowerCase()] = items; 
      return accumulate;
    }, {});

    return categoryMap;
}

// Creating user document(Table) in firebase database
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid); // 'doc' method of firestore to create document & needs {db(database instance), collection name(table name), unique id/key/identifier}
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef); // 'getDoc' methode creates a Snapshot of collection/document reference created by 'doc' method, and further can be used...
  // console.log(userSnapshot.exists());

  // NOW CREATING/SAVING USER DOCUMENT IN THE DATABASE USING "setDoc" METHODE

  // Check: That a user already exist or not in the db
  // If doesn't exits then create it.
  if (!userSnapshot.exists()) {

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInfo }); // Main methode to create/save user document
    }
    catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  // If exist then return 'userDocRef'
  return userDocRef;
}


//CREATING USER WITH EMAIL AND PASSWORD (creating a function which uses firebase methode of 'createUserWithEmailAndPassword')
export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

// Function to sign-in user using email & password
export const signInUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

// Function to sign-out signed in user
export const signOutUser = async () => await signOut(auth);

// Function to track on userAuth state i.e. User is signed-in and signed-out
// It is a event listener that listens authChangeState
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);