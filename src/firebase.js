// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: নিচের অংশটুকু আপনার Firebase Console থেকে পাওয়া কনফিগারেশন দিয়ে রিপ্লেস করুন
const firebaseConfig = {
  apiKey: "AIzaSyAnYOH9cJW2KILv0fsTGHwiCQO8cRX-zWM",
  authDomain: "ah-enterprise-web.firebaseapp.com",
  projectId: "ah-enterprise-web",
  storageBucket: "ah-enterprise-web.firebasestorage.app",
  messagingSenderId: "236633749916",
  appId: "1:236633749916:web:5d27be652a305737bcf059",
  measurementId: "G-2E569MD1RY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services to use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;