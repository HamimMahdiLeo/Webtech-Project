const STORAGE_KEY = "threadedStoriesBag";
const CUSTOM_UNIT_PRICE = 1150;

let playerDesignDataUrl = "";
let gkDesignDataUrl = "";

// Handle Player Jersey Design Upload Preview
document.getElementById("playerKitUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    playerDesignDataUrl = e.target.result;
    const img = document.getElementById("playerKitPreview");
    img.src = playerDesignDataUrl;
    img.style.display = "block";
    document.getElementById("playerKitPlaceholder").style.display = "none";
  };
  reader.readAsDataURL(file);
});

// Handle GK Jersey Design Upload Preview
document.getElementById("gkKitUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    gkDesignDataUrl = e.target.result;
    const img = document.getElementById("gkKitPreview");
    img.src = gkDesignDataUrl;
    img.style.display = "block";
    document.getElementById("gkKitPlaceholder").style.display = "none";
  };
  reader.readAsDataURL(file);
});

// Add New Player Row to Roster Table
document.getElementById("addPlayerRowBtn").addEventListener("click", function () {
  const tbody = document.getElementById("rosterTableBody");
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>
      <input type="text" class="ts-input player-name-input" placeholder="Player name">
    </td>
    <td>
      <input type="number" class="ts-input squad-num-input" min="0" max="99" placeholder="7">
    </td>
    <td>
      <select class="ts-input size-select-input">
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L" selected>L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
        <option value="S (GK)">S (GK)</option>
        <option value="M (GK)">M (GK)</option>
        <option value="L (GK)">L (GK)</option>
        <option value="XL (GK)">XL (GK)</option>
        <option value="XXL (GK)">XXL (GK)</option>
      </select>
    </td>
    <td class="action-col">
      <button type="button" class="remove-row-btn" title="Remove row">&times;</button>
    </td>
  `;
  tbody.appendChild(tr);
});

// Remove Player Row (keeps at least 1 row)
document.getElementById("rosterTableBody").addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-row-btn")) {
    const rows = document.querySelectorAll("#rosterTableBody tr");
    if (rows.length > 1) {
      event.target.closest("tr").remove();
    }
  }
});

// Submit Custom Order & Proceed to Cart Payment
document.getElementById("customStudioForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const amount = Number(document.getElementById("jerseyAmount").value);
  const teamName = document.getElementById("teamNameInput").value.trim();
  const feedback = document.getElementById("studioFeedback");

  if (!amount || amount < 8) {
    feedback.innerHTML = "Minimum order for custom team jerseys is 8 pieces.";
    return;
  }

  if (!teamName) {
    feedback.innerHTML = "Please enter your Team name.";
    return;
  }

  if (!playerDesignDataUrl) {
    feedback.innerHTML = "Please upload your Player Jersey Design image.";
    return;
  }

  // Collect roster entries
  const rows = document.querySelectorAll("#rosterTableBody tr");
  const roster = [];
  for (let i = 0; i < rows.length; i++) {
    const pName = rows[i].querySelector(".player-name-input").value.trim();
    const pNum = rows[i].querySelector(".squad-num-input").value.trim();
    const pSize = rows[i].querySelector(".size-select-input").value;

    if (pName || pNum) {
      roster.push((pName || "PLAYER") + " #" + (pNum || "0") + " (" + pSize + ")");
    }
  }

  const bag = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  bag.push({
    id: "custom-team-" + Date.now(),
    title: teamName + " Custom Team Kit",
    edition: "CUSTOM STUDIO",
    image: playerDesignDataUrl,
    gkImage: gkDesignDataUrl || "",
    size: "Roster (" + amount + " pcs)",
    price: CUSTOM_UNIT_PRICE,
    qty: amount,
    hasPrint: false,
    printName: roster.join(", "),
    printNumber: "",
    isCustomOrder: true
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bag));
  } catch (err) {
    feedback.innerHTML = "Uploaded design image is too large. Please compress to WebP/JPG under 300KB.";
    return;
  }

  window.location.href = "../Cart/index.html";
});