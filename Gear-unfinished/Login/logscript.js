document.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function (e){
        e.preventDefault();

        const usernameInput = document.getElementById('username').value.trim();
        const passwordInput = document.getElementById('password').value.trim();

        if (!usernameInput || !passwordInput) {
            alert("Please enter both username and password.");
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const exist = users.find(user => user.username === usernameInput);

        if(exist){
            if(exist.password === passwordInput){
                localStorage.setItem("currentUser", JSON.stringify(exist));
                alert("Login success");
                window.location.href = "../Main/main.html";
            }
            else{
                alert("Wrong Password");
            }

        }
        else{
            let randno = Math.ceil(Math.random() * 97) % 5;
            console.log(randno);
            const newUser = {
                username: usernameInput,
                password: passwordInput,
                profilePic: `../Assets/pfp${randno}.jpg`,
                balance: "$0.00"
            };

            let n = users.length;

            if(passwordInput != null && usernameInput!= null){
                const confirmcreate = confirm(`Username "${usernameInput}" not found. Do you want to create a new account?`);

                if(confirmcreate){
                    users.push(newUser);
                    users[n] = newUser;
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem("currentUser", JSON.stringify(newUser));
                    console.log("Created");
                    window.location.href = "../Main/main.html";
                }
                else{
                    alert("Account creation cancelled.");
                }
            }
            else{
                console.log("Gak bole kosong")
                alert("Username and password cannot be empty.");
            }
        }
    })
})