// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmWkiLbrHRtQhAXEJaHS2LW3eeg2zsBkU",
  authDomain: "chatgpt-messenger-cd212.firebaseapp.com",
  projectId: "chatgpt-messenger-cd212",
  storageBucket: "chatgpt-messenger-cd212.appspot.com",
  messagingSenderId: "457398358712",
  appId: "1:457398358712:web:e55005dbf2b6ff06c65a4d",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
