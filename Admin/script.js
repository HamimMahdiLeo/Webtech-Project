// Seeded Orders matching Module 02 + any live orders placed from Cart
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

const WAREHOUSE_STOCK = [
  {
    name: "Bangladesh 26/27 Home Kit",
    price: 990,
    sizes: { S: 12, M: 24, L: 18, XL: 9, XXL: 3 }
  },
  {
    name: "Real Madrid 26/27 Home Kit",
    price: 1050,
    sizes: { S: 8, M: 19, L: 4, XL: 11, XXL: 6 }
  },
  {
    name: "FC Barcelona 26/27 Full Sleeve",
    price: 1290,
    sizes: { S: 5, M: 14, L: 12, XL: 2, XXL: 0 }
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

function formatBDT(num) {
  return "\u09F3" + num.toLocaleString("en-IN");
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

// Render Module 03: Warehouse Stock
function renderStock() {
  const listEl = document.getElementById("warehouseStockList");
  listEl.innerHTML = "";

  for (let i = 0; i < WAREHOUSE_STOCK.length; i++) {
    const item = WAREHOUSE_STOCK[i];
    let totalPcs = 0;
    let chipsHtml = "";

    const sizeKeys = ["S", "M", "L", "XL", "XXL"];
    for (let s = 0; s < sizeKeys.length; s++) {
      const sz = sizeKeys[s];
      const count = item.sizes[sz];
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

      chipsHtml += `<span class="${chipClass}">[Size ${sz}: ${count}${tag}]</span>`;
    }

    const row = document.createElement("div");
    row.className = "stock-row";
    row.innerHTML = `
      <div>
        <div class="stock-title">${item.name} (${formatBDT(item.price)}) &mdash; Total: ${totalPcs} pcs</div>
        <div class="size-chips">${chipsHtml}</div>
      </div>
      <button type="button" class="restock-btn" onclick="restockLowSizes(${i})">+10 RESTOCK LOW</button>
    `;
    listEl.appendChild(row);
  }
}

window.restockLowSizes = function (index) {
  const sizes = WAREHOUSE_STOCK[index].sizes;
  const keys = Object.keys(sizes);
  for (let i = 0; i < keys.length; i++) {
    if (sizes[keys[i]] <= 4) {
      sizes[keys[i]] += 10;
    }
  }
  renderStock();
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