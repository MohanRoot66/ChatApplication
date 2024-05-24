// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_APIKEY,
  authDomain: "chatproject-8a937.firebaseapp.com",
  projectId: "chatproject-8a937",
  storageBucket: "chatproject-8a937.appspot.com",
  messagingSenderId: "230981617676",
  appId: "1:230981617676:web:78226153dfa98395894629",
  measurementId: "G-VX19NTEKFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()

const analytics = getAnalytics(app);