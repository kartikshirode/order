// Simulated menu data for demonstration purposes
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
const confirmOrderBtn = document.getElementById('confirmOrder');
const payWebappBtn = document.getElementById('payWebapp');
const payCashierBtn = document.getElementById('payCashier');

let selectedOrderItems = [];

// Initialize customer session – check if table number exists
function initCustomerSession() {
  const tableNum = localStorage.getItem('tableNumber');
  if (tableNum) {
    customerLoginDiv.classList.add('hidden');
    orderingInterfaceDiv.classList.remove('hidden');
    tableNumberDisplay.textContent = tableNum;
    tableNumberSpan.textContent = tableNum;
    // Load default category
    renderMenuItems('Main Course');
  } else {
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
      initCustomerSession();
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

// Handle category navigation clicks
document.querySelectorAll('.menu-nav ul li').forEach((navItem) => {
  navItem.addEventListener('click', function() {
    document.querySelectorAll('.menu-nav ul li').forEach(item => item.classList.remove('active'));
    this.classList.add('active');
    const category = this.getAttribute('data-category');
    renderMenuItems(category);
  });
});

// Load default category if ordering interface is visible
if (!orderingInterfaceDiv.classList.contains('hidden')) {
  renderMenuItems('Main Course');
}

// Handle "Confirm Order" button click
if (confirmOrderBtn) {
  confirmOrderBtn.addEventListener('click', () => {
    if (selectedOrderItems.length === 0) {
      alert("No items in your order to confirm.");
      return;
    }
    // In a real app, you would send the order details to your backend/Firebase here.
    alert("Your order has been confirmed and sent to the kitchen and cashier.");
    // Optionally, you might disable further modifications after confirmation.
    // For simulation, you could clear the cart or update order status.
  });
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
  // Clear the temporary session so that the table is free for new orders
  localStorage.removeItem('tableNumber');
  // Reload the page to reset the interface
  location.reload();
}
