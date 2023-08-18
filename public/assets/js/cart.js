const addtocart_form = document.querySelectorAll(".addtocart");
// const itemName = document.getElementById("item-name");
// const itemPrice = document.getElementById("item-price");
// const itemImg = document.getElementById("item-img");
// const itemId = document.getElementById("item-id");

const productCont = document.querySelectorAll(".member");

function addToCart(product) {
  // Get existing cart data from local storage
  const cart = JSON.parse(window.localStorage.getItem("cart")) || [];

  // Check if the product is already in the cart
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex !== -1) {
    // If the product exists, update the quantity
    cart[existingProductIndex].quantity += product.quantity;
  } else {
    // If the product doesn't exist, add it to the cart
    console.log(product);
    cart.push(product);
  }

  // Save updated cart data to local storage
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

function getCartItems() {
  console.log(JSON.parse(localStorage.getItem("cart")) || []);
  return JSON.parse(localStorage.getItem("cart")) || [];
}

addtocart_form.forEach((element) => {
  // Do something with each element
  element.addEventListener("click", async (event) => {
    event.preventDefault();

    if (event.target.classList.contains("addtocart")) {
      // Get the data-product-id attribute of the clicked product
      const itemId = event.target.getAttribute("data-product-id");
      const itemImg = event.target.getAttribute("data-product-img");
      const itemName = event.target.getAttribute("data-product-name");
      const itemPrice = event.target.getAttribute("data-product-price");

      if (itemId) {
        console.log(itemId);
        console.log(itemImg);
        console.log(itemName);
        console.log(itemPrice);

        const product = {
          id: itemId,
          image: itemImg,
          name: itemName,
          price: itemPrice,
          quantity: 1,
        };

        addToCart(product);
        getCartItems();

        // Save updated cart data to local storage

        // window.localStorage.setItem("cart", JSON.stringify(cart));
        // window.localStorage.setItem("key1", "value1");
        // console.log(window.localStorage.getItem('cart') || []);
      }
    }
  });
});

const whatsapp = document.querySelector(".chat-button");
whatsapp.addEventListener("click", async (event) => {
  event.preventDefault();

  const phoneNumber = "2349017005308"; // Replace with the recipient's phone number
  const message = "Hello, I'm interested in your products!"; // Replace with your message

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;

  window.location.href = whatsappURL;
});
