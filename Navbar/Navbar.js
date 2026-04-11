const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
let logout=document.getElementById("logoutb");
let login=document.getElementById("loginb");
let removeme=document.getElementById("notInLogout");
let isLogin=localStorage.getItem("login");
menuToggle.onclick = function () {
    navLinks.classList.toggle("active");
};

logout.addEventListener("click", function() {
localStorage.setItem("login","false");
 login.style.display="none";
});

if(isLogin === "true"){
    login.style.display = "none";  
    logout.style.display = "inline"; 
    removeme.style.display="inline"

} else {
    login.style.display = "inline";  
    logout.style.display = "none"; 
    logout.parentNode.style.display = "none"; 
    
    removeme.style.display="none" 
        removeme.parentNode.style.display="none" 
}
