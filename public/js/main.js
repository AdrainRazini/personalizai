// Importações do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRrvG3NIL_SdUIRTslSOzKG-B9lmH8LaA",
  authDomain: "personalizai-login-data.firebaseapp.com",
  projectId: "personalizai-login-data",
  storageBucket: "personalizai-login-data.appspot.com",
  messagingSenderId: "1044986495943",
  appId: "1:1044986495943:web:21db46ad8b5a8694700fe2",
  measurementId: "G-FKL4MNFS4E"
};


// Inicializando Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'pt-BR';
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Provedor do Google
const provider = new GoogleAuthProvider();

// Função para login com Google e salvar dados no Firestore
export function loginWithGoogle() {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;

      // Salvar dados no localStorage
      localStorage.setItem("username", user.displayName);
      localStorage.setItem("useremail", user.email);
      localStorage.setItem("userphoto", user.photoURL);

      // Criar ou atualizar documento no Firestore
      try {
        await setDoc(doc(db, "users", user.email), {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          createdAt: new Date().toISOString()
        });
        console.log("Usuário salvo no Firestore com sucesso!");
      } catch (e) {
        console.error("Erro ao salvar usuário no Firestore:", e);
      }

      // Redirecionar após login
      window.location.href = "user-dashboard.html";
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);
    });
}