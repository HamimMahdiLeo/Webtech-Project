
const roleButtons = document.querySelectorAll(".role");

let selectedRole = "Customer";

roleButtons.forEach(button => {

    button.addEventListener("click", () => {

        roleButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedRole = button.dataset.role;

    });

});



const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.innerHTML = "◉";

    } else {

        passwordInput.type = "password";
        togglePassword.innerHTML = "◉";

    }

});



const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = passwordInput.value;

    if (email.trim() === "" || password.trim() === "") {

        alert("Please enter your email and password.");

        return;
    }

    alert(
        "Login Attempt!\n" +
        "Role: " + selectedRole +
        "\nEmail/Phone: " + email
    );

});



document.getElementById("forgotPassword")
.addEventListener("click", function(event) {

    event.preventDefault();

    alert("Forgot Password page will open here.");

});



document.getElementById("createAccount")
.addEventListener("click", function(event) {

    event.preventDefault();

    alert("Create Account page will open here.");

});
