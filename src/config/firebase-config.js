// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-IlM-2oH_HN4XQa0EC_usGVW06r1JlLQ",
    authDomain: "bat-list-ext.firebaseapp.com",
    projectId: "bat-list-ext",
    storageBucket: "bat-list-ext.appspot.com",
    messagingSenderId: "1078464495377",
    appId: "1:1078464495377:web:7512b964ccb7190f3416b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);