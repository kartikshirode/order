import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Handle login on the login page
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userEmail = userCredential.user.email;
        // Simple redirect based on email substring (customize as needed)
        if (userEmail.includes("kitchen")) {
          window.location.href = 'dashboard/kitchen.html';
        } else if (userEmail.includes("cashier")) {
          window.location.href = 'dashboard/cashier.html';
        } else {
          window.location.href = 'dashboard/kitchen.html';
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Login failed: " + error.message);
      });
  });
}

// Protect dashboard and admin pages: redirect to login if not authenticated
onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  if ((path.includes('dashboard') || path.includes('admin')) && !user) {
    window.location.href = '/login.html';
  }
});

// Logout functionality (for dashboard pages)
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
