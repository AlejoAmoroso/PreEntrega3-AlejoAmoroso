let loginForm = document.querySelector("#login");

loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let Users = JSON.parse(localStorage.getItem("users")) || [];

        let validUser = Users.find(user => user.email === email && user.password === password) ;

        if(!validUser) {
                let errorSpan = document.getElementById("errorSpan");
                let passwordInput = document.querySelector("#password");
                passwordInput.classList.add("outline-red");
                errorSpan.classList.add("error-span");
                errorSpan.innerHTML = "";
                const errorText = document.createTextNode("Usuario y/o contraseña incorrecta");
                errorSpan.append(errorText);
                return;
        } else {
                localStorage.setItem("login_successful", JSON.stringify(validUser));
                window.location.href = "../index.html"
        }
})