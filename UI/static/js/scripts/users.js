// function to get the input data fro,m the login form
function LoginCredentials() {
    email = document.getElementById('login_email').value;
    password = document.getElementById('login_password').value;

    return {email: email,password:password};
}

// Function to get all users
function allUsers() {
    fetch('http://127.0.0.1:5000/api/v2/users')
    .then((res)=>res.json())
    .then((data)=> {
        console.log(data);
    })
}

// Function to handle login
function Login() {
    document.getElementById('login').style.backgroundColor="#0aacad";
    
    // Define variables
    let url = 'http://127.0.0.1:5000/api/v2/login';

    let login_data = LoginCredentials();

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
}

