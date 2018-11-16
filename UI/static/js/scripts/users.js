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
    
    // Function to dispaly dashboard
    dashboard: function () {
        let token = sessionStorage.getItem('token');        
        if (!token){
            window.location.href ='./../login.html'
            document.getElementById('response').style.color = 'red'
            document.getElementById('response').innerHTML = "You are not logged in yet"
        }

        document.getElementById('Users');
        
        // Define variables
        let url = 'http://127.0.0.1:5000/api/v2/dashboard';

        
        let header = new Headers({
            "content-type": "application/json",
            "Authorization": "Bearer " + token
        });

        let payload = {
            method : 'GET',
            headers : header
        };

        UsersRequest = new Request(url, payload);

        fetch(UsersRequest)
        .then((res)=>res.json())
        .then((data)=> {
           // console.log(data);
            //alert(data);

            if (data.status === "Logged in admin"){
               
                // if request is successful
                data.count.forEach(function(count) {
                    document.getElementById('count').innerHTML = count.count;  
                });
                // document.getElementById('count').innerHTML = data.count.forEach(function(count) {
                document.getElementById('username').innerHTML = sessionStorage.getItem('username')
                
                let output = '<h1>Last 5 Sales!!!</h1><br><br>';
                output += `
                    <tr>
                        <th>+</th>
                        <th>Sale ID</th>
                        <th>Payment mode</th>
                        <th>Number of Items</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Created By</th>
                    </tr> `;
                data.sales.forEach(function(sale) {
                   output += `
                    <tr>
                        <td>+</td>
                        <td>${sale.sale_id}</td>
                        <td>${sale.payment_mode}</td>
                        <td>${sale.number_of_items}</td>
                        <td>${sale.grand_total}</td>
                        <td>${sale.date_created}</td>
                        <td>${sale.created_by}</td>
                    </tr>`
                });
                document.getElementById('Sales').innerHTML = output
            }
            else {
                // if request is unsuccessful

            
                let count = data.count;
                document.getElementById('count').innerHTML = count
                document.getElementById('username').innerHTML = sessionStorage.getItem('username')
                
                let sales = data.sales;
                sales.forEach(sale => {
                    document.getElementById('Sales').innerHTML += `<h1>"Last 5 Sales!"</h1><br><br>
                    <tr>
                        <td>${sale.sale_id}</td>
                        <td>${sale.payment_mode}</td>
                        <td>${sale.number_of_items}</td>
                        <td>${sale.grand_total}</td>
                        <td>${sale.date_created}</td>
                        <td>${sale.created_by}</td>
                    </tr>`
                });
                
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
            //alert(data);

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
        let token = sessionStorage.getItem('token');
        if (!token){
            window.location.href ='./../login.html'
            document.getElementById('response').style.color = 'red'
            document.getElementById('response').innerHTML = "You are not logged in yet"
        }

        document.getElementById('users');
        
        // Define variables
        let url = 'http://127.0.0.1:5000/api/v2/users';

        let registration_data = Users.RegistrationDetails();

        let header = new Headers({
            "content-type": "application/json",
            "Authorization": 'Bearer ' + token
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
            else if (data.status === "unauthorised"){
                // if request is unsuccessful
                window.location.href ='./../login.html'
                document.getElementById('response').style.color = 'red'
                document.getElementById('response').innerHTML = data.message
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
        let token = sessionStorage.getItem('token');
        if (!token){
            window.location.href ='./.././login.html'
            document.getElementById('response').style.color = 'red'
            document.getElementById('response').innerHTML = "You are not logged in yet"
        }

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
            console.log(data.status);

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
    },

    // Function to get all users
    allUsers: function () {
        let token = sessionStorage.getItem('token');
        if (!token){
            window.location.href ='./../login.html'
            document.getElementById('response').style.color = 'red'
            document.getElementById('response').innerHTML = "You are not logged in yet"
        }

        document.getElementById('Users');
        
        // Define variables
        let url = 'http://127.0.0.1:5000/api/v2/users';

        
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

            if (data.status === "ok"){
                // if request is successful
                        
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
    }

}

