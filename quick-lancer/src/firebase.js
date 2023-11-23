// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXvyK3OpIgg49Bg5Sxv0zWznGLNFpBBn4",
  authDomain: "quick-c3616.firebaseapp.com",
  projectId: "quick-c3616",
  storageBucket: "quick-c3616.appspot.com",
  messagingSenderId: "142172732834",
  appId: "1:142172732834:web:19bf46485a73cfc1c106fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();