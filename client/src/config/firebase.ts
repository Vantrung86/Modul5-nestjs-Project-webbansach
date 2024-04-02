// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT003oc0InTyTj2z0hyK7_Y0ybsGYLT2c",
  authDomain: "project-m5-36ea5.firebaseapp.com",
  projectId: "project-m5-36ea5",
  storageBucket: "project-m5-36ea5.appspot.com",
  messagingSenderId: "677067513433",
  appId: "1:677067513433:web:19aff35559b6bc701f5b48",
  measurementId: "G-9THPS0CT9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)