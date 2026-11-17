
// Show and Hide Password
function togglePassword(id, button) {

    let password = document.getElementById(id);

    if (password.type === "password") {

        password.type = "text";
        button.innerText = "🙈";

    } else {

        password.type = "password";
        button.innerText = "👁";

    }
}


// Form Submission
document.getElementById("signupForm").addEventListener("submit", function(event) {

    event.preventDefault();

    // Get Input Values
    let name = document.getElementById("name").value.trim();

    let phone = document.getElementById("phone").value.trim();

    let gender = document.getElementById("gender").value;

    let email = document.getElementById("email").value.trim();

    let password = document.getElementById("password").value;

    let confirmPassword = document.getElementById("confirmPassword").value;


    // Phone Validation
    if (!/^01[3-9]\d{8}$/.test(phone)) {

        alert("Please enter a valid Bangladeshi phone number!");
        return;

    }


    // Password Length Validation
    if (password.length < 8) {

        alert("Password must contain at least 8 characters!");
        return;

    }


    // Password Matching
    if (password !== confirmPassword) {

        alert("Passwords do not match!");
        return;

    }


    // Success Message
    alert(
        "Admin Sign Up Successful!\n\n" +
        "Name: " + name +
        "\nPhone: " + phone +
        "\nGender: " + gender +
        "\nEmail: " + email
    );

    // Reset Form
    this.reset();

});
