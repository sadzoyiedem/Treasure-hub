// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
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


const itmName = document.getElementById("itmName");
const itmImg = document.getElementById("itmImg");
const itmDesc = document.getElementById("itmDesc");
const itmLoc = document.getElementById("itmLoc");
const itmDt = document.getElementById("itmDt");
const itmSensInfo = document.getElementById("itmSInfo");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", ()=>{
    const condition = itmName.value !== "" && itmImg.value !== "" && itmDesc.value !== "" && itmLoc.value !== "" && itmDt.value !== "";

    if (condition) {
        addItem(itmName.value, itmImg.value, itmDesc.value, itmLoc.value, itmDt.value, itmSensInfo.value)
        itmName.value = "";
        itmImg.value = "";
        itmDesc.value = "";
        itmLoc.value = "";
        itmDt.value = "";
        itmSensInfo.value = "";
    } else {
        alert("Please fill all fields appropriately!");
    }
})


function addItem(title, img, desc, loc, dt, sinfo) {

    const newItem = {
        title: title,
        info: {
            image: img,
            description: desc,
            location: loc,
            date: dt,
            sensitiveInfo: sinfo
        }
    }
    push(ItemsInStock, newItem);
    alert(`${title} added successfully`);
}