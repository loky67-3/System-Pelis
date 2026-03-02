import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDepZv4_5QkF36iMJPkGArzb-lpItszJm0",
  authDomain: "movie-app-c61c0.firebaseapp.com",
  projectId: "movie-app-c61c0",
  storageBucket: "movie-app-c61c0.appspot.com",
  messagingSenderId: "121334906363",
  appId: "1:121334906363:web:cc1b7aeb8a1a10041f1f5e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();