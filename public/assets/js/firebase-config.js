import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABLn3WyfzVuwpxVUZTY34Klb10HdpXCJ8",
  authDomain: "order-5e7d1.firebaseapp.com",
  projectId: "order-5e7d1",
  storageBucket: "order-5e7d1.firebasestorage.app",
  messagingSenderId: "495090116429",
  appId: "1:495090116429:web:f50622585d8183190d3904",
  measurementId: "G-ZB2FK2TM8M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
