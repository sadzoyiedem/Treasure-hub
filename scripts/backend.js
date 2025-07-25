// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSXvwlY7VtNB52XzozHDE0gU65gYpsmUo",
  authDomain: "treasurehub-c93ba.firebaseapp.com",
  databaseURL: "https://treasurehub-c93ba-default-rtdb.firebaseio.com/",
  projectId: "treasurehub-c93ba",
  storageBucket: "treasurehub-c93ba.firebasestorage.app",
  messagingSenderId: "1031068271092",
  appId: "1:1031068271092:web:8967723ea129266db779a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app)
const ItemsInStock = ref(database, "items");

const searchInput = document.getElementById("searchInput");

// function addItem() {

//     const newItem = {
//         title: "Wrist Watch",
//         info: {
//             image: "https://cdn.shopify.com/s/files/1/0411/2465/9349/products/11-1.jpg?v=1599794538",
//             location: "Kumapley",
//             date: "23rd February",
//             sensitiveInfo: "Rust at the back"
//         }
//     }
//     push(ItemsInStock, newItem);    
// }


async function getItems(keyword = null) {
  if (keyword === null) {
      try {
          const snapshot = await get(ItemsInStock);
          if (snapshot.exists()) {
              return snapshot.val()
              ; // Return all items
          } else {
              console.log("No data available");
              return null;
          }
      } catch (error) {
          console.error("Error getting data:", error);
          return null;
      }
  } else {
      try {
          const snapshot = await get(ItemsInStock);
          if (snapshot.exists()) {
              const items = snapshot.val();
              const filteredItems = Object.values(items).filter(item => 
                  item.title.toLowerCase().includes(keyword.toLowerCase())
              );
              return filteredItems.length > 0 ? filteredItems : null;
          } else {
              return null;
          }
      } catch (error) {
          console.error("Error getting data:", error);
          return null;
      }
  }
}

window.addEventListener("load", async ()=>{
    renderItems();
})


async function renderItems(keyword = null) {
  const itemsObj = await getItems(keyword);
  const itemsContainer = document.getElementById("itemsContainer");

  if (itemsObj) {
      // Clear any existing items
      itemsContainer.innerHTML = "";
      const items = Object.values(itemsObj);
      
      // Loop through each item and create the HTML structure
      items.forEach(item => {
          const itmCard = document.createElement("div");
          itmCard.classList.add("itm-card");

          const imgDiv = document.createElement("div");
          imgDiv.classList.add("img");

          imgDiv.innerHTML = `<img src=${item.info.image} alt="itemImage" />`

          const descDiv = document.createElement("div");
          descDiv.classList.add("desc");

          descDiv.innerHTML = `
              <div class="itm-desc">
                  <h4>${item.title}</h4>
                  <span>${item.info.description}</span>
                  <div class="loc_dt"><i class="fa-solid fa-location-dot"></i><span>${item.info.location}</span></div>
                  <div class="loc_dt"><i class="fa-solid fa-calendar"></i><span>${item.info.date}</span></div>
              </div>
              <div class="clmDiv">
                  <button id="claimBtn" ><i class="fa-solid fa-check-double"></i> Claim</button>
              </div>
          `;

          // Append image if available
          // if (item.info.image) {
          //     const itemImage = document.createElement("img");
          //     itemImage.src = item.info.image;
          //     itemDiv.appendChild(itemImage);
          // }

          // // Append the title and info to the itemDiv
          // itemDiv.appendChild(itemTitle);
          // itemDiv.appendChild(itemInfo);

          // Append the itemDiv to the container
        
          itmCard.appendChild(imgDiv);
          itmCard.appendChild(descDiv);
          

          itemsContainer.appendChild(itmCard);

      });
  } else {
      itemsContainer.innerHTML = "<p>No items found</p>";
  }
}


searchInput.addEventListener("input", async () =>{
  renderItems(searchInput.value);
})


// External functions !Backend
const moreInfo = document.getElementById("openPopup");
const clsPopup = document.getElementById("clsPop");
const popup = document.querySelector(".popup");

moreInfo.addEventListener("click", ()=>{
    popup.style.display = "flex";
});

clsPopup.addEventListener("click", ()=>{
    popup.style.display = "none";
});

window.addEventListener("keydown", (e)=>{
    
    if ((e.key === "d" || e.key === "D") && !(searchInput === document.activeElement)) {
        if (prompt("Type your membership ID to confirm") === "devMode") {
            window.location.assign(`${window.location.href.slice(0, window.location.href.lastIndexOf("/"))}/itmDashboard.html`);            
        } else {
            alert("No such member found \n Please try again!")
        }
    }

})