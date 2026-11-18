
// Get Form
const form = document.getElementById("riderForm");

// Form Submission
form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get Values
    const name = document.getElementById("name").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const bkash = document.getElementById("bkash").value.trim();

    // Validate Phone Number
    if (!/^01[3-9]\d{8}$/.test(phone)) {
        alert("Please enter a valid mobile number!");
        return;
    }

    // Validate bKash Number
    if (!/^01[3-9]\d{8}$/.test(bkash)) {
        alert("Please enter a valid bKash number!");
        return;
    }

    // Success Message
    alert(
        "Rider Information Submitted Successfully!\n\n" +
        "Name: " + name
    );

    // Reset Form
    form.reset();

});
