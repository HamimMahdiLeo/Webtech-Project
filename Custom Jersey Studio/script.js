const customForm = document.getElementById("customForm");
const designUpload = document.getElementById("designUpload");
const uploadBox = document.getElementById("uploadBox");
const designPreview = document.getElementById("designPreview");
const uploadPlaceholder = document.getElementById("uploadPlaceholder");

// Live preview when user selects a jersey design image
designUpload.addEventListener("change", function () {
  if (designUpload.files.length > 0) {
    const file = designUpload.files[0];
    const imageUrl = URL.createObjectURL(file);

    designPreview.src = imageUrl;
    designPreview.style.display = "block";
    uploadPlaceholder.style.display = "none";

    uploadBox.className = "upload-box successBorder";
    document.getElementById("uploadError").innerHTML = "";
  }
});

// Form validation on Go to Payment submit
customForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();

  const amountInput = document.getElementById("jerseyAmount");
  const teamInput = document.getElementById("teamName");
  const playerInput = document.getElementById("playerList");

  let valid = true;

  // 1. Design upload validation
  if (designUpload.files.length === 0) {
    uploadBox.className = "upload-box errorBorder";
    document.getElementById("uploadError").innerHTML = "Please upload your jersey design.";
    valid = false;
  } else {
    uploadBox.className = "upload-box successBorder";
  }

  // 2. Jersey amount validation (minimum 8 pieces)
  const amountValue = amountInput.value.trim();
  const amountNum = Number(amountValue);

  if (amountValue === "") {
    showError(amountInput, "amountError", "Jersey amount is required.");
    valid = false;
  } else if (isNaN(amountNum) || amountNum < 8 || amountNum % 1 !== 0) {
    showError(amountInput, "amountError", "Minimum order is 8 whole pieces.");
    valid = false;
  } else {
    showSuccess(amountInput);
  }

  // 3. Team name validation
  if (teamInput.value.trim() === "") {
    showError(teamInput, "teamError", "Team name is required.");
    valid = false;
  } else if (teamInput.value.trim().length < 2) {
    showError(teamInput, "teamError", "Team name must be at least 2 characters.");
    valid = false;
  } else {
    showSuccess(teamInput);
  }

  // 4. Player list validation
  if (playerInput.value.trim() === "") {
    showError(playerInput, "playerError", "Enter player names, squad numbers, and sizes.");
    valid = false;
  } else {
    showSuccess(playerInput);
  }

  // Success output
  if (valid) {
    document.getElementById("formMessage").innerHTML =
      "Order ready for " + teamInput.value.trim() + " (" + amountNum + " pieces). Proceeding to payment...";
  }
});

// Helper Functions
function showError(input, errorId, message) {
  input.className = "errorBorder";
  document.getElementById(errorId).innerHTML = message;
}

function showSuccess(input) {
  input.className = "successBorder";
}

function clearErrors() {
  const errors = document.querySelectorAll(".error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].innerHTML = "";
  }

  const fields = document.querySelectorAll("#customForm input, #customForm textarea");
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].id !== "designUpload") {
      fields[i].className = "";
    }
  }

  document.getElementById("formMessage").innerHTML = "";
}