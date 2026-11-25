const USERS_KEY = "threadedStoriesUsers";

const roleInput = document.getElementById("role");
const roleTabs = document.querySelectorAll(".role-tab");
const customerFields = document.getElementById("customerFields");
const deliveryFields = document.getElementById("deliveryFields");
const vehicleType = document.getElementById("vehicleType");
const bikeRegBox = document.getElementById("bikeRegBox");

const ROLE_INFO = {
  customer: {
    tag: "JOIN THE CLUB",
    title: "Customer Sign Up",
    subtitle: "Find your colours. Wear your story. Create an account for your next jersey.",
    btn: "SIGN UP AS CUSTOMER \u2192"
  },
  delivery: {
    tag: "ON THE MOVE",
    title: "Delivery Man Sign Up",
    subtitle: "Bring the game to their doorstep. Join our delivery team in Dhaka.",
    btn: "SIGN UP AS DELIVERY MAN \u2192"
  },
  admin: {
    tag: "TEAM ACCESS",
    title: "Admin Sign Up",
    subtitle: "Behind every great match-day order is a great team. Join the workspace.",
    btn: "SIGN UP AS ADMIN \u2192"
  }
};

// Handle 3-Segment Role Tab Clicks
for (let i = 0; i < roleTabs.length; i++) {
  roleTabs[i].addEventListener("click", function () {
    const selectedRole = this.getAttribute("data-role");
    roleInput.value = selectedRole;

    for (let j = 0; j < roleTabs.length; j++) {
      roleTabs[j].classList.remove("active");
    }
    this.classList.add("active");

    clearErrors();

    customerFields.hidden = selectedRole !== "customer";
    deliveryFields.hidden = selectedRole !== "delivery";

    document.getElementById("roleTag").textContent = ROLE_INFO[selectedRole].tag;
    document.getElementById("formTitle").textContent = ROLE_INFO[selectedRole].title;
    document.getElementById("formSubtitle").textContent = ROLE_INFO[selectedRole].subtitle;
    document.getElementById("submitBtn").textContent = ROLE_INFO[selectedRole].btn;
  });
}

// Show Bike Registration Number only when Bike is selected
vehicleType.addEventListener("change", function () {
  bikeRegBox.hidden = this.value !== "Bike";
  if (this.value !== "Bike") {
    document.getElementById("bikeRegError").textContent = "";
  }
});

// Toggle Show/Hide Password
const toggleButtons = document.querySelectorAll(".toggle-pass");
for (let i = 0; i < toggleButtons.length; i++) {
  toggleButtons[i].addEventListener("click", function () {
    const input = document.getElementById(this.getAttribute("data-target"));
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    this.textContent = isPassword ? "Hide" : "Show";
  });
}

function clearErrors() {
  const errors = document.querySelectorAll(".error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].textContent = "";
  }
}

function setError(id, message) {
  document.getElementById(id).textContent = message;
}

// Form Validation & Save to localStorage
document.getElementById("signupForm").addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();

  const role = roleInput.value;
  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  let isValid = true;

  // Common Personal Details
  if (fullName.length < 3) {
    setError("fullNameError", "Enter your full name (minimum 3 characters).");
    isValid = false;
  }
  if (!/^01[3-9]\d{8}$/.test(phone)) {
    setError("phoneError", "Enter a valid 11-digit BD phone number (01XXXXXXXXX).");
    isValid = false;
  }
  if (!gender) {
    setError("genderError", "Please select your gender.");
    isValid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("emailError", "Enter a valid email address.");
    isValid = false;
  }

  const user = {
    id: "user-" + Date.now(),
    role: role,
    fullName: fullName,
    phone: phone,
    gender: gender,
    email: email
  };

  // Customer Validation
  if (role === "customer") {
    const customerAddress = document.getElementById("customerAddress").value.trim();
    if (customerAddress.length < 8) {
      setError("customerAddressError", "Enter your full delivery address.");
      isValid = false;
    }
    user.address = customerAddress;
  }

  // Delivery Man Validation
  if (role === "delivery") {
    const presentAddress = document.getElementById("presentAddress").value.trim();
    const nid = document.getElementById("nid").value.trim();
    const bloodGroup = document.getElementById("bloodGroup").value;
    const operatingArea = document.getElementById("operatingArea").value;
    const vehicle = vehicleType.value;
    const bikeReg = document.getElementById("bikeReg").value.trim();

    if (presentAddress.length < 8) {
      setError("presentAddressError", "Enter your present address.");
      isValid = false;
    }
    if (!/^\d{10}$|^\d{13}$|^\d{17}$/.test(nid)) {
      setError("nidError", "Enter a valid 10, 13, or 17-digit NID number.");
      isValid = false;
    }
    if (!bloodGroup) {
      setError("bloodGroupError", "Select your blood group.");
      isValid = false;
    }
    if (!operatingArea) {
      setError("operatingAreaError", "Select your operating area.");
      isValid = false;
    }
    if (vehicle === "Bike" && bikeReg.length < 6) {
      setError("bikeRegError", "Enter your bike registration number.");
      isValid = false;
    }

    user.address = presentAddress;
    user.nid = nid;
    user.bloodGroup = bloodGroup;
    user.operatingArea = operatingArea;
    user.vehicleType = vehicle;
    user.bikeReg = vehicle === "Bike" ? bikeReg : "";
  }

  // Password Validation
  if (password.length < 8) {
    setError("passwordError", "Password must be at least 8 characters.");
    isValid = false;
  }
  if (confirmPassword !== password || !confirmPassword) {
    setError("confirmPasswordError", "Passwords do not match.");
    isValid = false;
  }

  if (!isValid) return;

  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  window.location.href = "login.html";
});