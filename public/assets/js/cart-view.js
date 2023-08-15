const cartButton = document.querySelector('.get-started-btn');

function getCartItems() {
  console.log(JSON.parse(localStorage.getItem("cart")) || []);


  return JSON.parse(localStorage.getItem("cart")) || [];
}

cartButton.addEventListener('click', async (event) => {
    event.preventDefault();
    getCartItems();
})

// Get cart items from local storage
const cartItems = getCartItems();

// Get the container element
const cartContainer = document.getElementById('cart-container');

// Loop through the cart items and create HTML elements
cartItems.forEach(item => {
  const cartItemDiv = document.createElement('div');
  cartItemDiv.classList.add('cart-item');

  const img = document.createElement('img');
  img.src = item.image;
  img.alt = item.name;
  img.classList.add('item-image');

  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('item-details');
  detailsDiv.textContent = `${item.name} - Quantity: ${item.quantity}, Price: $${item.price}`;

  cartItemDiv.appendChild(img);
  cartItemDiv.appendChild(detailsDiv);
  cartContainer.appendChild(cartItemDiv);
});
