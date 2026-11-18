let cartCount = 0;

function updateCartUI() {
  document.getElementById("cartCount").innerHTML = cartCount;
}

function filterJerseys() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const cards = document.querySelectorAll(".product-card");
  let visibleCount = 0;

  for (let i = 0; i < cards.length; i++) {
    const title = cards[i].querySelector(".product-title").innerHTML.toLowerCase();
    const edition = cards[i].querySelector(".edition-tag").innerHTML.toLowerCase();

    if (title.indexOf(query) !== -1 || edition.indexOf(query) !== -1) {
      cards[i].classList.remove("hidden");
      visibleCount++;
    } else {
      cards[i].classList.add("hidden");
    }
  }

  const emptyState = document.getElementById("emptyState");
  if (visibleCount === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

// Handle Size Selection
const sizeButtons = document.querySelectorAll(".size-btn");
for (let i = 0; i < sizeButtons.length; i++) {
  sizeButtons[i].addEventListener("click", function () {
    const rowButtons = this.parentElement.querySelectorAll(".size-btn");
    for (let j = 0; j < rowButtons.length; j++) {
      rowButtons[j].classList.remove("selected");
    }
    this.classList.add("selected");
  });
}

// Handle Add to Cart clicks
const addButtons = document.querySelectorAll(".add-to-cart-btn");

for (let i = 0; i < addButtons.length; i++) {
  addButtons[i].addEventListener("click", function () {
    cartCount = cartCount + 1;
    updateCartUI();
  });
}

// Reset search on All Jerseys click
document.getElementById("allJerseysBtn").addEventListener("click", function () {
  document.getElementById("searchInput").value = "";
  filterJerseys();
});

// Live search
document.getElementById("searchInput").addEventListener("keyup", filterJerseys);

// Initialize Cart Display
updateCartUI();