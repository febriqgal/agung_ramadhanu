// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlINKqBIarGI6oHbI9sDjgXVok05ZiQ7s",
  authDomain: "agung-ramadhanu-13d08.firebaseapp.com",
  projectId: "agung-ramadhanu-13d08",
  storageBucket: "agung-ramadhanu-13d08.appspot.com",
  messagingSenderId: "27627339866",
  appId: "1:27627339866:web:6128c362fb8c1454575863",
  measurementId: "G-GVZCEYY6Y4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const FirebaseStorage = getStorage(app);
const auth = getAuth(app);
export { db, FirebaseStorage, auth };
export const Authentication = () => {
  return auth;
};
export default app;
