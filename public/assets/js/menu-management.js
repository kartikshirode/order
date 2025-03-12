// Initialize Firebase (replace with your own config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ... other config options
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const menuForm = document.getElementById('menuForm');
const menuFeedback = document.getElementById('menuFeedback');

menuForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const dishName = document.getElementById('dishName').value;
  const dishCategory = document.getElementById('dishCategory').value;
  const dishPrice = parseFloat(document.getElementById('dishPrice').value);
  const dishDescription = document.getElementById('dishDescription').value;
  
  const dishData = {
    name: dishName,
    category: dishCategory,
    price: dishPrice,
    description: dishDescription
  };
  
  db.collection('menu')
    .add(dishData)
    .then(() => {
      menuFeedback.textContent = 'Dish added successfully!';
      menuFeedback.style.color = 'green';
      menuForm.reset();
    })
    .catch((error) => {
      console.error("Error adding dish: ", error);
      menuFeedback.textContent = 'Error adding dish. Please try again.';
      menuFeedback.style.color = 'red';
    });
});
