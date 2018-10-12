/* these validators check for:
    1. email format
    2. form completion
    3. input types
    4. 

*/

function validateLoginForm() {
    var email = document.forms["login"]["Email"].value;
    if (email == "") {
        alert("Email must be filled out");
        return false;
    }


    var password = document.forms["login"]["Password"].value;
    if (password == "") {
        alert("Password must be filled out");
        return false;
    }


    var email = document.forms["login"]["Email"].value;
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
        alert('Please provide a valid email address');
        return false;
    }    
}

function validateAddUserForm() {
    var email = document.forms["login"]["Email"].value;
    if (email == "") {
        alert("Email must be filled out");
        return false;
    }


    var password = document.forms["login"]["Password"].value;
    if (password == "") {
        alert("Password must be filled out");
        return false;
    }


    var email = document.forms["login"]["Email"].value;
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
        alert('Please provide a valid email address');
        return false;
    }    
}


function validateAddItemForm() {
    var Name = document.forms["items"]["Name"].value;
    if (Name == "") {
        alert("Name must be filled out");
        return false;
    }


    var Image = document.forms["items"]["Image"].value;
    if (Image == "") {
        alert("Image must uploaded");
        return false;
    }


    var Price = document.forms["items"]["Price"].value;
    if (Price == "") {
        alert("Price must be filled out");
        return false;
    }


    var Quantity = document.forms["items"]["Quantity"].value;
    if (Quantity == "") {
        alert("Quantity must be filled out");
        return false;
    }

    var Categories = document.forms["items"]["Categories"].value;
    if (Categories == "none") {
        alert("Categories must be selected");
        return false;
    }

}
