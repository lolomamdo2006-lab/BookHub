// دالة مساعدة للحصول على نوع المستخدم المختار من الـ Radio Buttons
function getUserType() {
    const selectedType = document.querySelector('input[name="type"]:checked');
    return selectedType ? selectedType.value : 'user';
}


const signupForm = document.getElementById("signform");

if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.querySelector(".email").value;
        const confirm_password = document.querySelector(".confirm_password").value;
        const userType = getUserType();
        const signupData = {
            username: username,
            password: password,
            confirm_password: confirm_password,
            email: email,
            user_type: userType
        };

        console.log("Sending Signup Data:", signupData);

        fetch('http://127.0.0.1:8000/api/users/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData)
        })
        .then(response => {
            if (!response.ok) throw new Error("Invalid Data");
            return response.json();
        })
        .then(data => {
            window.location.href = "login.html";
        })
        .catch(error => {
            console.error('Signup Error:', error);
            alert(error.message);
        });
    });
}

const loginForm = document.getElementById("login");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const usernameInput = document.getElementById("username").value;
        const passwordInput = document.getElementById("password").value;

        const loginData = {
            username: usernameInput,
            password: passwordInput
        };

        console.log("Sending Login Data:", loginData);

        fetch('http://127.0.0.1:8000/api/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) throw new Error("Username or Password is invalid");
            return response.json();
        })
        .then(data => {
            console.log("Login Success:", data);

            // التعديل هنا: وحدنا المسميات عشان صفحة الـ Borrow تفهمها
            localStorage.setItem("login", "true");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("userRole", data.user.user_type);

            if (data.user.user_type === 'admin') {
                window.location.href = "../register pages/welcomeAdmin.html";
            } else {
                window.location.href = "../register pages/welcome.html";
            }
        })
        .catch(error => {
            console.error('Login Error:', error);
            alert(error.message);
        });
    });
}
function toggleDarkMode() {
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

