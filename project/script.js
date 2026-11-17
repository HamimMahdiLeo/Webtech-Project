// GET ELEMENTS

let form = document.getElementById("deliveryForm");

let vehicle = document.getElementById("vehicle");

let bikeDetails = document.getElementById("bikeDetails");


// SHOW BIKE REGISTRATION FIELD

vehicle.addEventListener("change", function() {

    if (vehicle.value === "Bike") {

        bikeDetails.style.display = "block";

    } else {

        bikeDetails.style.display = "none";

        document.getElementById("bikeNumber").value = "";

        document.getElementById("bikeError").textContent = "";

    }

});


// PASSWORD VISIBILITY

function togglePassword(id, icon) {

    let password = document.getElementById(id);

    if (password.type === "password") {

        password.type = "text";

        icon.textContent = "🙈";

    } else {

        password.type = "password";

        icon.textContent = "👁";

    }

}


// FORM VALIDATION

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let isValid = true;


    // CLEAR PREVIOUS ERRORS

    let errors = document.querySelectorAll("span");

    errors.forEach(function(error) {

        error.textContent = "";

    });

    document.getElementById("successMessage").textContent = "";


    // 1. NAME VALIDATION

    let name = document.getElementById("fullName").value.trim();

    if (name === "") {

        document.getElementById("nameError").textContent =
        "Full name is required.";

        isValid = false;

    }


    // 2. PHONE VALIDATION

    let phone = document.getElementById("phone").value.trim();

    if (!/^01[0-9]{9}$/.test(phone)) {

        document.getElementById("phoneError").textContent =
        "Enter a valid 11-digit phone number.";

        isValid = false;

    }


    // 3. GENDER VALIDATION

    let gender = document.getElementById("gender").value;

    if (gender === "") {

        document.getElementById("genderError").textContent =
        "Please select your gender.";

        isValid = false;

    }


    // 4. EMAIL VALIDATION

    let email = document.getElementById("email").value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        document.getElementById("emailError").textContent =
        "Enter a valid email address.";

        isValid = false;

    }


    // 5. ADDRESS VALIDATION

    let address = document.getElementById("address").value.trim();

    if (address === "") {

        document.getElementById("addressError").textContent =
        "Present address is required.";

        isValid = false;

    }


    // 6. NID VALIDATION

    let nid = document.getElementById("nid").value.trim();

    if (!/^[0-9]{10,17}$/.test(nid)) {

        document.getElementById("nidError").textContent =
        "Enter a valid NID number (10-17 digits).";

        isValid = false;

    }


    // 7. BLOOD GROUP

    let blood = document.getElementById("blood").value;

    if (blood === "") {

        document.getElementById("bloodError").textContent =
        "Please select your blood group.";

        isValid = false;

    }


    // 8. OPERATING AREA

    let area = document.getElementById("area").value;

    if (area === "") {

        document.getElementById("areaError").textContent =
        "Please select your operating area.";

        isValid = false;

    }


    // 9. VEHICLE VALIDATION

    let vehicleType = vehicle.value;

    if (vehicleType === "") {

        document.getElementById("vehicleError").textContent =
        "Please select your vehicle type.";

        isValid = false;

    }


    // 10. BIKE REGISTRATION

    let bikeNumber = document.getElementById("bikeNumber").value.trim();

    if (vehicleType === "Bike" && bikeNumber === "") {

        document.getElementById("bikeError").textContent =
        "Bike registration number is required.";

        isValid = false;

    }


    // 11. PASSWORD VALIDATION

    let password = document.getElementById("password").value;

    if (password.length < 8) {

        document.getElementById("passwordError").textContent =
        "Password must contain at least 8 characters.";

        isValid = false;

    }


    // 12. CONFIRM PASSWORD

    let confirmPassword =
    document.getElementById("confirmPassword").value;

    if (confirmPassword === "") {

        document.getElementById("confirmError").textContent =
        "Please confirm your password.";

        isValid = false;

    }

    else if (password !== confirmPassword) {

        document.getElementById("confirmError").textContent =
        "Passwords do not match.";

        isValid = false;

    }


    // FINAL RESULT

    if (isValid) {

        document.getElementById("successMessage").textContent =
        "Registration successful! Welcome to Threaded Stories.";

        form.reset();

        bikeDetails.style.display = "none";

    }

});