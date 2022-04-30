// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQxQ4syHRVvvF4h739XqOUtwBrIatiNHQ",
  authDomain: "todo-app-6ccfe.firebaseapp.com",
  projectId: "todo-app-6ccfe",
  storageBucket: "todo-app-6ccfe.appspot.com",
  messagingSenderId: "508724601905",
  appId: "1:508724601905:web:6ffdac9180105c4f08e110"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export  {db,auth,app};
