// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHrO2fGAy2rknqLX_dtc8rIbVk4TUh5e4",
  authDomain: "chat-app-c9e02.firebaseapp.com",
  projectId: "chat-app-c9e02",
  storageBucket: "chat-app-c9e02.appspot.com",
  messagingSenderId: "410243387559",
  appId: "1:410243387559:web:08c3202f8d3fd76e5fcb82",
  measurementId: "G-VX5KGV820T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default firebase;