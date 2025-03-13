/*
  Admin Menu Management Script
  - Handles form submission to add a new dish.
  - In a real app, you'd send this data to a backend API.
*/

document.getElementById('menuForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const dishName = document.getElementById('dishName').value;
  const dishCategory = document.getElementById('dishCategory').value;
  const dishPrice = parseFloat(document.getElementById('dishPrice').value);
  const dishDescription = document.getElementById('dishDescription').value;
  
  const newDish = {
    id: Date.now().toString(), // Generate a simple unique ID
    name: dishName,
    category: dishCategory,
    price: dishPrice,
    description: dishDescription
  };
  
  // Simulate adding the dish (e.g., sending to your backend)
  console.log('New dish added:', newDish);
  
  const feedback = document.getElementById('menuFeedback');
  feedback.textContent = 'Dish added successfully!';
  feedback.style.color = 'green';
  
  // Optionally, reset the form
  document.getElementById('menuForm').reset();
});
