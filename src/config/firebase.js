import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFWVZ7abCpH_Nlzb4fouL1F0_A9BR1bV4",
  authDomain: "synapsecode-5282c.firebaseapp.com",
  projectId: "synapsecode-5282c",
  storageBucket: "synapsecode-5282c.appspot.com",
  messagingSenderId: "178312691103",
  appId: "1:178312691103:web:b629ae1da1648ddf9f11aa",
  measurementId: "G-R978SEFMTV",
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

// ✅ Set Auth Persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Firebase Auth Persistence Set to Local"))
  .catch((error) => console.error("Firebase Auth Persistence Error:", error));

// ✅ Fix Firebase Analytics (Only run in client-side)
let analytics;
if (typeof window !== "undefined") {
  import("firebase/analytics")
    .then(({ getAnalytics }) => {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized");
    })
    .catch((error) => console.error("Firebase Analytics Error:", error));
}

export { auth, db, rtdb };
export default app;
