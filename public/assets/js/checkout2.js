document.addEventListener("DOMContentLoaded", function () {
  const totalBox = document.createElement("div");
  totalBox.classList.add("item-details");
  const totalBoxValue = document.createElement("div");
  totalBoxValue.classList.add("item-details3");
  totalBoxValue.setAttribute('name', 'totalBoxValue');
  console.log(totalBoxValue.innerHTML);


  // placeOrder.addEventListener("click", async (event) => {
  //   event.preventDefault();

  //   const cartOrders = getCartItems();
  //   let countt = 0;
  //   cartOrders.forEach((item) => {
  //     const total = item.quantity * item.price;
  //     const name = `${item.name} (x${item.quantity}) - $${total}.00 with ID of ${item.id} and image ${item.image}`;

  //     countt += total;
  //     console.log(name);
  //   });
  //   console.log(`Subotal Amount - ${countt}`);

  //   // Total amount addition of delivery service
  //   const actualTotal = countt + Number(deliveryPrice);
  //   console.log(actualTotal);

  // });

  function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Get cart items from local storage
  const cartOrders = getCartItems();
  // console.log(cartOrders);

  // Get the container element
  const cartTable = document.getElementById("cart-table");

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
  let deliveryPrice = 4000;
  let deliveryConstant = 4000;

  let buttons = document.querySelectorAll("[name=flexRadioDefault]");
  for (let button of Array.from(buttons)) {
    button.addEventListener("change", () => {
      document.body.style.background = button.value;
      deliveryPrice = button.value;
        console.log(button.value);
    });
  }
  console.log(deliveryPrice);
  totalCont.classList.add("cart-order-item");

  totalBox.textContent = "Total";
  countt += Number(deliveryPrice);
  totalBoxValue.textContent = `$${countt}.00`;

  totalCont.appendChild(totalBox);
  totalCont.appendChild(totalBoxValue);

  checkoutDivv2.appendChild(totalCont);
  checkoutDivv2.appendChild(totalBoxValue);
  cartTable.appendChild(checkoutDivv2);

  // Get all radio buttons
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="flexRadioDefault"]'
  );

  // Assign a "number" attribute to each radio button
  radioButtons.forEach((radio, index) => {
    radio.setAttribute("number", index + 1);
  });

  // Example usage: retrieve the selected radio button's number
  const selectedRadio = getSelectedRadioButton();
  if (selectedRadio) {
    const selectedNumber = selectedRadio.getAttribute("number");
    const selectedNumber2 = selectedRadio.getAttribute("value");
    deliveryPrice = selectedNumber2;
    //   console.log("Selected Radio Number:", selectedNumber);
    //   console.log("Selected Radio Number:", selectedNumber2);
  }

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
    let deliveryInclu =
      countt + Number(deliveryPrice) - Number(deliveryConstant);
    //   countt += Number(deliveryPrice);
    totalBoxValue.textContent = `$${deliveryInclu}.000`;

    totalPriceValue.value = `$${deliveryInclu}.000`;
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
    let deliveryInclu =
      countt + Number(deliveryPrice) - Number(deliveryConstant);
    //   countt += Number(deliveryPrice);
    totalBoxValue.textContent = `$${deliveryInclu}.000`;

    totalPriceValue.value = `$${deliveryInclu}.000`;
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
    let deliveryInclu =
      countt + Number(deliveryPrice) - Number(deliveryConstant);
    //   countt += Number(deliveryPrice);
    totalBoxValue.textContent = `$${deliveryInclu}.000`;

    totalPriceValue.value = `$${deliveryInclu}.000`;
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
    let deliveryInclu =
      countt + Number(deliveryPrice) - Number(deliveryConstant);
    //   countt += Number(deliveryPrice);
    totalBoxValue.textContent = `$${deliveryInclu}.000`;

    totalPriceValue.value = `$${deliveryInclu}.000`;
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
    let deliveryInclu =
      countt + Number(deliveryPrice) - Number(deliveryConstant);
    //   countt += Number(deliveryPrice);
    totalBoxValue.textContent = `$${deliveryInclu}.000`;

    totalPriceValue.value = `$${deliveryInclu}.000`;
  });

  function generateUniqueOrderId() {
    // Get the current timestamp in milliseconds
    const timestamp = new Date().getTime();

    // Generate a random number (you can adjust the range as needed)
    const randomNumber = Math.floor(Math.random() * 1000000);

    // Combine the timestamp and random number to create the unique ID
    const orderId = `${timestamp}${randomNumber}`;

    return orderId;
  }

  // Generate the unique order ID
  const uniqueOrderId = generateUniqueOrderId();
  console.log("waka");
  console.log(uniqueOrderId);

  // Set the value of the orderId input field
  document.getElementById("orderId").value = uniqueOrderId;
  const totalPriceValue = document.getElementById("totalPriceValue");
  totalPriceValue.value = totalBoxValue.innerHTML;
});
