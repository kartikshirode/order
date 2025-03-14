document.getElementById('menuForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const dishName = document.getElementById('dishName').value;
  const dishCategory = document.getElementById('dishCategory').value;
  const dishPrice = parseFloat(document.getElementById('dishPrice').value);
  const dishDescription = document.getElementById('dishDescription').value;
  
  const newDish = {
    id: Date.now().toString(),
    name: dishName,
    category: dishCategory,
    price: dishPrice,
    description: dishDescription
  };
  
  console.log('New dish added:', newDish);
  
  const feedback = document.getElementById('menuFeedback');
  feedback.textContent = 'Dish added successfully!';
  feedback.style.color = 'green';
  
  document.getElementById('menuForm').reset();
});
