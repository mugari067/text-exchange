document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.querySelector(".login-container");
  const form = loginContainer.querySelector("form");
  const emailInput = form.querySelector('input[type="text"], input[type="email"]');
  const passInput = form.querySelector('input[type="password"]');
  const errorP = loginContainer.querySelector("p");
  const listingsSection = document.getElementById("listings-section");
  const listingsDiv = document.getElementById("listings");

// Create Favourite button
  const favButton = document.createElement("button");
  favButton.textContent = "Favourite";
  favButton.style.flex = "1";
  favButton.style.margin = "0 5px";
  favButton.style.padding = "8px";
  favButton.style.borderRadius = "5px";
  favButton.style.border = "none";
  favButton.style.background = "#2196F3";
  favButton.style.color = "white";
  favButton.style.cursor = "pointer";

 // Create Log out button
  const logoutButton = document.createElement("button");
  logoutButton.textContent = "Log out";
  logoutButton.style.flex = "1";
  logoutButton.style.marginLeft = "5px";
  logoutButton.style.padding = "8px";
  logoutButton.style.borderRadius = "5px";
  logoutButton.style.border = "none";
  logoutButton.style.background = "#2196F3";
  logoutButton.style.color = "white";
  logoutButton.style.cursor = "pointer";


// Create a container ONLY for fake listings
const fakeListsBox = document.createElement("div");
fakeListsBox.id = "fake-lists-box";
fakeListsBox.style.maxHeight = "400px";
fakeListsBox.style.overflowY = "auto";
fakeListsBox.style.border = "1px solid #ccc";
fakeListsBox.style.padding = "10px";
fakeListsBox.style.marginBottom = "20px";
fakeListsBox.style.borderRadius = "8px";
fakeListsBox.style.background = "#fff";

// Insert fakeListsBox before normal listings
listingsSection.insertBefore(fakeListsBox, listingsDiv);

  
    // Make listings scrollable inside a box
const listingsContainer = listingsDiv.parentNode; // parent wrapper
listingsContainer.style.maxHeight = "700px";   // height of box
listingsContainer.style.overflowY = "auto";    // vertical scroll
listingsContainer.style.border = "1px solid #ccc";
listingsContainer.style.borderRadius = "8px";
listingsContainer.style.padding = "10px";
listingsContainer.style.background = "#f9f9f9";


  // Create search bar dynamically
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search listings...";
  searchInput.id = "searchBar";
  searchInput.style.margin = "10px 0";
  searchInput.style.padding = "8px";
  searchInput.style.width = "70%";
  searchInput.style.borderRadius = "5px";
  searchInput.style.border = "1px solid #ccc";

  // Create search button
  const searchButton = document.createElement("button");
  searchButton.textContent = "Search";
  searchButton.style.marginLeft = "10px";
  searchButton.style.padding = "8px 12px";
  searchButton.style.borderRadius = "5px";
  searchButton.style.border = "none";
  searchButton.style.background = "#2196F3";
  searchButton.style.color = "white";
  searchButton.style.cursor = "pointer";

  // Create container for row buttons
  const buttonRow = document.createElement("div");
  buttonRow.style.display = "flex";
  buttonRow.style.justifyContent = "space-between";
  buttonRow.style.margin = "10px 0";

  // Create +Add list button
  const addButton = document.createElement("button");
  addButton.textContent = "+ Add list";
  addButton.style.flex = "1";
  addButton.style.marginRight = "5px";
  addButton.style.padding = "10px";
  addButton.style.borderRadius = "8px";
  addButton.style.border = "none";
  addButton.style.background = "#2196F3";
  addButton.style.color = "white";
  addButton.style.cursor = "pointer";

  

 
  // Append buttons to row
  buttonRow.appendChild(addButton);
  buttonRow.appendChild(favButton);
  buttonRow.appendChild(logoutButton);



addButton.addEventListener("click", () => {
  if (document.getElementById("addListForm")) return;

  const formDiv = document.createElement("div");
  formDiv.id = "addListForm";
  formDiv.style.background = "#2a2a40";
  formDiv.style.padding = "15px";
  formDiv.style.margin = "10px 0";
  formDiv.style.border = "1px solid #ccc";
  formDiv.style.borderRadius = "8px";

  formDiv.innerHTML = `
    <h3>Add New Listing</h3>
    <input type="text" id="titleInput" placeholder="Title" style="width: 90%; margin: 5px 0; padding: 8px;" required><br>
    <input type="text" id="authorInput" placeholder="Author" style="width: 90%; margin: 5px 0; padding: 8px;" required><br>
    <input type="number" id="priceInput" placeholder="Price" style="width: 90%; margin: 5px 0; padding: 8px;" required><br>
    <input type="text" id="contactInput" placeholder="Contact Number" style="width: 90%; margin: 5px 0; padding: 8px;" required><br>
    <input type="file" id="fileInput" accept="image/*" style="margin: 5px 0;"><br>
    <button id="submitListBtn" style="padding: 8px 12px; background: #4CAF50; color: white; border: none; border-radius:5px; cursor:pointer;">Add Listing</button>
    <button id="cancelListBtn" style="padding: 8px 12px; background: #f44336; color: white; border: none; border-radius:5px; cursor:pointer; margin-left:5px;">Cancel</button>
  `;

  buttonRow.parentNode.insertBefore(formDiv, listingsDiv);

  document.getElementById("cancelListBtn").addEventListener("click", () => formDiv.remove());

  document.getElementById("submitListBtn").addEventListener("click", () => {
    const title = document.getElementById("titleInput").value.trim();
    const author = document.getElementById("authorInput").value.trim();
    const price = document.getElementById("priceInput").value.trim();
    const contact = document.getElementById("contactInput").value.trim();
    const fileInput = document.getElementById("fileInput");

    if (!title || !author || !price || !contact) {
      alert("Please fill in all fields.");
      return;
    }

    const newListing = document.createElement("div");
    newListing.className = "listing-item";
    newListing.style.border = "1px solid #2a2a40";
    newListing.style.padding = "10px";
    newListing.style.margin = "10px 0";
    newListing.style.borderRadius = "8px";
    newListing.style.background ="#2a2a40";
    newListing.style.display = "flex";
    newListing.style.alignItems = "center";
    newListing.style.gap = "15px";
    newListing.style.justifyContent = "space-between";

    // Text container
    const textDiv = document.createElement("div");
    textDiv.innerHTML = `
      <strong>Title:</strong> ${title}<br>
      <strong>Author:</strong> ${author}<br>
      <strong>Price:</strong> ${price}<br>
      <strong>Contact Number:</strong> ${contact}
    `;
    newListing.appendChild(textDiv);

    // Image preview
    if (fileInput.files[0]) {
      const img = document.createElement("img");
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "5px";

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(fileInput.files[0]);

      newListing.appendChild(img);
    }

    // Buttons container (Favourite + Delete)
    const btnContainer = document.createElement("div");
    btnContainer.style.display = "flex";
    btnContainer.style.flexDirection = "column";
    btnContainer.style.gap = "5px";

    // Favourite button
    const favBtn = document.createElement("button");
    favBtn.textContent = "Favourite";
    favBtn.style.padding = "6px 10px";
    favBtn.style.background = "#2196F3";
    favBtn.style.color = "white";
    favBtn.style.border = "none";
    favBtn.style.borderRadius = "5px";
    favBtn.style.cursor = "pointer";
    favBtn.addEventListener("click", () => {
      // Toggle favourited state
      if (favBtn.classList.contains("favourited")) {
        favBtn.classList.remove("favourited");
        favBtn.style.background = "#2196F3";
        newListing.style.background = "#2a2a40";
      } else {
        favBtn.classList.add("favourited");
        favBtn.style.background = "#FFC107"; // highlighted color
        newListing.style.background = "#2a2a40"// highlighted listing
      }
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.padding = "6px 10px";
    deleteBtn.style.background = "#f44336";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "5px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", () => newListing.remove());

    btnContainer.appendChild(favBtn);
    btnContainer.appendChild(deleteBtn);

    newListing.appendChild(btnContainer);

    listingsDiv.appendChild(newListing);

    formDiv.remove();
    searchInput.value = "";
    filterListings();
  });
});

  // Insert search bar, search button, and row buttons into listings section
  if (listingsSection) {
    listingsSection.insertBefore(searchInput, listingsDiv);
    listingsSection.insertBefore(searchButton, listingsDiv);
    listingsSection.insertBefore(buttonRow, listingsDiv);
  }

  const FIXED_EMAIL = "groupj@gmail.com";
  const FIXED_PASSWORD = "1234567890";

  // Filter function
  const filterListings = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const items = listingsDiv.querySelectorAll(".listing-item");
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(searchTerm) ? "" : "none";
    });
  };

  searchInput.addEventListener("input", filterListings);
  searchButton.addEventListener("click", filterListings);

  // Login form submit
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = (emailInput && emailInput.value || "").trim();
  const password = (passInput && passInput.value || "").trim();

  if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
    try { sessionStorage.setItem("user_email", FIXED_EMAIL); } catch(e){}
    if (listingsSection) listingsSection.classList.remove("hidden");
    if (loginContainer) loginContainer.style.display = "none";
    renderFakeListings();   // ✅ FIXED
  } else {
    if (errorP) errorP.textContent = "Invalid credentials. Use the group account.";
    else alert("Invalid credentials. Use the group account.");
  }
});

// Auto-show listings if already logged in
try {
  const u = sessionStorage.getItem("user_email");
  if (u === FIXED_EMAIL) {
    if (listingsSection) listingsSection.classList.remove("hidden");
    if (loginContainer) loginContainer.style.display = "none";
    renderFakeListings();   // ✅ FIXED
  }
} catch(e){}


  // Function to add a fake listing (goes inside fakeListsBox)
function addFakeListing(title, author, price, contact, imgUrl) {
  const newListing = document.createElement("div");
  newListing.className = "listing-item";
  newListing.style.border = "1px solid #000000ff";
  newListing.style.padding = "10px";
  newListing.style.margin = "10px 0";
  newListing.style.borderRadius = "8px";
  newListing.style.background ="#2a2a40";
  newListing.style.display = "flex";
  newListing.style.alignItems = "center";
  newListing.style.gap = "15px";

  // Text container
  const textDiv = document.createElement("div");
  textDiv.innerHTML = `
    <strong>Title:</strong> ${title}<br>
    <strong>Author:</strong> ${author}<br>
    <strong>Price:</strong> ${price}<br>
    <strong>Contact Number:</strong> ${contact}
  `;
  newListing.appendChild(textDiv);

  // Image
  const img = document.createElement("img");
  img.src = imgUrl;
  img.style.width = "100px";
  img.style.height = "100px";
  img.style.objectFit = "cover";
  img.style.borderRadius = "5px";
  newListing.appendChild(img);

  // Add fake listings only into fakeListsBox
  fakeListsBox.appendChild(newListing);
}


function renderFakeListings() {
  fakeListsBox.innerHTML = "";

  addFakeListing("MATHEMATICS", "AG MUGARI", "R150", "0601234567", "https://sdmntprwestus.oaiusercontent.com/files/00000000-2fc8-6230-9703-78705d4f89e1/raw?se=2025-09-12T21%3A49%3A49Z&sp=r&sv=2024-08-04&sr=b&scid=5394dbdb-98d5-5da3-bda5-179e72afa740&skoid=5c72dd08-68ae-4091-b4e1-40ccec0693ae&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-12T20%3A43%3A26Z&ske=2025-09-13T20%3A43%3A26Z&sks=b&skv=2024-08-04&sig=e/3ORltYSj2TFQU12k8F9g7%2BIsKibNVBxHQ8J8M0tTo%3D");
  addFakeListing("PHYSICS", "AG MUGARI", "R300", "0602345678", "https://sdmntprwestus.oaiusercontent.com/files/00000000-59d0-6230-b0fb-6900c8e9ef81/raw?se=2025-09-12T21%3A49%3A49Z&sp=r&sv=2024-08-04&sr=b&scid=489c25f0-b9d9-550d-8ea5-b3f27511ff7d&skoid=5c72dd08-68ae-4091-b4e1-40ccec0693ae&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-12T20%3A43%3A31Z&ske=2025-09-13T20%3A43%3A31Z&sks=b&skv=2024-08-04&sig=Z98m/huFEk3JbwCO4XeLHMV%2BchAWOHKzrpu52LpeUrA%3D");
  addFakeListing("CHEMISTRY", "AG MUGARI", "R200", "0603456789", "https://sdmntprwestus.oaiusercontent.com/files/00000000-633c-6230-ba53-4183d97dbc50/raw?se=2025-09-12T21%3A49%3A49Z&sp=r&sv=2024-08-04&sr=b&scid=b888ed03-f7be-5304-a3ed-a2b05ba8e7d5&skoid=5c72dd08-68ae-4091-b4e1-40ccec0693ae&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-12T20%3A45%3A04Z&ske=2025-09-13T20%3A45%3A04Z&sks=b&skv=2024-08-04&sig=1gqdKXM%2BWcCe3UD61rnIwlcNVN49pJJGQXz0ZjT5HKU%3D");
  addFakeListing("3in1 Java,Python&C++", "AG MUGARI", "R400", "0604567890", "https://sdmntprwestus.oaiusercontent.com/files/00000000-8cac-6230-be3a-fdf854e24357/raw?se=2025-09-12T21%3A49%3A49Z&sp=r&sv=2024-08-04&sr=b&scid=6edab281-2bc5-5d0c-a77d-4142f55f1db8&skoid=5c72dd08-68ae-4091-b4e1-40ccec0693ae&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-12T20%3A44%3A59Z&ske=2025-09-13T20%3A44%3A59Z&sks=b&skv=2024-08-04&sig=zXre9IJ5NEYT3DSMm4uzgUGucE4GRpMTZCurFhEPPtY%3D");
}
  

  // Log out button functionality
  logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("user_email");
    if (listingsSection) listingsSection.classList.add("hidden");
    if (loginContainer) loginContainer.style.display = "block";
  });

  // Auto-show listings if already logged in
  try {
    const u = sessionStorage.getItem("user_email");
    if (u === FIXED_EMAIL) {
      if (listingsSection) listingsSection.classList.remove("hidden");
      if (loginContainer) loginContainer.style.display = "none";
      renderListings();
    }
  } catch(e){}
});

