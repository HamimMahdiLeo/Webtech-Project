// GET HTML ELEMENTS

let insideDhaka = document.getElementById("insideDhaka");

let outsideDhaka = document.getElementById("outsideDhaka");

let deliveryCharge = document.getElementById("deliveryCharge");

let totalPrice = document.getElementById("totalPrice");

let confirmOrder = document.getElementById("confirmOrder");

let successMessage = document.getElementById("successMessage");


// PRODUCT PRICES

let jerseyPrice = 990;

let customPrice = 250;

let subtotal = jerseyPrice + customPrice;


// DELIVERY CHARGE

let deliveryFee = 0;


// INITIAL TOTAL

let total = subtotal;


// DELIVERY ZONE SELECTION

insideDhaka.addEventListener("click", function() {

    insideDhaka.classList.add("active");

    outsideDhaka.classList.remove("active");

    deliveryFee = 70;

    calculateTotal();

});


outsideDhaka.addEventListener("click", function() {

    outsideDhaka.classList.add("active");

    insideDhaka.classList.remove("active");

    deliveryFee = 130;

    calculateTotal();

});


// TOTAL PRICE CALCULATION

function calculateTotal() {

    if (subtotal >= 1000) {

        deliveryFee = 0;

        deliveryCharge.textContent = "FREE";

    }

    else {

        deliveryCharge.textContent = "৳" + deliveryFee;

    }


    total = subtotal + deliveryFee;


    totalPrice.textContent = "৳" + total.toLocaleString("en-IN");


    confirmOrder.textContent =
    "✓ CONFIRM ORDER — ৳" + total.toLocaleString("en-IN");

}


// PAYMENT METHOD SELECTION

let paymentButtons = document.querySelectorAll(".payment-btn");

let selectedPayment = "Cash COD";


paymentButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        paymentButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        selectedPayment = button.getAttribute("data-payment");

        successMessage.textContent = "";

    });

});


// CONFIRM ORDER

confirmOrder.addEventListener("click", function() {

    successMessage.textContent =
    "Order confirmed successfully! Payment: " + selectedPayment;

});