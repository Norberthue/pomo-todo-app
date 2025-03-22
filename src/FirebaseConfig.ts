// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-26uQr2qcoI4DBRex3Jl_hLVLD6cnOFs",
  authDomain: "todo-pomo-app-2.firebaseapp.com",
  projectId: "todo-pomo-app-2",
  storageBucket: "todo-pomo-app-2.firebasestorage.app",
  messagingSenderId: "937519011625",
  appId: "1:937519011625:web:4f0d1607112e490fe5c938",
  measurementId: "G-KRGQDT88ZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true
  })
export const auth = getAuth(app);
