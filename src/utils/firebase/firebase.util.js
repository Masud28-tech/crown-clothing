import { initializeApp } from "firebase/app"; // importing the (main thing that is needed to start using firebase auth/db/etc service) firebase app from firebase

import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider} from "firebase/auth";
 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2-LGM1JM6iHh1oJGX4mwjb35RP7fXiw8",
  authDomain: "crwn-clothing-db-3d541.firebaseapp.com",
  projectId: "crwn-clothing-db-3d541",
  storageBucket: "crwn-clothing-db-3d541.appspot.com",
  messagingSenderId: "74407950256",
  appId: "1:74407950256:web:5b8c731d134e7ffed20875"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// authentication/permission from Google that a user exits or signed in before (like a confirmation by firebase from Google about user's identity)
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); // for create function (signInWithGooglePopup) that opens a pop-up for sign in using gmail