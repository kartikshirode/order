import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userEmail = userCredential.user.email;
        // Optionally check custom claims for role-based redirection
        auth.currentUser.getIdTokenResult()
          .then((idTokenResult) => {
            const role = idTokenResult.claims.role;
            if (role === 'kitchen') {
              window.location.href = 'dashboard/kitchen.html';
            } else if (role === 'cashier') {
              window.location.href = 'dashboard/cashier.html';
            } else {
              window.location.href = 'dashboard/kitchen.html';
            }
          })
          .catch((error) => {
            console.error("Error getting token result:", error);
          });
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Login failed: " + error.message);
      });
  });
}

onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  if ((path.includes('dashboard') || path.includes('admin')) && !user) {
    window.location.href = '/login.html';
  }
});

if (document.getElementById('logoutBtn')) {
  document.getElementById('logoutBtn').addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        window.location.href = '/login.html';
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  });
}
