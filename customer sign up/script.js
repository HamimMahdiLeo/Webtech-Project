

document.querySelectorAll(".toggle-password").forEach(button => {

    button.addEventListener("click", function () {

        const targetId = this.dataset.target;
        const passwordInput = document.getElementById(targetId);

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            this.setAttribute("aria-label", "Hide password");
        } else {
            passwordInput.type = "password";
            this.setAttribute("aria-label", "Show password");
        }
    });

});


const signupForm = document.getElementById("signupForm");
const message = document.getElementById("message");

signupForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    message.className = "message";
    message.textContent = "";

    if (password.length < 8) {
        showMessage("Password must contain at least 8 characters.", "error");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match!", "error");
        return;
    }

    // Phone validation (Bangladesh format)
    if (!/^01[3-9]\d{8}$/.test(phone)) {
        showMessage("Please enter a valid Bangladeshi phone number.", "error");
        return;
    }

    const customer = {
        fullName,
        phone,
        gender,
        email,
        address
    };

    console.log("Customer signup information:", customer);

    showMessage(
        "Your information has been validated successfully!",
        "success"
    );
er.
});

function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;
}
