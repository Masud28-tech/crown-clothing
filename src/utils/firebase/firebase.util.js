import { initializeApp } from "firebase/app"; // importing the (main thing that is needed to start using firebase auth/db/etc service) firebase app from firebase

import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider} from "firebase/auth"; // Authentication imports from firebase

import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore"; // Database imports from firebase
 

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
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); // for create function (signInWithGooglePopup) that opens a pop-up for sign in using gmail



// DATABASE PART
export const db = getFirestore();

// Creating user document(Table) in firebase database
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid); // 'doc' method of firestore to create document & needs {db(database instance), collection name(table name), unique id/key/identifier}
    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef); // 'getDoc' methode creates a Snapshot of collection/document reference created by 'doc' method, and further can be used...
    // console.log(userSnapshot.exists());

    // NOW CREATING/SAVING USER DOCUMENT IN THE DATABASE USING "setDoc" METHODE

    // Check: That a user already exist or not in the db
    // If doesn't exits then create it.
    if(!userSnapshot.exists()){
      
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {displayName, email, createdAt}); // Main methode to create/save user document
      }
      catch(error){
        console.log("Error creating the user", error.message);
      }
    }
    // If exist then return 'userDocRef'
    return userDocRef;
}