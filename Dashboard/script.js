const CATALOG_KEY = "threadedStoriesCatalog";
const STORAGE_KEY = "threadedStoriesBag";

let bag = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentModalPrice = 0;
let currentModalTitle = "";
let currentModalEdition = "";
let currentModalImage = "";

// Sync header Bag total & count
function updateCartUI() {
  let totalQty = 0;
  let totalCost = 0;

  for (let i = 0; i < bag.length; i++) {
    totalQty += bag[i].qty;
    totalCost += (bag[i].price + (bag[i].hasPrint ? 250 : 0)) * bag[i].qty;
  }

  document.getElementById("cartTotal").innerHTML = totalCost.toLocaleString("en-IN");
  document.getElementById("cartCount").innerHTML = totalQty;
}

// Render jerseys added from Admin
function renderCatalog() {
  const catalog = document.getElementById("catalog");
  const emptyState = document.getElementById("emptyState");
  const products = JSON.parse(localStorage.getItem(CATALOG_KEY)) || [];

  const oldCards = catalog.querySelectorAll(".product-card");
  for (let i = 0; i < oldCards.length; i++) {
    oldCards[i].remove();
  }

  document.getElementById("itemCount").innerHTML = products.length + " items";

  if (products.length === 0) {
    emptyState.querySelector("h3").innerHTML = "No jerseys available yet";
    emptyState.querySelector("p").innerHTML = "New season drops will appear here once added by the admin.";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    const displayTitle = item.kit ? item.name + " (" + item.kit + ")" : item.name;
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image">
        <img src="${item.image}" alt="${displayTitle}" class="image-p">
        <span class="preview-badge">QUICK PREVIEW</span>
      </div>
      <div class="product-info">
        <small class="edition-tag">${item.tag.toUpperCase()}</small>
        <h3 class="product-title">${displayTitle}</h3>
        <p class="price-row">&#2547;<span class="product-price">${item.price}</span></p>
      </div>
    `;

    card.addEventListener("click", function () {
      openProductModal(card, item);
    });

    catalog.insertBefore(card, emptyState);
  }
}

// Filter jerseys by search text or nav category
function filterJerseys() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const cards = document.querySelectorAll(".product-card");
  const emptyState = document.getElementById("emptyState");
  let visibleCount = 0;

  if (cards.length === 0) {
    document.getElementById("itemCount").innerHTML = "0 items";
    emptyState.querySelector("h3").innerHTML = "No jerseys available yet";
    emptyState.querySelector("p").innerHTML = "New season drops will appear here once added by the admin.";
    emptyState.style.display = "block";
    return;
  }

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

  if (visibleCount === 0) {
    emptyState.querySelector("h3").innerHTML = "No jerseys matched your search";
    emptyState.querySelector("p").innerHTML = "Try searching for another team, club, or collection.";
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

// Open Product Detail Modal
function openProductModal(card, item) {
  const imgSrc = item ? item.image : card.querySelector(".image-p").src;
  const imgAlt = card.querySelector(".image-p").alt;
  const edition = card.querySelector(".edition-tag").innerHTML;
  const title = card.querySelector(".product-title").innerHTML;
  const price = Number(card.querySelector(".product-price").innerHTML);

  currentModalPrice = price;
  currentModalTitle = title;
  currentModalEdition = edition;
  currentModalImage = imgSrc;

  document.getElementById("modalImg").src = imgSrc;
  document.getElementById("modalImg").alt = imgAlt;
  document.getElementById("modalEdition").innerHTML = edition;
  document.getElementById("modalTitle").innerHTML = title;
  document.getElementById("modalPrice").innerHTML = price;
  document.getElementById("modalQty").innerHTML = 1;

  // Render optional Admin Caption below title
  let captionEl = document.getElementById("modalCaption");
  if (!captionEl) {
    captionEl = document.createElement("p");
    captionEl.id = "modalCaption";
    captionEl.style.color = "#aaaaaa";
    captionEl.style.fontSize = "13px";
    captionEl.style.marginBottom = "12px";
    const titleEl = document.getElementById("modalTitle");
    titleEl.parentNode.insertBefore(captionEl, titleEl.nextSibling);
  }
  captionEl.innerHTML = item && item.caption ? item.caption : "";
  captionEl.style.display = item && item.caption ? "block" : "none";

  // Enable only sizes with stock > 0 and auto-select the first available size
  const sizeButtons = document.querySelectorAll("#productModal .size-btn");
  let firstAvailableSelected = false;

  for (let i = 0; i < sizeButtons.length; i++) {
    const sz = sizeButtons[i].innerHTML;
    const available = item && item.sizes ? (item.sizes[sz] || 0) > 0 : true;

    sizeButtons[i].disabled = !available;
    sizeButtons[i].style.opacity = available ? "1" : "0.35";
    sizeButtons[i].style.cursor = available ? "pointer" : "not-allowed";

    if (available && !firstAvailableSelected) {
      sizeButtons[i].className = "size-btn selected";
      firstAvailableSelected = true;
    } else {
      sizeButtons[i].className = "size-btn";
    }
  }

  document.getElementById("productModal").style.display = "flex";
}

function closeProductModal() {
  document.getElementById("productModal").style.display = "none";
}

// Modal Size Selection
const modalSizeButtons = document.querySelectorAll("#productModal .size-btn");
for (let i = 0; i < modalSizeButtons.length; i++) {
  modalSizeButtons[i].addEventListener("click", function () {
    if (this.disabled) return;
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
  const selectedBtn = document.querySelector("#productModal .size-btn.selected");
  if (!selectedBtn) return;

  const qty = Number(document.getElementById("modalQty").innerHTML);
  const selectedSize = selectedBtn.innerHTML;
  const itemId = currentModalTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + selectedSize.toLowerCase();

  let found = false;
  for (let i = 0; i < bag.length; i++) {
    if (bag[i].id === itemId) {
      bag[i].qty += qty;
      found = true;
      break;
    }
  }

  if (!found) {
    bag.push({
      id: itemId,
      title: currentModalTitle,
      edition: currentModalEdition,
      image: currentModalImage,
      size: selectedSize,
      price: currentModalPrice,
      qty: qty,
      hasPrint: false,
      printName: "",
      printNumber: "",
      isCustomOrder: false
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bag));
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

// Live sync if Admin updates catalog or Cart updates bag in another open tab
window.addEventListener("storage", function (event) {
  if (event.key === CATALOG_KEY) {
    renderCatalog();
    filterJerseys();
  }
  if (event.key === STORAGE_KEY) {
    bag = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    updateCartUI();
  }
});

// Initialize Catalog & Cart Display
renderCatalog();
updateCartUI();