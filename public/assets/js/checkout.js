const placeOrder = document.getElementById("place-order");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const address = document.getElementById("inputAddress");
const town = document.getElementById("town");
const stateName = document.getElementById("inputState");
const totalBox = document.createElement("div");
totalBox.classList.add("item-details");
const totalBoxValue = document.createElement("div");
totalBoxValue.classList.add("item-details3");

// Get all radio buttons
const radioButtons = document.querySelectorAll(
  'input[type="radio"][name="flexRadioDefault"]'
);

// Assign a "number" attribute to each radio button
radioButtons.forEach((radio, index) => {
  radio.setAttribute("number", index + 1);
});

// Function to get the selected radio button
function getSelectedRadioButton() {
  let selectedRadio = null;
  radioButtons.forEach((radio) => {
    if (radio.checked) {
      selectedRadio = radio;
    }
  });
  return selectedRadio;
}

// the price of delivery
let deliveryPrice = 0;

let deliveryConstant = 4000;

// Example usage: retrieve the selected radio button's number
const selectedRadio = getSelectedRadioButton();
if (selectedRadio) {
  const selectedNumber = selectedRadio.getAttribute("number");
  const selectedNumber2 = selectedRadio.getAttribute("value");
  deliveryPrice = selectedNumber2;
  //   console.log("Selected Radio Number:", selectedNumber);
  //   console.log("Selected Radio Number:", selectedNumber2);
}

placeOrder.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log(firstName.value);
  console.log(lastName.value);
  console.log(email.value);
  console.log(address.value);
  console.log(town.value);
  console.log(stateName.value);

  let delivery_location;

  // Example usage: retrieve the selected radio button's number
  const selectedRadio = getSelectedRadioButton();
  if (selectedRadio) {
    const selectedNumber = selectedRadio.getAttribute("date-address");
    const selectedNumber2 = selectedRadio.getAttribute("value");
    delivery_location = selectedNumber;
    deliveryPrice = selectedNumber2;
    console.log("Delivery location:", selectedNumber);
    console.log("Delivery price:", selectedNumber2);
  }

  const cartOrders = getCartItems();
  let countt = 0;
  cartOrders.forEach((item) => {
    const total = item.quantity * item.price;
    const name = `${item.name} (x${item.quantity}) - $${total}.00 with ID of ${item.id} and image ${item.image}`;

    countt += total;
    console.log(name);
  });
  console.log(`Subotal Amount - ${countt}`);

  // Total amount addition of delivery service
  const actualTotal = countt + Number(deliveryPrice);
  console.log(actualTotal);

  let first_name_mail = firstName.value;
  let last_name_mail = lastName.value;
  let address_mail = address.value;
  let town_mail = town.value;
  let state_name_mail = stateName.value;
  let delivery_location_mail = delivery_location;
  let delivery_price_mail = deliveryPrice;
  // let item_details_mail = name;
  let subtotal_mail = countt;
  let actual_total_mail = actualTotal;

  // SEND DATA TO SERVER
  const url = "https://your-server.com/api/endpoint"; // Replace with your server's URL
  const data = {
    key1: "value1",
    key2: "value2",
    // Add more key-value pairs as needed
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      // Handle the response from the server
      console.log("Server Response:", responseData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function getCartItems() {
  // console.log(JSON.parse(localStorage.getItem("cart")) || []);

  return JSON.parse(localStorage.getItem("cart")) || [];
}

cartButton.addEventListener("click", async (event) => {
  event.preventDefault();
  getCartItems();
});

// Get cart items from local storage
const cartOrders = getCartItems();
// console.log(cartOrders);

// Get the container element
const cartTable = document.getElementById("cart-table");
// cartTable.innerHTML ="popopop";

// countt
let countt = 0;

const checkoutDivv = document.createElement("div");
const checkoutDivv2 = document.createElement("div");
checkoutDivv.classList.add("checkout-div");
checkoutDivv2.classList.add("checkout-div");

// Loop through the cart items and create HTML elements
cartOrders.forEach((item) => {
  const cartItemDiv = document.createElement("div");
  cartItemDiv.classList.add("cart-order-item");

  const detailsDiv = document.createElement("h2");
  const detailsDiv2 = document.createElement("h2");
  detailsDiv.classList.add("item-details");
  detailsDiv2.classList.add("item-details2");
  const total = item.quantity * item.price;
  detailsDiv.textContent = `${item.name} (x${item.quantity})`;
  detailsDiv2.textContent = ` $${total}.00`;

  countt += total;

  //   cartItemDiv.appendChild(img);
  cartItemDiv.appendChild(detailsDiv);
  cartItemDiv.appendChild(detailsDiv2);
  cartTable.appendChild(cartItemDiv);
  const hr = document.createElement("hr");
  hr.classList.add("hrr");
});

const orderItemDiv = document.createElement("div");
orderItemDiv.classList.add("cart-order-item");

const subtotall = document.createElement("div");
subtotall.classList.add("item-details4");
const subtotallValue = document.createElement("div");
subtotallValue.classList.add("item-details3");
subtotall.textContent = "Subtotal";
subtotallValue.textContent = `$${countt}.00`;

checkoutDivv.appendChild(subtotall);
checkoutDivv.appendChild(subtotallValue);
cartTable.appendChild(checkoutDivv);

const totalCont = document.createElement("div");
totalCont.classList.add("cart-order-item");

const targetElement1 = document.getElementById("flexRadioDefault1");
const targetElement2 = document.getElementById("flexRadioDefault2");
const targetElement3 = document.getElementById("flexRadioDefault3");
const targetElement4 = document.getElementById("flexRadioDefault4");
const targetElement5 = document.getElementById("flexRadioDefault5");

targetElement1.addEventListener("click", function () {
  // Example usage: retrieve the selected radio button's number
  const selectedRadio = getSelectedRadioButton();
  if (selectedRadio) {
    const selectedNumber = selectedRadio.getAttribute("number");
    const selectedNumber2 = selectedRadio.getAttribute("value");
    deliveryPrice = selectedNumber2;
  }

  // Change the text content of the target element
  let deliveryInclu = countt + Number(deliveryPrice) - Number(deliveryConstant);
  //   countt += Number(deliveryPrice);
  totalBoxValue.textContent = `$${deliveryInclu}.000`;
});
targetElement2.addEventListener("click", function () {
  // Example usage: retrieve the selected radio button's number
  const selectedRadio = getSelectedRadioButton();
  if (selectedRadio) {
    const selectedNumber = selectedRadio.getAttribute("number");
    const selectedNumber2 = selectedRadio.getAttribute("value");
    deliveryPrice = selectedNumber2;
  }

  // Change the text content of the target element
  let deliveryInclu = countt + Number(deliveryPrice) - Number(deliveryConstant);
  //   countt += Number(deliveryPrice);
  totalBoxValue.textContent = `$${deliveryInclu}.000`;
});
targetElement3.addEventListener("click", function () {
  // Example usage: retrieve the selected radio button's number
  const selectedRadio = getSelectedRadioButton();
  if (selectedRadio) {
    const selectedNumber = selectedRadio.getAttribute("number");
    const selectedNumber2 = selectedRadio.getAttribute("value");
    deliveryPrice = selectedNumber2;
  }

  // Change the text content of the target element
  let deliveryInclu = countt + Number(deliveryPrice) - Number(deliveryConstant);
  //   countt += Number(deliveryPrice);
  totalBoxValue.textContent = `$${deliveryInclu}.000`;
});
targetElement4.addEventListener("click", function () {
  // Example usage: retrieve the selected radio button's number
  const selectedRadio = getSelectedRadioButton();
  if (selectedRadio) {
    const selectedNumber = selectedRadio.getAttribute("number");
    const selectedNumber2 = selectedRadio.getAttribute("value");
    deliveryPrice = selectedNumber2;
  }

  // Change the text content of the target element
  let deliveryInclu = countt + Number(deliveryPrice) - Number(deliveryConstant);
  //   countt += Number(deliveryPrice);
  totalBoxValue.textContent = `$${deliveryInclu}.000`;
});
targetElement5.addEventListener("click", function () {
  // Example usage: retrieve the selected radio button's number
  const selectedRadio = getSelectedRadioButton();
  if (selectedRadio) {
    const selectedNumber = selectedRadio.getAttribute("number");
    const selectedNumber2 = selectedRadio.getAttribute("value");
    deliveryPrice = selectedNumber2;
  }

  // Change the text content of the target element
  let deliveryInclu = countt + Number(deliveryPrice) - Number(deliveryConstant);
  //   countt += Number(deliveryPrice);
  totalBoxValue.textContent = `$${deliveryInclu}.000`;
});

totalBox.textContent = "Total";
countt += Number(deliveryPrice);
totalBoxValue.textContent = `$${countt}.00`;

totalCont.appendChild(totalBox);
totalCont.appendChild(totalBoxValue);

checkoutDivv2.appendChild(totalCont);
checkoutDivv2.appendChild(totalBoxValue);
cartTable.appendChild(checkoutDivv2);
