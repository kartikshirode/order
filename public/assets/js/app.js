// Initialize Firebase (replace with your own config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ... other config options
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Get table number from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const tableNumber = urlParams.get('table') || 'Unknown';
document.getElementById('tableNumber').textContent = tableNumber;

// Global variable to store selected order items
let selectedOrderItems = [];

// Function to render menu items based on category
function renderMenuItems(category) {
  const menuItemsDiv = document.getElementById('menuItems');
  menuItemsDiv.innerHTML = '<p>Loading menu items...</p>';
  
  db.collection('menu')
    .where('category', '==', category)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        menuItemsDiv.innerHTML = '<p>No items available in this category.</p>';
        return;
      }
      menuItemsDiv.innerHTML = '';
      snapshot.forEach((doc) => {
        const dish = doc.data();
        // Create a card for each dish
        const dishCard = document.createElement('div');
        dishCard.className = 'menu-item';
        dishCard.innerHTML = `
          <h4>${dish.name}</h4>
          <p>${dish.description || ''}</p>
          <p>Price: $${dish.price ? dish.price.toFixed(2) : '0.00'}</p>
          <button data-id="${doc.id}">Add to Order</button>
        `;
        menuItemsDiv.appendChild(dishCard);
      });
      
      // Attach event listeners for "Add to Order" buttons
      document.querySelectorAll('.menu-item button').forEach((btn) => {
        btn.addEventListener('click', function() {
          const dishId = this.getAttribute('data-id');
          // Retrieve dish details and add to order
          db.collection('menu').doc(dishId).get().then((doc) => {
            if (doc.exists) {
              const dishData = doc.data();
              selectedOrderItems.push({ id: dishId, ...dishData });
              updateSelectedItems();
            }
          });
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching menu items: ", error);
      menuItemsDiv.innerHTML = '<p>Error loading menu items.</p>';
    });
}

// Function to update the order summary display
function updateSelectedItems() {
  const selectedItemsList = document.getElementById('selectedItems');
  selectedItemsList.innerHTML = '';
  selectedOrderItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price ? item.price.toFixed(2) : '0.00'}`;
    // Optional: add a remove button for each selected item
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

// Event listener for navigation bar category clicks
document.querySelectorAll('.menu-nav ul li').forEach((navItem) => {
  navItem.addEventListener('click', function() {
    // Remove active class from all items and set for clicked category
    document.querySelectorAll('.menu-nav ul li').forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
    const category = this.getAttribute('data-category');
    renderMenuItems(category);
  });
});

// Load default category ("Main Course") on page load
renderMenuItems('Main Course');

// Handle order submission
document.getElementById('submitOrder').addEventListener('click', () => {
  if (selectedOrderItems.length === 0) {
    alert('Please add at least one dish to your order.');
    return;
  }
  
  const orderData = {
    table: tableNumber,
    items: selectedOrderItems,
    status: 'Waiting',
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  db.collection('orders')
    .add(orderData)
    .then(() => {
      alert('Order submitted successfully!');
      selectedOrderItems = [];
      updateSelectedItems();
    })
    .catch((error) => {
      console.error("Error submitting order: ", error);
      alert('There was an error submitting your order. Please try again.');
    });
});
