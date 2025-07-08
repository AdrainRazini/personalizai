// firebase.js - Centraliza configuração do Firebase

// Importações principais (use uma versão consistente)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";

// Configuração Firebase do projeto
const firebaseConfig = {
  apiKey: "AIzaSyBRrvG3NIL_SdUIRTslSOzKG-B9lmH8LaA",
  authDomain: "personalizai-login-data.firebaseapp.com",
  projectId: "personalizai-login-data",
  storageBucket: "personalizai-login-data.appspot.com",
  messagingSenderId: "1044986495943",
  appId: "1:1044986495943:web:21db46ad8b5a8694700fe2",
  measurementId: "G-FKL4MNFS4E"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

// Exporta para uso nos outros módulos
export { app, db, auth, provider, signInWithPopup, analytics };
