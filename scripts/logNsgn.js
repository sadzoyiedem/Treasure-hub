const loginInFrm = document.getElementById("hide");
const signUpFrm = document.getElementById("show");

const inputs = document.getElementsByTagName("input");

window.addEventListener("keydown", (e)=>{
    
    if (e.key === "l" || e.key === "L") {
        signUpFrm.id = "hide";
        loginInFrm.id = "show";
    }else if (e.key === "s" || e.key === "S") {
        signUpFrm.id = "show";
        loginInFrm.id = "hide";
    }
});