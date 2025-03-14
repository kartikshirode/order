// Import Firebase config if needed (for future Storage/Authentication usage)
// import { getAuth } from "./firebase-config.js";

// Simulated menu data (in a real app, fetch from a backend or Firebase)
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

// Grab elements
const customerLoginDiv = document.getElementById('customerLogin');
const orderingInterfaceDiv = document.getElementById('orderingInterface');
const tableLoginForm = document.getElementById('tableLoginForm');
const tableInput = document.getElementById('tableInput');
const tableNumberDisplay = document.getElementById('tableNumberDisplay'); // in header
const tableNumberSpan = document.getElementById('tableNumber'); // in order container
const menuItemsDiv = document.getElementById('menuItems');
const selectedItemsList = document.getElementById('selectedItems');
const payWebappBtn = document.getElementById('payWebapp');
const payCashierBtn = document.getElementById('payCashier');

let selectedOrderItems = [];

// Initialize customer session
function initCustomerSession() {
  const tableNum = localStorage.getItem('tableNumber');
  if (tableNum) {
    // Hide login, show ordering interface
    customerLoginDiv.classList.add('hidden');
    orderingInterfaceDiv.classList.remove('hidden');
    tableNumberDisplay.textContent = tableNum;
    tableNumberSpan.textContent = tableNum;
    // Optionally, load default category menu items
    renderMenuItems('Main Course');
  } else {
    // Show login, hide ordering interface
    customerLoginDiv.classList.remove('hidden');
    orderingInterfaceDiv.classList.add('hidden');
  }
}

initCustomerSession();

// Handle table login form submission
if (tableLoginForm) {
  tableLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tableNum = tableInput.value.trim();
    if (tableNum !== "") {
      localStorage.setItem('tableNumber', tableNum);
      initCustomerSession(); // reinitialize to show ordering interface
    } else {
      alert("Please enter a valid table number.");
    }
  });
}

// Render menu items for the given category
function renderMenuItems(category) {
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
  
  // Attach event listeners for each "Add to Order" button
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
  selectedItemsList.innerHTML = '';
  selectedOrderItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
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

// Handle category navigation
document.querySelectorAll('.menu-nav ul li').forEach((navItem) => {
  navItem.addEventListener('click', function() {
    document.querySelectorAll('.menu-nav ul li').forEach(item => item.classList.remove('active'));
    this.classList.add('active');
    const category = this.getAttribute('data-category');
    renderMenuItems(category);
  });
});

// Load default category on page load if ordering interface is visible
if (!orderingInterfaceDiv.classList.contains('hidden')) {
  renderMenuItems('Main Course');
}

// Payment options: simulate payment processing and clear session
payWebappBtn.addEventListener('click', () => processPayment("Webapp"));
payCashierBtn.addEventListener('click', () => processPayment("Cashier"));

function processPayment(method) {
  if (selectedOrderItems.length === 0) {
    alert('No order to process.');
    return;
  }
  alert(`Payment processed via ${method}. Thank you!`);
  // Clear the order and update UI
  selectedOrderItems = [];
  updateSelectedItems();
  // Optionally update order status or perform other actions here

  // Clear temporary session so the table is ready for new orders
  localStorage.removeItem('tableNumber');
  // Reload the page to reset the interface
  location.reload();
}
