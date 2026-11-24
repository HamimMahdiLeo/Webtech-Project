const CATALOG_KEY = "threadedStoriesCatalog";

const SEED_ORDERS = [
  {
    id: "ORD-9841",
    customer: "Tanvir Ahmed (Dhaka)",
    kit: "Bangladesh 26/27 Home (M)",
    print: "HAMZA #8",
    total: 1240,
    status: "Custom Printing"
  },
  {
    id: "ORD-9840",
    customer: "Md. Rafiul (Narayanganj)",
    kit: "Real Madrid 26/27 Home (L)",
    print: "MBAPPE #9",
    total: 1310,
    status: "Pending"
  },
  {
    id: "ORD-9839",
    customer: "Sabbir Hossain (Ctg)",
    kit: "AC Milan 2007 Retro Bwin (XL)",
    print: "KAKA #22",
    total: 1360,
    status: "Shipped"
  },
  {
    id: "ORD-9838",
    customer: "Farhan Sadik (Uttara)",
    kit: "Barcelona Full Sleeve (M)",
    print: "Standard Blank",
    total: 1290,
    status: "Delivered"
  },
  {
    id: "ORD-9837",
    customer: "Nafis Fuad (Sylhet)",
    kit: "Brazil 26/27 Seleção Home (L)",
    print: "VINICIUS #7",
    total: 1360,
    status: "Delivered"
  }
];

const CUSTOMER_REVIEWS = [
  {
    author: "Tanvir Ahmed",
    kit: "AC Milan 2006/07 Retro Bwin",
    quote: "Alhamdulillah jersey quality 100/100! The Thai Player Edition breathable mesh feels official.",
    featured: true
  },
  {
    author: "Mahmudul Hasan",
    kit: "Bangladesh 26/27 Home Kit",
    quote: "Ordered Size L with HAMZA #8 custom font. Print quality is super sharp!",
    featured: false
  }
];

const VIP_PROFILES = [
  {
    name: "Tanvir Ahmed",
    phone: "01711-234567",
    area: "Dhanmondi, Dhaka",
    fit: "Size M (Player Fit)",
    ordersCount: 9,
    totalSpent: 11450
  },
  {
    name: "Sabbir Hossain",
    phone: "01912-345678",
    area: "Agrabad, Chattogram",
    fit: "Size XL (Retro Fit)",
    ordersCount: 6,
    totalSpent: 7890
  }
];

const STATUS_CYCLE = ["Pending", "Custom Printing", "Shipped", "Delivered"];
let orders = [...SEED_ORDERS];
let uploadedJerseyDataUrl = "";

function formatBDT(num) {
  return "\u09F3" + num.toLocaleString("en-IN");
}

function getCatalog() {
  return JSON.parse(localStorage.getItem(CATALOG_KEY)) || [];
}

function saveCatalog(catalog) {
  localStorage.setItem(CATALOG_KEY, JSON.stringify(catalog));
}

// Sidebar Module Navigation
const menuButtons = document.querySelectorAll(".menu-btn");
const moduleViews = document.querySelectorAll(".module-view");

for (let i = 0; i < menuButtons.length; i++) {
  menuButtons[i].addEventListener("click", function () {
    for (let j = 0; j < menuButtons.length; j++) {
      menuButtons[j].classList.remove("active");
    }
    for (let k = 0; k < moduleViews.length; k++) {
      moduleViews[k].classList.remove("active");
    }

    this.classList.add("active");
    const targetId = this.getAttribute("data-module");
    document.getElementById(targetId).classList.add("active");
  });
}

// Module 03: Image Upload Preview inside Table
document.getElementById("adminKitImg").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    uploadedJerseyDataUrl = e.target.result;
    const previewImg = document.getElementById("adminKitPreview");
    previewImg.src = uploadedJerseyDataUrl;
    previewImg.style.display = "block";
    document.getElementById("adminUploadPlaceholder").style.display = "none";
  };
  reader.readAsDataURL(file);
});

// Module 03: Table Form Submit -> Saves Team name, Quantity per Size, Price, Caption, Tag, Jersey Image
document.getElementById("addJerseyForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const teamName = document.getElementById("adminKitName").value.trim();
  const price = Number(document.getElementById("adminKitPrice").value);
  const caption = document.getElementById("adminKitCaption").value.trim();
  const tag = document.getElementById("adminKitTag").value;
  const msgEl = document.getElementById("adminKitMsg");

  const sizeMap = {
    S: Math.max(0, Number(document.getElementById("qtySizeS").value) || 0),
    M: Math.max(0, Number(document.getElementById("qtySizeM").value) || 0),
    L: Math.max(0, Number(document.getElementById("qtySizeL").value) || 0),
    XL: Math.max(0, Number(document.getElementById("qtySizeXL").value) || 0),
    XXL: Math.max(0, Number(document.getElementById("qtySizeXXL").value) || 0)
  };

  const totalUnits = sizeMap.S + sizeMap.M + sizeMap.L + sizeMap.XL + sizeMap.XXL;

  if (!teamName || totalUnits < 1 || price < 100 || !uploadedJerseyDataUrl) {
    msgEl.style.color = "#ff3333";
    msgEl.innerHTML = "Please fill in Team name, at least 1 size quantity, Price, and Jersey Image.";
    return;
  }

  const catalog = getCatalog();
  catalog.unshift({
    id: "kit-" + Date.now(),
    name: teamName,
    price: price,
    caption: caption,
    tag: tag,
    image: uploadedJerseyDataUrl,
    sizes: sizeMap
  });

  try {
    saveCatalog(catalog);
  } catch (err) {
    msgEl.style.color = "#ff3333";
    msgEl.innerHTML = "Image file is too large for browser storage. Use a compressed WebP/JPG under 300KB.";
    return;
  }

  // Reset form & preview
  document.getElementById("addJerseyForm").reset();
  uploadedJerseyDataUrl = "";
  document.getElementById("adminKitPreview").style.display = "none";
  document.getElementById("adminUploadPlaceholder").style.display = "inline";

  msgEl.style.color = "#c6ff00";
  msgEl.innerHTML = teamName + " (" + totalUnits + " pcs) published to Dashboard!";
  renderStock();
});

// Render Module 03: Live Warehouse Stock synced with Dashboard
function renderStock() {
  const listEl = document.getElementById("warehouseStockList");
  const catalog = getCatalog();
  listEl.innerHTML = "";

  if (catalog.length === 0) {
    listEl.innerHTML = `<p style="color:#888888; font-size:13px;">No jerseys published yet. Use the table above to add your first jersey to the Dashboard.</p>`;
    return;
  }

  for (let i = 0; i < catalog.length; i++) {
    const item = catalog[i];
    let totalPcs = 0;
    let chipsHtml = "";

    const sizeKeys = ["S", "M", "L", "XL", "XXL"];
    for (let s = 0; s < sizeKeys.length; s++) {
      const sz = sizeKeys[s];
      const count = item.sizes[sz] || 0;
      totalPcs += count;

      let chipClass = "chip-ok";
      let tag = "";
      if (count === 0) {
        chipClass = "chip-out";
        tag = " OUT";
      } else if (count <= 4) {
        chipClass = "chip-low";
        tag = " LOW";
      }

      chipsHtml += `<span class="size-box-badge ${chipClass}">Size ${sz}: ${count}${tag}</span>`;
    }

    const row = document.createElement("div");
    row.className = "stock-row";
    row.innerHTML = `
      <div>
        <div class="stock-title">
          ${item.name} &mdash; ${formatBDT(item.price)} <span>&bull; ${totalPcs} pcs (${item.tag})</span>
        </div>
        ${item.caption ? `<div class="stock-caption">${item.caption}</div>` : ""}
      </div>
      <div class="stock-right-group">
        <div class="size-chips">${chipsHtml}</div>
        <button type="button" class="restock-btn" onclick="restockLowSizes(${i})">+10</button>
        <button type="button" class="remove-kit-btn" onclick="removeJersey(${i})">REMOVE</button>
      </div>
    `;
    listEl.appendChild(row);
  }
}

window.restockLowSizes = function (index) {
  const catalog = getCatalog();
  const sizes = catalog[index].sizes;
  const keys = Object.keys(sizes);
  for (let i = 0; i < keys.length; i++) {
    if (sizes[keys[i]] <= 4) {
      sizes[keys[i]] += 10;
    }
  }
  saveCatalog(catalog);
  renderStock();
};

window.removeJersey = function (index) {
  const catalog = getCatalog();
  catalog.splice(index, 1);
  saveCatalog(catalog);
  renderStock();
};

// Render Module 02: Orders Queue
function renderOrders() {
  const listEl = document.getElementById("ordersQueueList");
  listEl.innerHTML = "";

  document.getElementById("sidebarOrderCount").innerHTML = orders.length;

  for (let i = 0; i < orders.length; i++) {
    const ord = orders[i];
    let statusClass = "status-pending";
    if (ord.status === "Custom Printing") statusClass = "status-printing";
    if (ord.status === "Shipped") statusClass = "status-shipped";
    if (ord.status === "Delivered") statusClass = "status-delivered";

    const row = document.createElement("div");
    row.className = "queue-row";
    row.innerHTML = `
      <span class="ord-id">${ord.id}</span>
      <span>${ord.customer}</span>
      <span>${ord.kit}</span>
      <span>${ord.print}</span>
      <strong>${formatBDT(ord.total)}</strong>
      <button type="button" class="status-pill ${statusClass}" onclick="cycleOrderStatus(${i})">
        ${ord.status}
      </button>
    `;
    listEl.appendChild(row);
  }
}

window.cycleOrderStatus = function (index) {
  const current = orders[index].status;
  const nextIdx = (STATUS_CYCLE.indexOf(current) + 1) % STATUS_CYCLE.length;
  orders[index].status = STATUS_CYCLE[nextIdx];
  renderOrders();
};

// Render Module 04: Customer Reviews
function renderReviews() {
  const listEl = document.getElementById("reviewsModList");
  listEl.innerHTML = "";

  for (let i = 0; i < CUSTOMER_REVIEWS.length; i++) {
    const rev = CUSTOMER_REVIEWS[i];
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <div class="review-head">
        <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        ${rev.author} &mdash; ${rev.kit}
        <span class="verified-tag">[&#10003; Verified Buyer]</span>
      </div>
      <p class="review-quote">"${rev.quote}"</p>
      <button type="button" class="feature-toggle-btn ${rev.featured ? "featured" : ""}" onclick="toggleFeaturedReview(${i})">
        ${rev.featured ? "&#9733; Featured on Home" : "+ Feature on Home"}
      </button>
    `;
    listEl.appendChild(card);
  }
}

window.toggleFeaturedReview = function (index) {
  CUSTOMER_REVIEWS[index].featured = !CUSTOMER_REVIEWS[index].featured;
  renderReviews();
};

// Render Module 05: VIP Collector Profiles
function renderProfiles() {
  const gridEl = document.getElementById("vipProfilesGrid");
  gridEl.innerHTML = "";

  for (let i = 0; i < VIP_PROFILES.length; i++) {
    const user = VIP_PROFILES[i];
    const card = document.createElement("div");
    card.className = "ts-panel profile-card";
    card.innerHTML = `
      <h3>${user.name} <span class="vip-tag">[VIP Collector]</span></h3>
      <p class="profile-contact">${user.phone} &bull; ${user.area}</p>
      <p class="profile-stats">
        Preferred Fit: ${user.fit} &bull; ${user.ordersCount} Orders (${formatBDT(user.totalSpent)})
      </p>
    `;
    gridEl.appendChild(card);
  }
}

// Initialize all 5 modules
renderOrders();
renderStock();
renderReviews();
renderProfiles();