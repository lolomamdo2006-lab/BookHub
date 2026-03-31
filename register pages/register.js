       localStorage.setItem("login","false");
const admins=[];
    admins[0] = {
      username: "admin",
      email: "admin@gmail.com",
      password: "123"
    };
const users=[];
    users[0] = {
      username: "user",
      email: "user@gmail.com",
      password: "123"
    };
const form = document.getElementById("login");
let heIsAdmin=false;
let heIsUser=false;

form.addEventListener("submit", function(e){
  e.preventDefault(); 

  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  for(i in admins){
    if( admins[i].username==username&&admins[i].password==password){
       heIsAdmin=true;
       localStorage.setItem("login","true");
         window.location.href = "../Book details/Admin Books list.html";
       break;
    }
  }
  for(i in users){
    if( users[i].username==username&&users[i].password==password){
       heIsUser=true;
       localStorage.setItem("login","true");
         window.location.href = "../Book details/User Books list.html";
       break;
    }
  }
    if (!heIsAdmin &&!heIsUser) {
    alert("Username or password is incorrect!");
  }


});



    function toggleDarkMode() {
        document.body.classList.toggle('dark');
    }


