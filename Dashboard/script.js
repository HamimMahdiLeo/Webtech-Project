const JERSEYS = [
  {
    id: "rm-home-26",
    edition: "LA LIGA • ADIDAS PLAYER EDITION",
    name: "Real Madrid 26/27 Home Kit",
    price: 1050,
    canvas: "light-canvas",
    fallbackColor: "#ffffff",
    imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/78b62417f1e042aeb25e29e745951110_9366/Real_Madrid_24-25_Home_Authentic_Jersey_White_IX8095_01_laydown.jpg"
  },
  {
    id: "fcb-home-26",
    edition: "LA LIGA • NIKE PLAYER EDITION",
    name: "FC Barcelona 26/27 Home Kit",
    price: 1050,
    canvas: "light-canvas",
    fallbackColor: "#1d4ed8",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3b8b295e-8126-43c9-9431-208f7c488f53/FCB+M+NK+DF+JSY+SS+STAD+HM.png"
  },
  {
    id: "ars-home-26",
    edition: "PREMIER LEAGUE • ADIDAS ISSUE",
    name: "Arsenal 26/27 North London Kit",
    price: 990,
    canvas: "light-canvas",
    fallbackColor: "#dc2626",
    imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/608a6427b6a242c4b41e82534372d971_9366/Arsenal_24-25_Home_Jersey_Red_IT6141_01_laydown.jpg"
  },
  {
    id: "mci-home-26",
    edition: "PREMIER LEAGUE • PUMA FAN VERSION",
    name: "Man City 26/27 Sky Blue Home",
    price: 890,
    canvas: "light-canvas",
    fallbackColor: "#67b7dc",
    imageUrl: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/775075/01/fnd/PNA/fmt/png/Manchester-City-24/25-Home-Jersey-Men"
  },
  {
    id: "ban-home-26",
    edition: "BFF OFFICIAL • PLAYER EDITION",
    name: "Bangladesh 26/27 Home Kit",
    price: 990,
    canvas: "mint-canvas",
    fallbackColor: "#006a4e",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Bangladesh_national_football_team_kit_home.png/480px-Bangladesh_national_football_team_kit_home.png"
  },
  {
    id: "bra-home-26",
    edition: "CONMEBOL • NIKE 5-STAR EDITION",
    name: "Brazil 26/27 Seleção Home Kit",
    price: 990,
    canvas: "cream-canvas",
    fallbackColor: "#facc15",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/67834901-8353-427b-833d-27858b288605/CBF+M+NK+DF+JSY+SS+STAD+HM.png"
  },
  {
    id: "esp-home-26",
    edition: "UEFA EURO • ADIDAS PLAYER EDITION",
    name: "Spain 26/27 La Roja Home Kit",
    price: 990,
    canvas: "light-canvas",
    fallbackColor: "#dc2626",
    imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/a82452010b8b422a921b1846b801972c_9366/Spain_24_Home_Jersey_Red_IP9331_01_laydown.jpg"
  },
  {
    id: "arg-home-26",
    edition: "WORLD CHAMP • ADIDAS 3-STAR KIT",
    name: "Argentina 26/27 Albiceleste",
    price: 990,
    canvas: "sky-canvas",
    fallbackColor: "#7dd3fc",
    imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3166b21a50644132831a53f64f160d67_9366/Argentina_24_Home_Jersey_White_IP8409_01_laydown.jpg"
  },
  {
    id: "rm-ls-26",
    edition: "FULL SLEEVE • ADIDAS EDITION",
    name: "Real Madrid 26/27 Long Sleeve",
    price: 1190,
    canvas: "light-canvas",
    fallbackColor: "#ffffff",
    imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/01f0b17134e04b3da59e064a79d1d179_9366/Real_Madrid_24-25_Home_Long_Sleeve_Jersey_White_IX8094_01_laydown.jpg"
  },
  {
    id: "ban-ls-26",
    edition: "FULL SLEEVE • NATIONAL KIT",
    name: "Bangladesh 26/27 Full Sleeve",
    price: 1150,
    canvas: "mint-canvas",
    fallbackColor: "#006a4e",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Bangladesh_national_football_team_kit_home.png/480px-Bangladesh_national_football_team_kit_home.png"
  },
  {
    id: "fcb-ls-26",
    edition: "FULL SLEEVE • NIKE EDITION",
    name: "Barcelona 26/27 Long Sleeve",
    price: 1190,
    canvas: "light-canvas",
    fallbackColor: "#1e3a8a",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3b8b295e-8126-43c9-9431-208f7c488f53/FCB+M+NK+DF+JSY+SS+STAD+HM.png"
  },
  {
    id: "rm-dragon-ls",
    edition: "FULL SLEEVE • JORDAN X PSG SPECIAL",
    name: "PSG Jordan Wings Black Edition LS",
    price: 1250,
    canvas: "light-canvas",
    fallbackColor: "#18181b",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/18653841-952e-4f88-8b2d-3b5c4d2e5f1a/PSG+M+J+DF+JSY+SS+STAD+4TH.png"
  },
  {
    id: "acm-07-retro",
    edition: "2006/07 UCL FINAL • RETRO",
    name: "AC Milan 2006/07 Kaká #22",
    price: 1250,
    canvas: "light-canvas",
    fallbackColor: "#7f1d1d",
    imageUrl: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/774949/01/fnd/PNA/fmt/png/AC-Milan-24/25-Home-Jersey-Men"
  },
  {
    id: "bra-02-retro",
    edition: "2002 WORLD CUP • NIKE REISSUE",
    name: "Brazil 2002 World Cup Home",
    price: 1200,
    canvas: "cream-canvas",
    fallbackColor: "#facc15",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/67834901-8353-427b-833d-27858b288605/CBF+M+NK+DF+JSY+SS+STAD+HM.png"
  },
  {
    id: "arg-86-retro",
    edition: "1986 MEXICO • ADIDAS ORIGINALS",
    name: "Argentina 1986 Maradona #10",
    price: 1200,
    canvas: "sky-canvas",
    fallbackColor: "#38bdf8",
    imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3166b21a50644132831a53f64f160d67_9366/Argentina_24_Home_Jersey_White_IP8409_01_laydown.jpg"
  },
  {
    id: "mun-08-retro",
    edition: "2007/08 MOSCOW • RETRO EDITION",
    name: "Man United 07/08 UCL Final LS",
    price: 1290,
    canvas: "light-canvas",
    fallbackColor: "#dc2626",
    imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/499c287928294c9d891e1217b722c79a_9366/Manchester_United_24-25_Home_Jersey_Red_IU1397_01_laydown.jpg"
  }
];

const SIZES = ["S", "M", "L", "XL", "XXL"];

let cartCount = 1;
let cartTotal = 1240;
let searchQuery = "";
let toastTimer = null;
const selectedSizes = {};

function getFallbackJerseyDataURI(color, label) {
  let textColor = "#ffffff";
  if (color === "#ffffff" || color === "#facc15") {
    textColor = "#1e293b";
  }

  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180">' +
    '<path d="M72 22 L128 22 L166 52 L148 74 L132 60 L132 162 L68 162 L68 60 L52 74 L34 52 Z" ' +
    'fill="' + color + '" stroke="#1e293b" stroke-width="3" stroke-linejoin="round"/>' +
    '<text x="100" y="96" text-anchor="middle" fill="' + textColor + '" font-size="12" font-weight="bold" font-family="Arial, sans-serif">' +
    label +
    "</text></svg>";

  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function createJerseyImageHTML(item) {
  const shortLabel = item.name.split(" ")[0].toUpperCase();
  const fallbackSrc = getFallbackJerseyDataURI(item.fallbackColor, shortLabel);

  return (
    '<img src="' +
    item.imageUrl +
    '" alt="' +
    item.name +
    '" onerror="this.onerror=null; this.src=\'' +
    fallbackSrc +
    "';\">"
  );
}

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

function findProductById(itemId) {
  for (let i = 0; i < JERSEYS.length; i++) {
    if (JERSEYS[i].id === itemId) {
      return JERSEYS[i];
    }
  }
  return null;
}

function renderCatalog() {
  const container = document.getElementById("catalog");
  const query = searchQuery.trim().toLowerCase();
  let cardsHTML = "";
  let matchedCount = 0;

  for (let i = 0; i < JERSEYS.length; i++) {
    const item = JERSEYS[i];
    const matchName = item.name.toLowerCase().indexOf(query) !== -1;
    const matchEdition = item.edition.toLowerCase().indexOf(query) !== -1;

    if (!matchName && !matchEdition) {
      continue;
    }

    matchedCount++;
    const currentSize = selectedSizes[item.id] || "M";

    let sizeButtonsHTML = "";
    for (let s = 0; s < SIZES.length; s++) {
      const sizeLabel = SIZES[s];
      const selectedClass = currentSize === sizeLabel ? " selected" : "";
      sizeButtonsHTML +=
        '<button type="button" class="size-btn' +
        selectedClass +
        '" data-size="' +
        sizeLabel +
        '">' +
        sizeLabel +
        "</button>";
    }

    cardsHTML +=
      '<article class="product-card" data-id="' +
      item.id +
      '">' +
      '<div class="jersey-preview ' +
      item.canvas +
      '">' +
      createJerseyImageHTML(item) +
      "</div>" +
      '<div class="card-body">' +
      '<div class="edition-tag">' +
      item.edition +
      "</div>" +
      '<h3 class="product-title">' +
      item.name +
      "</h3>" +
      '<div class="price-row">' +
      '<span class="product-price">' +
      formatBDT(item.price) +
      "</span>" +
      '<span class="cod-pill">+ COD</span>' +
      "</div>" +
      '<div class="size-selector" data-item-id="' +
      item.id +
      '">' +
      "<span>Size:</span>" +
      sizeButtonsHTML +
      "</div>" +
      '<button type="button" class="btn-primary add-to-cart-btn" data-add-id="' +
      item.id +
      '">Add to Cart</button>' +
      "</div>" +
      "</article>";
  }

  if (matchedCount === 0) {
    container.innerHTML =
      '<div class="empty-state">' +
      '<h3>No jerseys matched "' +
      searchQuery +
      '"</h3>' +
      "<p>Try searching for Real Madrid, Bangladesh, Brazil, or Retro.</p>" +
      "</div>";
    return;
  }

  container.innerHTML = cardsHTML;
}

// Handle Size Selection and Add to Cart clicks
document.getElementById("catalog").addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("size-btn")) {
    const wrapper = target.parentElement;
    const itemId = wrapper.getAttribute("data-item-id");
    selectedSizes[itemId] = target.getAttribute("data-size");

    const buttons = wrapper.querySelectorAll(".size-btn");
    buttons.forEach(function (btn) {
      btn.classList.remove("selected");
    });
    target.classList.add("selected");
    return;
  }

  if (target.classList.contains("add-to-cart-btn")) {
    const itemId = target.getAttribute("data-add-id");
    const product = findProductById(itemId);

    if (product !== null) {
      const chosenSize = selectedSizes[itemId] || "M";
      cartCount = cartCount + 1;
      cartTotal = cartTotal + product.price;
      updateCartUI();
      showToast("Added " + product.name + " (Size " + chosenSize + ") to cart");
    }
  }
});

// Reset search when clicking All Jerseys button
document.getElementById("allJerseysBtn").addEventListener("click", function () {
  searchQuery = "";
  document.getElementById("searchInput").value = "";
  renderCatalog();
});

// Handle Live Search Input
document.getElementById("searchInput").addEventListener("keyup", function (event) {
  searchQuery = event.target.value;
  renderCatalog();
});

// Handle Cart Button Click
document.getElementById("cartBtn").addEventListener("click", function () {
  showToast("Cart: " + cartCount + " item(s) • Total " + formatBDT(cartTotal));
});

// Initial Page Render
renderCatalog();
updateCartUI();