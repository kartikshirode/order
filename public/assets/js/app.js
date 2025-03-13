/*
  Customer Ordering Script
  - Renders menu items by category
  - Manages order selections
  - Simulates order submission (e.g., via a backend API)
*/

// Simulated menu data (in a real app, fetch this from your backend)
const menuData = {
  "Main Course": [
    { id: "1", name: "Grilled Chicken", description: "Juicy grilled chicken", price: 12.99 },
    { id: "2", name: "Beef Steak", description: "Tender steak cooked to perfection", price: 19.99 }
  ],
  "Drinks": [
    { id: "3", name: "Coke", description: "Refreshing cola", price: 2.99 },
    { id: "4", name: "Orange Juice", description: "Fresh squeezed", price: 3.99 }
  ],
  "Roti": [
    { id: "5", name: "Butter Roti", description: "Soft and buttery", price: 1.99 }
  ],
  "Rice": [
    { id: "6", name: "Fried Rice", description: "Special fried rice with veggies", price: 8.99 }
  ]
};

// Parse table number from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const tableNumber = urlParams.get('table') || 'Unknown';
document.getElementById('tableNumber').textContent = tableNumber;

// Global variable to store selected order items
let selectedOrderItems = [];

// Render menu items based on the selected category
function renderMenuItems(category) {
  const menuItemsDiv = document.getElementById('menuItems');
  menuItemsDiv.innerHTML = '';
  
  const items = menuData[category];
  if (!items || items.length === 0) {
    menuItemsDiv.innerHTML = '<p>No items available in this category.</p>';
    return;
  }
  
  items.forEach(item => {
    const dishCard = document.createElement('div');
    dishCard.className = 'menu-item';
    dishCard.innerHTML = `
      <h4>${item.name}</h4>
      <p>${item.description}</p>
      <p>Price: $${item.price.toFixed(2)}</p>
      <button data-id="${item.id}">Add to Order</button>
    `;
    menuItemsDiv.appendChild(dishCard);
  });
  
  // Attach event listeners for "Add to Order" buttons
  document.querySelectorAll('.menu-item button').forEach((btn) => {
    btn.addEventListener('click', function() {
      const itemId = this.getAttribute('data-id');
      const item = menuData[category].find(i => i.id === itemId);
      if (item) {
        selectedOrderItems.push(item);
        updateSelectedItems();
      }
    });
  });
}

// Update the order summary display
function updateSelectedItems() {
  const selectedItemsList = document.getElementById('selectedItems');
  selectedItemsList.innerHTML = '';
  selectedOrderItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    // Remove button for each selected item
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.style.marginLeft = '10px';
    removeBtn.addEventListener('click', () => {
      selectedOrderItems.splice(index, 1);
      updateSelectedItems();
    });
    li.appendChild(removeBtn);
    selectedItemsList.appendChild(li);
  });
}

// Event listener for category navigation clicks
document.querySelectorAll('.menu-nav ul li').forEach((navItem) => {
  navItem.addEventListener('click', function() {
    document.querySelectorAll('.menu-nav ul li').forEach(item => item.classList.remove('active'));
    this.classList.add('active');
    const category = this.getAttribute('data-category');
    renderMenuItems(category);
  });
});

// Load default category ("Main Course") on page load
renderMenuItems('Main Course');

// Handle order submission (simulate sending order data)
document.getElementById('submitOrder').addEventListener('click', () => {
  if (selectedOrderItems.length === 0) {
    alert('Please add at least one dish to your order.');
    return;
  }
  
  const orderData = {
    table: tableNumber,
    items: selectedOrderItems,
    status: 'Waiting',
    timestamp: new Date().toISOString()
  };
  
  // Simulate order submission (e.g., via a backend API call)
  console.log('Order submitted:', orderData);
  alert('Order submitted successfully!');
  
  // Clear the current order
  selectedOrderItems = [];
  updateSelectedItems();
});
