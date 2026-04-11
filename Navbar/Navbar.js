const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
let logout = document.getElementById("logoutb");
let login = document.getElementById("loginb");
let removeme = document.getElementById("notInLogout");
let isLogin = localStorage.getItem("login");


if (menuToggle) {
    menuToggle.onclick = function () {
        navLinks.classList.toggle("active");
    };
}


if (logout && login) {
    logout.addEventListener("click", function () {
        localStorage.setItem("login", "false");
        window.location.reload(); 
    });

    if (isLogin === "true") {
        login.style.display = "none";
        logout.style.display = "inline";
        if (removeme) removeme.style.display = "inline";
    } else {
        login.style.display = "inline";
        logout.style.display = "none";
        if (removeme) removeme.style.display = "none";
    }
}


function applyTheme() {
    const Themes = localStorage.getItem('theme');
    if (Themes === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}


applyTheme();

function toggleDarkMode() {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    
    applyTheme();
}