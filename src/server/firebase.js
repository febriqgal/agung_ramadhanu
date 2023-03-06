// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOFOvKfDwgNkQE6Brv2ewiQXS5mVUewxw",
  authDomain: "agung-ramadhanu.firebaseapp.com",
  databaseURL:
    "https://agung-ramadhanu-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "agung-ramadhanu",
  storageBucket: "agung-ramadhanu.appspot.com",
  messagingSenderId: "896506934197",
  appId: "1:896506934197:web:046a8a244faa67c04ddffc",
  measurementId: "G-TCD41S4XQ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
