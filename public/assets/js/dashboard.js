// public/assets/js/dashboard.js

const db = firebase.firestore();
const ordersContainer = document.getElementById('ordersContainer');

// Real-time listener for orders collection
db.collection('orders').orderBy('timestamp').onSnapshot(snapshot => {
  ordersContainer.innerHTML = ''; // Clear existing orders
  snapshot.forEach(doc => {
    const order = doc.data();
    const orderDiv = document.createElement('div');
    orderDiv.classList.add('order');
    orderDiv.innerHTML = `
      <p><strong>Table:</strong> ${order.table}</p>
      <p><strong>Fruity Dish:</strong> ${order.items.fruityDish}</p>
      <p><strong>Rice Dish:</strong> ${order.items.riceDish}</p>
      <label for="status-${doc.id}">Status:</label>
      <select id="status-${doc.id}" data-id="${doc.id}" class="status-dropdown">
        <option value="Waiting" ${order.status === 'Waiting' ? 'selected' : ''}>Waiting</option>
        <option value="Cooking" ${order.status === 'Cooking' ? 'selected' : ''}>Cooking</option>
        <option value="Cooked" ${order.status === 'Cooked' ? 'selected' : ''}>Cooked</option>
        <option value="Served" ${order.status === 'Served' ? 'selected' : ''}>Served</option>
        <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
      </select>
      <hr>
    `;
    ordersContainer.appendChild(orderDiv);
  });

  // Update order status on dropdown change
  document.querySelectorAll('.status-dropdown').forEach(dropdown => {
    dropdown.addEventListener('change', function() {
      const orderId = this.getAttribute('data-id');
      const newStatus = this.value;
      db.collection('orders').doc(orderId).update({ status: newStatus })
        .then(() => console.log(`Order ${orderId} updated to ${newStatus}`))
        .catch(error => console.error("Error updating order: ", error));
    });
  });
});

// Logout functionality for dashboards
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
      window.location.href = '/login.html';
    });
  });
}
