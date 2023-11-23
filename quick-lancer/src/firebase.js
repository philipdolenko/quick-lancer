import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXvyK3OpIgg49Bg5Sxv0zWznGLNFpBBn4",
  authDomain: "quick-c3616.firebaseapp.com",
  projectId: "quick-c3616",
  storageBucket: "quick-c3616.appspot.com",
  messagingSenderId: "142172732834",
  appId: "1:142172732834:web:19bf46485a73cfc1c106fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider()
export const auth = getAuth(app);