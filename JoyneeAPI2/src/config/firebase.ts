import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgOo3UUaJbeLey6omQZh3yfvSvWlUbOVQ",
  authDomain: "joynee-5ceb6.firebaseapp.com",
  projectId: "joynee-5ceb6",
  storageBucket: "joynee-5ceb6.firebasestorage.app",
  messagingSenderId: "953253932852",
  appId: "1:953253932852:web:4d25efc15737feb964bf61",
  measurementId: "G-NNZEWDREHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app; 