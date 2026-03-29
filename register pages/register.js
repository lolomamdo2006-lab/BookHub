
const admins=[];
    admins[0] = {
      username: "alaa",
      email: "alaa@gmail.com",
      password: "123"
    };
const form = document.getElementById("login");
let heIsAdmin=false;

form.addEventListener("submit", function(e){
  e.preventDefault(); 

  
  const username = document.getElementById("username").value;
//   const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  for(i in admins){
    if( admins[i].username==username&&admins[i].password==password){
       heIsAdmin=true;
       localStorage.setItem("loggedIn", "true");   
        localStorage.setItem("username", username);
         window.location.href = "../welcome page/welcome.html";
       break;
    }
  }
    if (!heIsAdmin) {
    
    alert("Username or password is incorrect!");
  }


});



    function toggleDarkMode() {
        document.body.classList.toggle('dark');
    }