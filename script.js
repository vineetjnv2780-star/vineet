function login() {
  const user = username.value.trim();
  const pass = password.value.trim();
  if (user && pass) {
    localStorage.setItem("vkUser", user);
    window.location.href = "dashboard.html";
  } else {
    alert("Enter valid credentials");
  }
}

function signup() {
  alert("Signup successful! You can now log in.");
}

function logout() {
  localStorage.removeItem("vkUser");
  window.location.href = "index.html";
}

if (document.getElementById("userName")) {
  document.getElementById("userName").innerText = localStorage.getItem("vkUser") || "";
}

const entryForm = document.getElementById("entryForm");
if (entryForm) {
  entryForm.addEventListener("submit", e => {
    e.preventDefault();
    const entry = {
      customerName: customerName.value,
      fatherName: fatherName.value,
      mobileNumber: mobileNumber.value,
      bikeNumber: bikeNumber.value,
      engineNumber: engineNumber.value,
      chassisNumber: chassisNumber.value,
      insuranceStart: insuranceStart.value,
      insuranceEnd: insuranceEnd.value,
      thirdPartyStart: thirdPartyStart.value,
      thirdPartyEnd: thirdPartyEnd.value,
      permanentAddress: permanentAddress.value,
      corrAddress: corrAddress.value,
      bikeLocation: bikeLocation.value,
    };

    const tx = db.transaction("entries", "readwrite");
    tx.objectStore("entries").add(entry);
    tx.oncomplete = () => {
      alert("Entry Saved!");
      window.location.href = "dashboard.html";
    };
  });
}

function searchEntries() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const list = document.getElementById("entriesList");
  const tx = db.transaction("entries", "readonly");
  tx.objectStore("entries").getAll().onsuccess = e => {
    const results = e.target.result.filter(
      item =>
        item.customerName.toLowerCase().includes(search) ||
        item.bikeNumber.toLowerCase().includes(search)
    );
    list.innerHTML = "";
    results.forEach(item => {
      const div = document.createElement("div");
      div.className = "entry-card";
      div.innerHTML = `
        <h3>${item.bikeNumber}</h3>
        <p>${item.customerName}</p>
        <p>${item.mobileNumber}</p>
      `;
      list.appendChild(div);
    });
  };
}
