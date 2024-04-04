// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyA-7-8NvPFNADEjduqYzrdd2B0e9kEbLjA",
  authDomain: "work-travel-tracker.firebaseapp.com",
  projectId: "work-travel-tracker",
  storageBucket: "work-travel-tracker.appspot.com",
  messagingSenderId: "657782146140",
  appId: "1:657782146140:web:e6a9a68c02f56ddd90d299",
  measurementId: "G-GGDR8DR4EK"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const analytics: Analytics = getAnalytics(app);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
