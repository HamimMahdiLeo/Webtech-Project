const STORAGE_KEY = "threadedStoriesBag";
const PRINT_FEE = 250;
const FREE_DHAKA_THRESHOLD = 2500;

let bag = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let deliveryZone = "dhaka";
let paymentMethod = "Cash on Delivery";
let promoApplied = false;

function formatBDT(amount) {
  return "\u09F3" + Math.round(amount).toLocaleString("en-IN");
}

function saveBag() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bag));
}

function getTotals() {
  let subtotal = 0;
  let printTotal = 0;
  let totalQty = 0;

  for (let i = 0; i < bag.length; i++) {
    const item = bag[i];
    subtotal += item.price * item.qty;
    if (item.hasPrint) {
      printTotal += PRINT_FEE * item.qty;
    }
    totalQty += item.qty;
  }

  const merchTotal = subtotal + printTotal;
  const discount = promoApplied ? Math.round(merchTotal * 0.1) : 0;
  const afterDiscount = merchTotal - discount;

  let delivery = 0;
  if (afterDiscount > 0) {
    if (deliveryZone === "dhaka") {
      delivery = afterDiscount >= FREE_DHAKA_THRESHOLD ? 0 : 70;
    } else {
      delivery = 130;
    }
  }

  return {
    subtotal: subtotal,
    printTotal: printTotal,
    merchTotal: merchTotal,
    discount: discount,
    delivery: delivery,
    grandTotal: afterDiscount + delivery,
    totalQty: totalQty
  };
}

function renderBag() {
  const emptyView = document.getElementById("emptyBagView");
  const activeView = document.getElementById("activeBagView");
  const listEl = document.getElementById("bagItemsList");
  const totals = getTotals();

  document.getElementById("navCartTotal").innerHTML = formatBDT(totals.grandTotal);
  document.getElementById("navCartCount").innerHTML = totals.totalQty;
  document.getElementById("bagItemsLabel").innerHTML =
    totals.totalQty + (totals.totalQty === 1 ? " ITEM" : " ITEMS");

  if (bag.length === 0) {
    emptyView.style.display = "block";
    activeView.style.display = "none";
    document.getElementById("clearBagBtn").style.display = "none";
    return;
  }

  emptyView.style.display = "none";
  activeView.style.display = "grid";
  document.getElementById("clearBagBtn").style.display = "inline-block";

  listEl.innerHTML = "";

  for (let i = 0; i < bag.length; i++) {
    const item = bag[i];
    const rowTotal = (item.price + (item.hasPrint ? PRINT_FEE : 0)) * item.qty;

    const card = document.createElement("div");
    card.className = "bag-item-card";

    const thumbHtml = item.image
      ? `<img src="${item.image}" alt="${item.title}">`
      : `<div class="custom-kit-badge">CUSTOM<br>STUDIO</div>`;

    const customizationHtml = item.isCustomOrder
      ? `<div class="custom-roster-note">Team: ${item.teamName} &bull; Roster: ${item.roster}</div>`
      : `<div class="kit-print-bar">
           <label class="print-toggle-label">
             <input type="checkbox" ${item.hasPrint ? "checked" : ""} onchange="togglePrint(${i})">
             Add Player Name &amp; Number (+&#2547;${PRINT_FEE}/kit)
           </label>
           ${
             item.hasPrint
               ? `<div class="print-inputs">
                    <input type="text" class="print-name-input" maxlength="14" placeholder="PLAYER NAME (e.g. YAMAL)" value="${item.printName || ""}" oninput="updatePrintField(${i}, 'printName', this.value)">
                    <input type="text" class="print-num-input" maxlength="2" placeholder="NO." value="${item.printNumber || ""}" oninput="updatePrintField(${i}, 'printNumber', this.value)">
                  </div>`
               : ""
           }
         </div>`;

    card.innerHTML = `
      <div class="bag-item-thumb">${thumbHtml}</div>
      <div class="bag-item-body">
        <div class="bag-item-top">
          <div>
            <span class="bag-item-edition">${item.edition}</span>
            <h3 class="bag-item-title">${item.title}</h3>
            <p class="bag-item-meta">Size: <strong>${item.size}</strong> &bull; Unit: ${formatBDT(item.price)}</p>
          </div>
          <button type="button" class="remove-item-btn" onclick="removeItem(${i})">&times;</button>
        </div>

        ${customizationHtml}

        <div class="bag-item-bottom">
          <div class="qty-control">
            <button type="button" class="qty-btn" onclick="changeQty(${i}, -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button type="button" class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
          </div>
          <div class="bag-item-price">${formatBDT(rowTotal)}</div>
        </div>
      </div>
    `;

    listEl.appendChild(card);
  }

  // Update Free Dhaka Delivery Meter
  const meterText = document.getElementById("shippingMeterText");
  const meterFill = document.getElementById("shippingMeterFill");

  if (deliveryZone === "dhaka") {
    if (totals.merchTotal >= FREE_DHAKA_THRESHOLD) {
      meterText.innerHTML = "FREE Inside Dhaka delivery unlocked!";
      meterFill.style.width = "100%";
    } else {
      const needed = FREE_DHAKA_THRESHOLD - totals.merchTotal;
      meterText.innerHTML = "Add " + formatBDT(needed) + " more for FREE Inside Dhaka delivery";
      meterFill.style.width = Math.min(100, (totals.merchTotal / FREE_DHAKA_THRESHOLD) * 100) + "%";
    }
  } else {
    meterText.innerHTML = "Outside Dhaka Express Courier — Flat &#2547;130";
    meterFill.style.width = "100%";
  }

  // Update Totals
  document.getElementById("subtotalVal").innerHTML = formatBDT(totals.subtotal);
  document.getElementById("printTotalVal").innerHTML = formatBDT(totals.printTotal);

  const discountRow = document.getElementById("discountRow");
  if (promoApplied) {
    discountRow.style.display = "flex";
    document.getElementById("discountVal").innerHTML = "-" + formatBDT(totals.discount);
  } else {
    discountRow.style.display = "none";
  }

  document.getElementById("deliveryVal").innerHTML =
    totals.delivery === 0 ? '<span class="text-lime">FREE</span>' : formatBDT(totals.delivery);
  document.getElementById("grandTotalVal").innerHTML = formatBDT(totals.grandTotal);
  document.getElementById("checkoutPayableVal").innerHTML = formatBDT(totals.grandTotal);
}

// Item Actions
window.changeQty = function (index, delta) {
  const minAllowed = bag[index].isCustomOrder ? 8 : 1;
  const nextQty = bag[index].qty + delta;

  if (nextQty < minAllowed) {
    if (!bag[index].isCustomOrder) {
      bag.splice(index, 1);
    }
  } else {
    bag[index].qty = nextQty;
  }
  saveBag();
  renderBag();
};

window.removeItem = function (index) {
  bag.splice(index, 1);
  saveBag();
  renderBag();
};

window.togglePrint = function (index) {
  bag[index].hasPrint = !bag[index].hasPrint;
  saveBag();
  renderBag();
};

window.updatePrintField = function (index, field, value) {
  bag[index][field] = value;
  saveBag();
};

// Clear Entire Bag
document.getElementById("clearBagBtn").addEventListener("click", function () {
  bag = [];
  promoApplied = false;
  saveBag();
  renderBag();
});

// Promo Code
document.getElementById("applyPromoBtn").addEventListener("click", function () {
  const code = document.getElementById("promoInput").value.trim().toUpperCase();
  const feedback = document.getElementById("promoFeedback");

  if (code === "THREADED10") {
    promoApplied = true;
    feedback.style.color = "#c6ff00";
    feedback.innerHTML = "Code THREADED10 applied — 10% off your order!";
  } else {
    promoApplied = false;
    feedback.style.color = "#ff3333";
    feedback.innerHTML = "Invalid promo code. Try THREADED10.";
  }
  renderBag();
});

// Delivery Zone Tabs
const zoneTabs = document.querySelectorAll(".zone-tab");
for (let i = 0; i < zoneTabs.length; i++) {
  zoneTabs[i].addEventListener("click", function () {
    for (let j = 0; j < zoneTabs.length; j++) {
      zoneTabs[j].className = "zone-tab";
    }
    this.className = "zone-tab active";
    deliveryZone = this.getAttribute("data-zone");
    renderBag();
  });
}

// Toggle Summary vs Checkout Form
document.getElementById("openCheckoutBtn").addEventListener("click", function () {
  document.getElementById("summaryCard").style.display = "none";
  document.getElementById("checkoutCard").style.display = "block";
});

document.getElementById("backToSummaryBtn").addEventListener("click", function () {
  document.getElementById("checkoutCard").style.display = "none";
  document.getElementById("summaryCard").style.display = "block";
});

// Payment Method Selection
const payOptions = document.querySelectorAll(".pay-option");
for (let i = 0; i < payOptions.length; i++) {
  payOptions[i].addEventListener("click", function () {
    for (let j = 0; j < payOptions.length; j++) {
      payOptions[j].className = "pay-option";
    }
    this.className = "pay-option active";
    paymentMethod = this.getAttribute("data-pay");
  });
}

// Express Checkout Validation & Submit
document.getElementById("checkoutForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("buyerName");
  const phoneInput = document.getElementById("buyerPhone");
  const addressInput = document.getElementById("buyerAddress");

  document.getElementById("nameError").innerHTML = "";
  document.getElementById("phoneError").innerHTML = "";
  document.getElementById("addressError").innerHTML = "";
  nameInput.className = "";
  phoneInput.className = "";
  addressInput.className = "";

  let valid = true;

  if (nameInput.value.trim().length < 2) {
    nameInput.className = "errorBorder";
    document.getElementById("nameError").innerHTML = "Please enter your full name.";
    valid = false;
  }

  const phoneVal = phoneInput.value.trim();
  if (!/^01[3-9]\d{8}$/.test(phoneVal)) {
    phoneInput.className = "errorBorder";
    document.getElementById("phoneError").innerHTML = "Enter a valid 11-digit BD mobile number (01XXXXXXXXX).";
    valid = false;
  }

  if (addressInput.value.trim().length < 6) {
    addressInput.className = "errorBorder";
    document.getElementById("addressError").innerHTML = "Please enter your complete delivery address.";
    valid = false;
  }

  if (valid) {
    const totals = getTotals();
    const orderNum = "#TS-" + Math.floor(1000 + Math.random() * 9000);

    document.getElementById("orderRefCode").innerHTML = orderNum;
    document.getElementById("orderConfirmDetails").innerHTML =
      "Thank you, " + nameInput.value.trim() + "! Your order of " + formatBDT(totals.grandTotal) +
      " (" + paymentMethod + ") will be delivered to " + addressInput.value.trim() + ".";

    bag = [];
    saveBag();
    document.getElementById("orderConfirmModal").style.display = "flex";
  }
});

renderBag();