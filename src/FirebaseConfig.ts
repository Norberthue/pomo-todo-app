// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  initializeFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKdUtC5-AFo77EoZ-7uyU4Txd4pgCfMis",
    authDomain: "todo-pomo-app-fc1f8.firebaseapp.com",
    projectId: "todo-pomo-app-fc1f8",
    storageBucket: "todo-pomo-app-fc1f8.firebasestorage.app",
    messagingSenderId: "663827748724",
    appId: "1:663827748724:web:6bab34ddd40c7991fcfe21",
    measurementId: "G-1RW8RSGZDL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true
  })
