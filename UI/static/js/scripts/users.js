const Users = {
    // function to get the input data from the login form
    LoginCredentials: function () {
        email = document.getElementById('login_email').value;
        password = document.getElementById('login_password').value;

        return {email: email,password:password};
    },
    // function to det the input data from the registration form
    RegistrationDetails: function () {
        name = document.getElementById('Name').value;
        username = document.getElementById('UserName').value;
        email = document.getElementById('Email').value;
        password = document.getElementById('password').value;
        password2 = document.getElementById('password2').value;

        return {name: name,username:username,email: email,password:password,password2:password2};
    },
    
    // Function to get all users
    dashboard: function () {
        document.getElementById('Users');
        
        // Define variables
        let url = 'http://127.0.0.1:5000/api/v2/dashboard';

        
        let header = new Headers({
            "content-type": "application/json",
            "Authorization": 'Bearer ' + sessionStorage.getItem('token')
        });

        let payload = {
            method : 'GET',
            headers : header
        };

        UsersRequest = new Request(url, payload);

        fetch(UsersRequest)
        .then((res)=>res.json())
        .then((data)=> {
            console.log(data);

            if (data.status === "Logged in admin"){
                // if request is successful
                count = data.count;
                document.getElementById('count').innerHTML = count
                document.getElementById('username').innerHTML = sessionStorage.getItem('username')
                
                sales = data.sales;
                sales.forEach(sale => {
                    sale
                });
            }
            else {
                // if request is unsuccessful
                let count = data.count;
                let sales = data.sales;
            }  
        })
        .catch((error) =>{
            console.log(error);
        });
    },

    // Function to handle login
    Login: function () {
        document.getElementById('login').style.backgroundColor="#0aacad";
        
        // Define variables
        let url = 'http://127.0.0.1:5000/api/v2/login';

        let login_data = Users.LoginCredentials();

        let header = new Headers({
            "content-type": "application/json"
        });

        let payload = {
            method : 'POST',
            body : JSON.stringify(login_data),
            headers : header

        };

        loginRequest = new Request(url, payload);

        // fetch the details required
        fetch(loginRequest)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);

            if (data.status === "user logged in"){
                // if request is successful
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('username', data.username.username);
                document.getElementById('response').style.color = 'green'
                document.getElementById('response').innerHTML = data.status
                if (data.role.is_admin === "True"){
                    window.location.href = './Admin/dashboard.html';    
                } 
                else {
                    window.location.href = './Regular/dashboard.html';
                }           
            }
            else {
                // if request is unsuccessful
                document.getElementById('response').style.color = 'red'
                document.getElementById('response').innerHTML = data.message
            }    
        })
        .catch((error) =>{
            console.log(error);
        });
    },

    // Function to add a new user
    Register: function () {
        document.getElementById('users');
        
        // Define variables
        let url = 'http://127.0.0.1:5000/api/v2/users';

        let registration_data = Users.RegistrationDetails();

        let header = new Headers({
            "content-type": "application/json",
            "Authorization": 'Bearer ' + sessionStorage.getItem('token')
        });

        let payload = {
            method : 'POST',
            body : JSON.stringify(registration_data),
            headers : header
        };

        UsersRequest = new Request(url, payload);

        fetch(UsersRequest)
        .then((res)=>res.json())
        .then((data)=> {
            console.log(data);

            if (data.status === "created"){
                // if request is successful
                window.location.href = './Admin/users.html';
            }
            else {
                // if request is unsuccessful
                document.getElementById('response').style.color = 'red'
                document.getElementById('response').innerHTML = data.message
            }  
        })
        .catch((error) =>{
            console.log(error);
        });
    },

    // Function to logout
    logout: function () {
        document.getElementById('users');
        
        // Define variables
        let url = 'http://127.0.0.1:5000/api/v2/logout';

        let header = new Headers({
            "content-type": "application/json",
            "Authorization": 'Bearer ' + sessionStorage.getItem('token')
        });

        let payload = {
            method : 'DELETE',
            headers : header
        };

        UsersRequest = new Request(url, payload);

        fetch(UsersRequest)
        .then((res)=>res.json())
        .then((data)=> {
            console.log(data);

            if (data.status === "logged out"){
                // if request is successful
                sessionStorage.removeItem('token')
                window.location.href = './../login.html';
                document.getElementById('response').style.color = 'green'     
                document.getElementById('response').innerHTML = "GoodBye!"       
            }
            else {
                // if request is unsuccessful
                document.getElementById('response').style.color = 'red'
                document.getElementById('response').innerHTML = "You are not logged in yet"
            }  
        })
        .catch((error) =>{
            console.log(error);
        });
    }
}

module.exports = Users;