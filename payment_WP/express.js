
document.addEventListener("DOMContentLoaded", function () {

    // Delivery Zone Buttons
    const zoneButtons = document.querySelectorAll(".zone-btn");

    zoneButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            zoneButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    // Payment Method Buttons
    const paymentButtons = document.querySelectorAll(".payment-btn");

    paymentButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            paymentButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    // Form Submission
    const form = document.getElementById("checkoutForm");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const address = document.getElementById("address").value.trim();

        if (!/^01[3-9]\d{8}$/.test(mobile)) {
            alert("Please enter a valid mobile number!");
            return;
        }

        alert("Your order has been submitted successfully!\nThank you, " + name);

        form.reset();

    });

});
