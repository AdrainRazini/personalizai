// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRrvG3NIL_SdUIRTslSOzKG-B9lmH8LaA",
  authDomain: "personalizai-login-data.firebaseapp.com",
  projectId: "personalizai-login-data",
  storageBucket: "personalizai-login-data.appspot.com",
  messagingSenderId: "1044986495943",
  appId: "1:1044986495943:web:21db46ad8b5a8694700fe2",
  measurementId: "G-FKL4MNFS4E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
