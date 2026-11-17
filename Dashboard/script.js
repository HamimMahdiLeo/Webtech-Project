let cartCount = 1;
let cartTotal = 1240;
let toastTimer = null;

function formatBDT(amount) {
  return "৳" + amount.toLocaleString("en-IN");
}

function updateCartUI() {
  document.getElementById("cartTotal").innerHTML = formatBDT(cartTotal);
  document.getElementById("cartCount").innerHTML = cartCount;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerHTML = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2400);
}

function filterJerseys() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const cards = document.querySelectorAll(".product-card");
  let visibleCount = 0;

  cards.forEach(function (card) {
    const name = card.getAttribute("data-name").toLowerCase();
    const edition = card.getAttribute("data-edition").toLowerCase();

    if (name.indexOf(query) !== -1 || edition.indexOf(query) !== -1) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  const emptyState = document.getElementById("emptyState");
  if (visibleCount === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

// Handle Size Selection and Add to Cart clicks on HTML cards
document.getElementById("catalog").addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("size-btn")) {
    const wrapper = target.parentElement;
    const buttons = wrapper.querySelectorAll(".size-btn");

    buttons.forEach(function (btn) {
      btn.classList.remove("selected");
    });
    target.classList.add("selected");
    return;
  }

  if (target.classList.contains("add-to-cart-btn")) {
    const card = target.closest(".product-card");
    const productName = card.getAttribute("data-name");
    const productPrice = Number(card.getAttribute("data-price"));
    const selectedSizeBtn = card.querySelector(".size-btn.selected");
    let chosenSize = "M";

    if (selectedSizeBtn !== null) {
      chosenSize = selectedSizeBtn.getAttribute("data-size");
    }

    cartCount = cartCount + 1;
    cartTotal = cartTotal + productPrice;
    updateCartUI();
    showToast("Added " + productName + " (Size " + chosenSize + ") to cart");
  }
});

// Reset search when clicking All Jerseys button
document.getElementById("allJerseysBtn").addEventListener("click", function () {
  document.getElementById("searchInput").value = "";
  filterJerseys();
});

// Handle Live Search Input
document.getElementById("searchInput").addEventListener("keyup", filterJerseys);

// Handle Cart Button Click
document.getElementById("cartBtn").addEventListener("click", function () {
  showToast("Cart: " + cartCount + " item(s) • Total " + formatBDT(cartTotal));
});

// Initialize Cart Display
updateCartUI();