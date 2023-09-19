const cartButton = document.querySelector(".get-started-btn");
const cartTotalItemsQuantity = document.getElementById(
  "cart-total-items-quantity"
);

function getCartItems() {
  //   console.log(JSON.parse(localStorage.getItem("cart")) || []);
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to remove an item from the cart by its ID
function removeFromCart(itemId) {
  // Get cart data from local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Find the index of the item with the given ID
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    // Remove the item from the cart data array
    cart.splice(itemIndex, 1);

    // Update local storage with the modified cart data
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log(`Item with ID ${itemId} has been removed from the cart.`);
  } else {
    console.log(`Item with ID ${itemId} not found in the cart.`);
  }
}

cartButton.addEventListener("click", async (event) => {
  event.preventDefault();
  getCartItems();
});

// Get cart items from local storage
const cartItems = getCartItems();

// Get the container element
const cartContainer = document.getElementById("cart-container");

// count
let count = 0;
let itemCount = 0;

const cartHeadDiv = document.createElement("h1");
cartHeadDiv.textContent = `Your Cart Items`;
cartContainer.appendChild(cartHeadDiv);

const checkoutDiv = document.createElement("div");
checkoutDiv.classList.add("checkout-div");

// Loop through the cart items and create HTML elements
cartItems.forEach((item) => {
  const cartItemDiv = document.createElement("div");
  cartItemDiv.classList.add("cart-item");

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;
  img.classList.add("item-image");

  const detailsQuantityCont = document.createElement("div");
  detailsQuantityCont.classList.add("details-quantity");

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("item-details");
  let total = item.quantity * item.price;
  detailsDiv.textContent = `${item.name} - $${total}NGN`;

  const quantityChangeDiv = document.createElement("div");
  quantityChangeDiv.classList.add("quantity-change");
  const addBtn = document.createElement("button");
  const miunsBtn = document.createElement("button");
  const quantityState = document.createElement("span");
  addBtn.classList.add("add-sub-btn");
  miunsBtn.classList.add("add-sub-btn");
  quantityState.classList.add("quantity-state");

  addBtn.textContent = "+";
  miunsBtn.textContent = "-";
  quantityState.textContent = item.quantity;

  addBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    item.quantity += 1;
    quantityState.textContent = item.quantity;
    total = item.quantity * item.price;
    detailsDiv.textContent = `${item.name} - $${total}NGN`;
    count += Number(item.price);
    subtotalValue.textContent = `$${count}.00`;

    // Get existing cart data from local storage
    const cart = JSON.parse(window.localStorage.getItem("cart")) || [];

    // i need to get the product that i will update by increasing the quantity in the local storage

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(
      (itemz) => itemz.id === item.id
    );
let numOne = 1;
    cart[existingProductIndex].quantity += Number(numOne);

    // Save updated cart data to local storage
    window.localStorage.setItem("cart", JSON.stringify(cart));
  });
  miunsBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    item.quantity -= 1;
    if (item.quantity === 0) {
      item.quantity = 1;
      total = item.quantity * item.price;
      detailsDiv.textContent = `${item.name} - $${total}NGN`;
    } else {
      quantityState.textContent = item.quantity;
      total = item.quantity * item.price;
      detailsDiv.textContent = `${item.name} - $${total}NGN`;
      count -= Number(item.price);
      subtotalValue.textContent = `$${count}.00`;

      // Get existing cart data from local storage
      const cart = JSON.parse(window.localStorage.getItem("cart")) || [];

      // i need to get the product that i will update by reducing the quantity in the local storage

      // Check if the product is already in the cart
      const existingProductIndex = cart.findIndex(
        (itemz) => itemz.id === item.id
      );

      let numOne = 1;
    cart[existingProductIndex].quantity -= Number(numOne);

      // Save updated cart data to local storage
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  });

  const removeItem = document.createElement("a");
  removeItem.classList.add("remove-item-link");
  removeItem.textContent = "remove item";

  removeItem.addEventListener("click", async (event) => {
    event.preventDefault();
    removeFromCart(item.id);
    count -= total;
    subtotalValue.textContent = `$${count}.00`;
    cartItemDiv.style.display = "none";
  });

  quantityChangeDiv.appendChild(miunsBtn);
  quantityChangeDiv.appendChild(quantityState);
  quantityChangeDiv.appendChild(addBtn);

  count += total;
  itemCount += item.quantity;
  //   console.log(count);

  cartItemDiv.appendChild(img);
  detailsQuantityCont.appendChild(detailsDiv);
  detailsQuantityCont.appendChild(quantityChangeDiv);
  detailsQuantityCont.appendChild(removeItem);
  cartItemDiv.appendChild(detailsQuantityCont);
  cartContainer.appendChild(cartItemDiv);
});

cartTotalItemsQuantity.textContent = itemCount;

const subtotal = document.createElement("h1");
const subtotalValue = document.createElement("h1");
subtotal.textContent = "Subtotal";
subtotalValue.textContent = `$${count}.00`;
checkoutDiv.appendChild(subtotal);
checkoutDiv.appendChild(subtotalValue);
cartContainer.appendChild(checkoutDiv);

const cartCheckout = document.createElement("div");
cartCheckout.classList.add("cart-checkout");
const CheckoutButton = document.createElement("button");
CheckoutButton.classList.add("checkout-button");
CheckoutButton.textContent = "Check-out";

CheckoutButton.addEventListener("click", async (event) => {
  event.preventDefault();
  window.location.href = "http://localhost:4000/checkout2";
});

// Create a link element
// const link = document.createElement("a");
// link.classList.add("checkout-link");
// link.textContent = "Check-out";
// link.href = "/checkout";
// link.target = "_blank";
// //
// CheckoutButton.append(link);

// cartCheckout.appendChild(ViewCartButton);
cartCheckout.appendChild(CheckoutButton);
cartContainer.appendChild(cartCheckout);
