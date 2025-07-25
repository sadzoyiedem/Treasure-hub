const loader = document.querySelector(".loader-container");

window.addEventListener("load", ()=>{
    loader.style.display = "none";
});

function loadItems(){
    window.location.assign(`${window.location.href.slice(0, window.location.href.lastIndexOf("/"))}/pages/items.html`);
}

function logNsgn(){
    window.location.assign(`${window.location.href.slice(0, window.location.href.lastIndexOf("/"))}/logNsgn.html`);
}