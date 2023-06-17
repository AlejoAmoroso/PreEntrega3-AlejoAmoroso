let signupForm = document.querySelector("#signup");

signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let email = document.querySelector("#email").value;
        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;

        // Busco el item users en el localstorage
        const Users = JSON.parse(localStorage.getItem("users")) || [];
        // Busco con un find si existe el email en user
        const isUserRegistered = Users.find(user => user.email === email);
        // Valido si existe el usuario
        if(isUserRegistered){
                // Si el mail del usuario ya existe, los dos inputs se cambian de color agregandole una clase llamada outline-red y se triggerea la alerta del sweetAlert para despues
                // devolver la funcion antes de tiempo
                let formControlInputs = document.getElementsByClassName("signup-form-input");
                for(let i = 0; i < formControlInputs.length; i++){
                        let formControlInput = formControlInputs[i];
                        formControlInput.classList.add("outline-red");
                }

                Swal.fire({
                        icon: 'error',
                        title: 'El usuario ya existe'
                      })
                
                return;
                // Sino, primero se elimina la clase outline-red de los inputs para que si en un momento se ingreso un mail de un usuario ya registrado y la clase outline-red se agrego,
                // Se quite y los inputs queden normales y luego se pushea el usuario entero al array Users
        } else {
                
                let formControlInputs = document.getElementsByClassName("signup-form-input");
                Array.from(formControlInputs).forEach((input) => {
                        input.classList.remove("outline-red")
                })
                Users.push({email: email, username: username, password: password, transactionNumber: 0});
                localStorage.setItem("users", JSON.stringify(Users));

                window.location.href = "../pages/login.html"
        }
})