let cartCount = 0;
let cartTotal = 0;
let currentModalPrice = 0;

function updateCartUI() {
  document.getElementById("cartTotal").innerHTML = cartTotal;
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
      cards[i].style.display = "flex";
      visibleCount++;
    } else {
      cards[i].style.display = "none";
    }
  }

  document.getElementById("itemCount").innerHTML = visibleCount + " items";

  const emptyState = document.getElementById("emptyState");
  if (visibleCount === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

// Open Product Detail Modal
function openProductModal(card) {
  const imgSrc = card.querySelector(".image-p").src;
  const imgAlt = card.querySelector(".image-p").alt;
  const edition = card.querySelector(".edition-tag").innerHTML;
  const title = card.querySelector(".product-title").innerHTML;
  const price = Number(card.querySelector(".product-price").innerHTML);

  currentModalPrice = price;

  document.getElementById("modalImg").src = imgSrc;
  document.getElementById("modalImg").alt = imgAlt;
  document.getElementById("modalEdition").innerHTML = edition;
  document.getElementById("modalTitle").innerHTML = title;
  document.getElementById("modalPrice").innerHTML = price;
  document.getElementById("modalQty").innerHTML = 1;

  // Reset size selection to M
  const sizeButtons = document.querySelectorAll("#productModal .size-btn");
  for (let i = 0; i < sizeButtons.length; i++) {
    if (sizeButtons[i].innerHTML === "M") {
      sizeButtons[i].className = "size-btn selected";
    } else {
      sizeButtons[i].className = "size-btn";
    }
  }

  document.getElementById("productModal").style.display = "flex";
}

function closeProductModal() {
  document.getElementById("productModal").style.display = "none";
}

// Click on any Product Card to open Detail UI
const allCards = document.querySelectorAll(".product-card");
for (let i = 0; i < allCards.length; i++) {
  allCards[i].addEventListener("click", function () {
    openProductModal(allCards[i]);
  });
}

// Quick Add (+) button inside Modal (adds 1 item immediately)
document.getElementById("modalQuickAddBtn").addEventListener("click", function () {
  cartCount = cartCount + 1;
  cartTotal = cartTotal + currentModalPrice;
  updateCartUI();
});

// Modal Size Selection
const modalSizeButtons = document.querySelectorAll("#productModal .size-btn");
for (let i = 0; i < modalSizeButtons.length; i++) {
  modalSizeButtons[i].addEventListener("click", function () {
    for (let j = 0; j < modalSizeButtons.length; j++) {
      modalSizeButtons[j].className = "size-btn";
    }
    this.className = "size-btn selected";
  });
}

// Modal Quantity Increment & Decrement
document.getElementById("modalMinusBtn").addEventListener("click", function () {
  const qtyEl = document.getElementById("modalQty");
  let qty = Number(qtyEl.innerHTML);
  if (qty > 1) {
    qtyEl.innerHTML = qty - 1;
  }
});

document.getElementById("modalPlusBtn").addEventListener("click", function () {
  const qtyEl = document.getElementById("modalQty");
  let qty = Number(qtyEl.innerHTML);
  qtyEl.innerHTML = qty + 1;
});

// Modal Add to Bag button
document.getElementById("modalAddBtn").addEventListener("click", function () {
  const qty = Number(document.getElementById("modalQty").innerHTML);
  cartCount = cartCount + qty;
  cartTotal = cartTotal + currentModalPrice * qty;
  updateCartUI();
  closeProductModal();
});

// Close Modal on X button or clicking dark backdrop
document.getElementById("closeModalBtn").addEventListener("click", closeProductModal);
document.getElementById("productModal").addEventListener("click", function (event) {
  if (event.target.id === "productModal") {
    closeProductModal();
  }
});

// Reset search on ALL JERSEYS nav click
document.getElementById("allJerseysBtn").addEventListener("click", function () {
  document.getElementById("searchInput").value = "";
  filterJerseys();
});

// Category filter nav links
const catLinks = document.querySelectorAll(".cat-link");
for (let i = 0; i < catLinks.length; i++) {
  catLinks[i].addEventListener("click", function () {
    document.getElementById("searchInput").value = this.getAttribute("data-filter");
    filterJerseys();
  });
}

// Live search
document.getElementById("searchInput").addEventListener("keyup", filterJerseys);

// Initialize Cart Display
updateCartUI();