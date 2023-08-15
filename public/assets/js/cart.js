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

        // addToCart(product);
        getCartItems();

        // Save updated cart data to local storage

        // window.localStorage.setItem("cart", JSON.stringify(cart));
        // window.localStorage.setItem("key1", "value1");
        // console.log(window.localStorage.getItem('key1') || []);
      }
    }
  });
});

// // Get references to the HTML elements
// const counterElement = document.getElementById("counter");
// const addBtn = document.getElementById("addBtn");
// const subtractBtn = document.getElementById("subtractBtn");

// // Initialize the counter value
// let counterValue = 1;

// // Update the counter display
// function updateCounterDisplay() {
//   counterElement.textContent = counterValue;
// }

// // Add event listener for the "Add" button
// addBtn.addEventListener("click", function () {
//   counterValue++;
//   updateCounterDisplay();
// });

// // Add event listener for the "Subtract" button
// subtractBtn.addEventListener("click", function () {
//   counterValue--;
//   updateCounterDisplay();
// });

// addtocart_form.forEach((element) => {
//   // Do something with each element
//   element.addEventListener("click", async (event) => {
//     event.preventDefault();

//     let item_name = itemName.innerHTML;
//     let item_price = itemPrice.innerHTML;
//     let item_src = itemImg.src;
//     let item_quantity = 1;
//     let item_id = itemId.innerHTML;

//     const product = {
//       id: item_id,
//       name: item_name,
//       price: item_price,
//       quantity: item_quantity,
//       image: item_src,
//     };

//     console.log(product);

//     // try {
//     //   // Send a POST request to the login endpoint
//     //   const response = await fetch("/deletecookie", {
//     //     method: "POST",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //     // body: JSON.stringify({ item_name, item_price, item_src }),
//     //   });

//     //   const data = await response.json();
//     //   console.log(data);

//     //   // window.location.href = "/cart";
//     // } catch (error) {
//     //   console.error(error);
//     //   alert("Error during login");
//     // }
//   });
// });

//   productCont.forEach(container => {
//     const itemImg = container.querySelector('.member-img .img-fluid');
//     const itemName = container.querySelector('.member-info .item-name');
//     const itemId = container.querySelector('.member-info .item-id');
//     const itemPrice = container.querySelector('.member-info .item-price');

//   let item_name = itemName.textContent;
//   let item_price = itemPrice.textContent;
//   let item_src = itemImg.src;
//   let item_quantity = 1;
//   let item_id = itemId.innerHTML;

//   const product = {
//     id: item_id,
//     name: item_name,
//     price: item_price,
//     quantity: item_quantity,
//     image: item_src,
//   };

//   // console.log(product);

// });
