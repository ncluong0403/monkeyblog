import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCaaZGMGmdoig5cScqf0Zg8BHhteNeHiKE",
  authDomain: "monkey--blogging.firebaseapp.com",
  projectId: "monkey--blogging",
  storageBucket: "monkey--blogging.appspot.com",
  messagingSenderId: "724207501446",
  appId: "1:724207501446:web:a791d3c468060fd42b5107",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
