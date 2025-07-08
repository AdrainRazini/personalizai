import { auth, db, provider } from "./firebase.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

auth.languageCode = 'pt-BR';

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    localStorage.setItem("username", user.displayName);
    localStorage.setItem("useremail", user.email);
    localStorage.setItem("userphoto", user.photoURL);

    // Atualiza ou cria documento do usuário na coleção 'clientes', sem apagar campos existentes
    await setDoc(doc(db, "clientes", user.email), {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      lastLogin: new Date().toISOString()
    }, { merge: true });

    window.location.href = "user-dashboard.html";
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    alert("Erro ao fazer login com o Google.");
  }
}
