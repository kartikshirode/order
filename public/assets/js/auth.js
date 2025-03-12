// public/assets/js/auth.js

// (Ensure Firebase is initialized; if already done in another file, avoid reinitializing.)

// Login form submission handling for login.html
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Redirect based on role—here using email as a simple check
        const userEmail = userCredential.user.email;
        if (userEmail.includes("kitchen")) {
          window.location.href = 'dashboard/kitchen.html';
        } else if (userEmail.includes("cashier")) {
          window.location.href = 'dashboard/cashier.html';
        } else {
          // Default redirection
          window.location.href = 'dashboard/kitchen.html';
        }
      })
      .catch(error => {
        console.error("Error signing in: ", error);
        alert("Login failed: " + error.message);
      });
  });
}

// Protect dashboard pages: redirect to login if not authenticated
firebase.auth().onAuthStateChanged(user => {
  const path = window.location.pathname;
  if ((path.includes('dashboard') || path.includes('kitchen.html') || path.includes('cashier.html')) && !user) {
    window.location.href = '/login.html';
  }
});
