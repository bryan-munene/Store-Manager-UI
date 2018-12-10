const Users = {
    // function to get the input data from the login form
    loginCredentials: function () {
        email = document.getElementById('login_email').value;
        password = document.getElementById('login_password').value;

        return {email: email,password:password};
    },
    // function to det the input data from the registration form
    registrationDetails: function () {
        Name = document.getElementById('Name').value;
        username = document.getElementById('UserName').value;
        email = document.getElementById('Email').value;
        password = document.getElementById('password').value;
        password2 = document.getElementById('password2').value;

        return {name:Name,username:username,email: email,password:password,password2:password2};
    },
    

    // Function to handle user specifics such as token and username.
    userSpecifics: function () {
        let token = window.localStorage.getItem('token');        
        if (!token){
            window.location.href ='./../login.html'
            document.getElementById('response').style.color = 'red'
            document.getElementById('response').innerHTML = "You are not logged in yet"
        }
        
        document.getElementById('username').innerHTML = window.localStorage.getItem('username')                
        document.getElementById('Users');
    },
    // Function to dispaly dashboard
    dashboard: function () {
        let token = window.localStorage.getItem('token');        
        if (!token){
            window.location.href ='./../login.html'
            document.getElementById('response').style.color = 'red'
            document.getElementById('response').innerHTML = "You are not logged in yet"
        }

        document.getElementById('username').innerHTML = window.localStorage.getItem('username')                
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
           console.log(data);
           
            if (data.status === "Logged in admin"){
               
                // if user is admin
                data.count.forEach(function(count) {
                    document.getElementById('count').innerHTML = count.count;  
                });
                
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
               
                // if user is not admin
               
                data.count.forEach(function(count) {
                    document.getElementById('count').innerHTML = count.count;  
                });
                document.getElementById('username').innerHTML = window.localStorage.getItem('username')
                
                let output = '<h1>Your Last 5 Sales!!!</h1><br><br>';
                output += `
                    <tr>
                        <th>+</th>
                        <th>Sale ID</th>
                        <th>Payment mode</th>
                        <th>Number of Items</th>
                        <th>Total</th>
                        <th>Date</th>
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
                    </tr>`
                });
                document.getElementById('Sales').innerHTML = output
            }  
        })
        .catch((error) =>{
            console.log(error);
        });
    },

    // Function to handle login
    login: function () {
        document.getElementById('login').style.backgroundColor="#0aacad";
        
        // Define variables
        let url = 'http://127.0.0.1:5000/api/v2/login';

        let login_data = Users.loginCredentials();

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
                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('username', data.username.username);
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
    register: function () {
        let token = window.localStorage.getItem('token');
        if (!token){
            window.location.href ='./../login.html'
            document.getElementById('response').style.color = 'red'
            document.getElementById('response').innerHTML = "You are not logged in yet"
        }
        document.getElementById('username').innerHTML = window.localStorage.getItem('username')                
        document.getElementById('addUsers');
        
        // Define variables
        let url = 'http://127.0.0.1:5000/api/v2/register';

        let registration_data = Users.registrationDetails();

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
                window.location.href = './users.html';
                alert("we are here");
            }
            else if (data.status === "unauthorised"){
                // if request is unsuccessful
                window.location.href ='./../login.html'
                document.getElementById('response').style.color = 'red'
                document.getElementById('response').innerHTML = data.message
                Users.logout();
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
        let token = window.localStorage.getItem('token');
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
            "Authorization": 'Bearer ' + token
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
                window.localStorage.removeItem('token')
                window.localStorage.removeItem('username')
                window.location.href = './../login.html';
                document.getElementById('response').style.color = 'green'     
                document.getElementById('response').innerHTML = "GoodBye!"       
            }
            else {
                // if request is unsuccessful
                window.location.href = './../login.html';
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
        let token = window.localStorage.getItem('token');
        if (!token){
            window.location.href ='./../login.html'
            document.getElementById('response').style.color = 'red'
            document.getElementById('response').innerHTML = "You are not logged in yet"
        }
        document.getElementById('username').innerHTML = window.localStorage.getItem('username')                
        document.getElementById('Users');
        
        // Define variables
        let url = 'http://127.0.0.1:5000/api/v2/users';

        
        let header = new Headers({
            "content-type": "application/json",
            "Authorization": 'Bearer ' + token
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
                let output = `
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin Level</th>
                        <th>Action</th>
                    </tr> `;
                data.users.forEach(function(user) {
                   output += `
                    <tr onclick="Users.getSpecificUser(${user.user_id})">
                        <td>${user.user_id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.is_admin}</td> 
                        <td><form action="edit-user.html"><input type="submit" class="edit" value = "EDIT" ></form> <input type="button" class="delete" value = "DELETE" onclick="Users.getSpecificUser(${user.user_id})"></td>                       
                    </tr>`
                });
                document.getElementById('Users').innerHTML = output
                   
            }
            else {
                // if request is unsuccessful
                document.getElementById('response').style.color = 'red'
                document.getElementById('response').innerHTML = data.message
                Users.logout();
            }  
        })
        .catch((error) =>{
            console.log(error);
        });
    },

    //Retrieve a specific user
    getSpecificUser: function (id) {
        console.log('ID PASSED HERE IS '+id);
        let token = window.localStorage.getItem('token');
        if (!token){
            window.location.href ='./../login.html'
            document.getElementById('response').style.color = 'red'
            document.getElementById('response').innerHTML = "You are not logged in yet"
        }
        document.getElementById('username').innerHTML = window.localStorage.getItem('username')                
        document.getElementById('Users');
        
        // Define variables
        let url = 'http://127.0.0.1:5000/api/v2/users/'+id;

        
        let header = new Headers({
            "content-type": "application/json",
            "Authorization": 'Bearer ' + token
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
                let output = `
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Admin Level</th>
                        <th>Action</th>
                    </tr> `;
                data.users.forEach(function(user) {
                   output += `
                    <tr>
                        <td>${user.user_id}</td>
                        <td>${user.name}</td>
                        <td>${user.is_admin}</td> 
                        <td><input type="checkbox" name="chk"/></td>
                        <td><form action="edit-user.html"><input type="submit" class="edit" value = "EDIT" ></form> OR <input type="button" class="delete" value = "DELETE" onclick="Users.specificUserDelete()"></td>                       
                    </tr>`
                });
                document.getElementById('Users').innerHTML = output

                console.log("ok");
                   
            }
            else {
                // if request is unsuccessful
                document.getElementById('response').style.color = 'red'
                document.getElementById('response').innerHTML = data.message
                Users.logout();
            }  
        })
        .catch((error) =>{
            console.log(error);
        });
    },

    //Update a specific user 
    specificUserUpdate: function () {
        let token = window.localStorage.getItem('token');
        if (!token){
            window.location.href ='./../login.html'
            document.getElementById('response').style.color = 'red'
            document.getElementById('response').innerHTML = "You are not logged in yet"
        }
        document.getElementById('username').innerHTML = window.localStorage.getItem('username')

    },

    //Delete a specific user
    specificUserDelete: function () {

    },

    //Update a user's role
    userRole: function () {
        let token = window.localStorage.getItem('token');
        if (!token){
            window.location.href ='./../login.html'
            document.getElementById('response').style.color = 'red'
            document.getElementById('response').innerHTML = "You are not logged in yet"
        }
        document.getElementById('username').innerHTML = window.localStorage.getItem('username')

    }

}

