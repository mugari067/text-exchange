document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.querySelector(".login-container");
  const form = loginContainer.querySelector("form");
  const emailInput = form.querySelector('input[type="text"], input[type="email"]');
  const passInput = form.querySelector('input[type="password"]');
  const errorP = loginContainer.querySelector("p");
  const listingsSection = document.getElementById("listings-section");
  const listingsDiv = document.getElementById("listings");
// Keep track of cart items
let cartItems = [];

// Create Cart button
  const favButton = document.createElement("button");
  favButton.textContent = "Cart";
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
  searchInput.style.padding = "10px";
  searchInput.style.width = "70%";
  searchInput.style.boxSizing = "border-box";
  searchInput.style.flexShrink = "0";
  searchInput.style.minWidth = "200px";
  searchInput.style.flex = "0 0 auto";

  searchInput.style.borderRadius = "8px";
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
  // Create a container for search input + button to keep layout stable
  const searchRow = document.createElement("div");
  searchRow.style.display = "flex";
  searchRow.style.alignItems = "center";
  searchRow.style.gap = "10px";
  searchRow.style.flexWrap = "nowrap";

  // Ensure input sizing doesn't cause shrinking inside the row
  searchInput.style.boxSizing = "border-box";
  searchInput.style.minWidth = "200px";
  searchInput.style.flex = "1 1 auto";
  searchInput.style.display = "inline-block";

  // Append input and button into the row container
  searchRow.appendChild(searchInput);
  searchRow.appendChild(searchButton);


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
    listingsSection.insertBefore(searchRow, listingsDiv);
    listingsSection.insertBefore(buttonRow, listingsDiv);
  }

  const FIXED_EMAIL = "groupj@gmail.com";
  const FIXED_PASSWORD = "1234567890";

  // Filter function (by Title or Author)
const filterListings = () => {
  const searchTerm = searchInput.value.toLowerCase();

  // Check fake listings
  const fakeItems = fakeListsBox.querySelectorAll(".listing-item");
  fakeItems.forEach(item => {
    const title = item.querySelector("strong:nth-child(1)")?.parentNode.innerText.toLowerCase();
    item.style.display = title.includes(searchTerm) ? "" : "none";
  });

  // Check user-added listings
  const userItems = listingsDiv.querySelectorAll(".listing-item");
  userItems.forEach(item => {
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

  // Image
  const img = document.createElement("img");
  img.src = imgUrl;
  img.style.width = "100px";
  img.style.height = "100px";
  img.style.objectFit = "cover";
  img.style.borderRadius = "5px";
  newListing.appendChild(img);

  // (+) Add to cart button
  const addBtn = document.createElement("button");
  addBtn.textContent = "+";
  addBtn.style.padding = "6px 12px";
  addBtn.style.background = "#4CAF50";
  addBtn.style.color = "white";
  addBtn.style.border = "none";
  addBtn.style.borderRadius = "5px";
  addBtn.style.cursor = "pointer";

  addBtn.addEventListener("click", () => {
    // Store item data in cartItems
    cartItems.push({ title, author, price, contact, imgUrl });
    alert(`${title} added to cart!`);
  });

  newListing.appendChild(addBtn);

  // Add fake listings only into fakeListsBox
  fakeListsBox.appendChild(newListing);
}


// Show ONLY cart items and update UI
favButton.addEventListener("click", () => {
  // Change headings
  document.getElementById("mainHeading").textContent = "CART";
  document.getElementById("subHeading").textContent = "";

  // Hide search bar, search button, and row buttons
  searchInput.style.display = "none";
  searchButton.style.display = "none";
  buttonRow.style.display = "none";

  // Clear listing box
  fakeListsBox.innerHTML = "";

  if (cartItems.length === 0) {
    fakeListsBox.innerHTML = "<p>No items in cart.</p>";
  } else {
    cartItems.forEach((item, index) => {
      const newListing = document.createElement("div");
      newListing.className = "listing-item";
      newListing.style.border = "1px solid #000000ff";
      newListing.style.padding = "10px";
      newListing.style.margin = "10px 0";
      newListing.style.borderRadius = "8px";
      newListing.style.background = "#2a2a40";
      newListing.style.display = "flex";
      newListing.style.alignItems = "center";
      newListing.style.gap = "15px";
      newListing.style.justifyContent = "space-between";

      // Text info
      const textDiv = document.createElement("div");
      textDiv.innerHTML = `
        <strong>Title:</strong> ${item.title}<br>
        <strong>Author:</strong> ${item.author}<br>
        <strong>Price:</strong> ${item.price}<br>
        <strong>Contact Number:</strong> ${item.contact}
      `;
      newListing.appendChild(textDiv);

      // Image
      const img = document.createElement("img");
      img.src = item.imgUrl;
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "5px";
      newListing.appendChild(img);

      // ❌ Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "x";
      delBtn.style.padding = "6px 12px";
      delBtn.style.background = "#f44336";
      delBtn.style.color = "white";
      delBtn.style.border = "none";
      delBtn.style.borderRadius = "5px";
      delBtn.style.cursor = "pointer";

      delBtn.addEventListener("click", () => {
        cartItems.splice(index, 1);
        favButton.click();
      });

      newListing.appendChild(delBtn);

      fakeListsBox.appendChild(newListing);
    });
  }

  // 🔙 Show All Listings button
  const showAllBtn = document.createElement("button");
  showAllBtn.textContent = "Show All Listings";
  showAllBtn.style.padding = "8px 12px";
  showAllBtn.style.marginTop = "10px";
  showAllBtn.style.background = "#2196F3";
  showAllBtn.style.color = "white";
  showAllBtn.style.border = "none";
  showAllBtn.style.borderRadius = "5px";
  showAllBtn.style.cursor = "pointer";

  showAllBtn.addEventListener("click", () => {
    // Restore headings
    document.getElementById("mainHeading").textContent = "BOOKS EXCHANGE";
    document.getElementById("subHeading").textContent = "MARKET PLACE:";

    // Show hidden UI back
    searchInput.style.display = "inline-block";
    searchButton.style.display = "inline-block";
    buttonRow.style.display = "flex";

    renderFakeListings();
  });

  fakeListsBox.appendChild(showAllBtn);
});






function renderFakeListings() {
  fakeListsBox.innerHTML = "";


  addFakeListing("MAMBA", "PIETER HENNINGS", "R249.99", "0846074567", "https://www.mzansibooks.co.za/cdn/shop/files/FrontCoverMamba.jpg?v=1738934359"); 
addFakeListing("LION KING", "AMANDA JEFF", "R299.99", "0601234567", "https://www.picclickimg.com/aJwAAOSwASljfxrf/The-Lion-King-2-NM-Marvel-Comic.webp"); 
  addFakeListing("MATHEMATICS", "JACKOB JAMES", "R749.99", "0601234567", "https://images.rawpixel.com/image_800/cHJpdmF0ZS90ZW1wbGF0ZXMvZmlsZXMvY3JlYXRlX3Rvb2wvMjAyNC0wMi8wMWhxN2RtMmFiNGV3YTFkYzE2YThiNmdzOS5qcGc.jpg");
  addFakeListing("PHYSICS", "CINDY SMITH", "R699.99", "0602345678", "https://www.mswordcoverpages.com/wp-content/uploads/2023/05/Physics-book-cover-page-1-CRC.png");
  addFakeListing("CHEMISTRY", "DANIEL ARK", "R699.99", "0603456789", "https://www.mswordcoverpages.com/wp-content/uploads/2023/04/Chemistry-book-cover-page-1-CRC.png");
  addFakeListing("3in1 Java,Python&C++", "HATEL BROWN", "R400", "0604567890", "https://m.media-amazon.com/images/I/81fROgyLB+L._SL1500_.jpg");
  addFakeListing("THE SKITTERING AND OTHER TALES", "TONY R TUCKER", "R399.99", "0601234567", "https://miblart.com/wp-content/uploads/2020/10/2LTd4fOY.jpeg"); 
  addFakeListing("THE SPLENDOR OF FEAR", "AMBROSE IBSEN", "R249.99", "0601234567", "https://tse2.mm.bing.net/th/id/OIP.gxmYqehJVo_0CBpxpzhfqgHaL2?rs=1&pid=ImgDetMain&o=7&rm=3"); 
  addFakeListing("THE DEVIL'S CAT", "WILLIAM W. JOHNSTONE", "R349.99", "0601234567", "https://fionajaydemedia.com/wp-content/uploads/2015/07/TheDevilsCat1.jpg"); 
  addFakeListing("STAIRWAY TO HELL", "RICHARD HUGHES", "R400.00", "0601234567", "https://i.pinimg.com/736x/fe/fc/16/fefc1672592a034be600e3f75810ab66.jpg"); 
  addFakeListing("ME BEFORE YOU", "JOJO MOYES", "R279.99", "0748439674", "https://image-prod.iol.co.za/resize/610x61000/?source=https://xlibris.public.prod.oc.inl.infomaker.io:8443/opencontent/objects/c15daf2f-dc9a-5601-bb45-38d1788fca75&operation=CROP&offset=0x0&resize=600x900"); 
  addFakeListing("SUDDENLY SERIOUS", "SARAH JACKSON", "R499.99", "0831234567", "https://marketplace.canva.com/EADaovMnGQ4/1/0/1003w/canva-romance-love-couples-grayscale-kindle-book-cover-3Jyzky61_vo.jpg"); 
  addFakeListing("WALK INTO THE SHADOW", "ESTELLE DARCY", "R399.99", "0601234567", "https://marketplace.canva.com/EAFfSnGl7II/2/0/1003w/canva-elegant-dark-woods-fantasy-photo-book-cover-vAt8PH1CmqQ.jpg"); 
  
  
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

