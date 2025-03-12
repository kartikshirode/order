// public/assets/js/app.js

// Initialize Firebase (replace with your own config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ...other config options
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Parse table number from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const tableNumber = urlParams.get('table') || 'Unknown';
document.getElementById('tableNumber').textContent = tableNumber;

// Handle order submission
document.getElementById('submitOrder').addEventListener('click', () => {
  const fruitSelection = document.getElementById('fruitSelection').value;
  const riceSelection = document.getElementById('riceSelection').value;

  const orderData = {
    table: tableNumber,
    items: {
      fruityDish: fruitSelection,
      riceDish: riceSelection
    },
    status: 'Waiting',
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  db.collection('orders').add(orderData)
    .then(() => alert('Order submitted successfully!'))
    .catch(error => console.error("Error submitting order: ", error));
});
