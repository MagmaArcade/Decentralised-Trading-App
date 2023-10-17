import axios from 'axios'
const emails = [];

function Validation(values) {
    // error object stores errors
    let error = {}
    // ensuring a syntax valid email address and password is input into the login 
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    // checking if first name is empty
    if(values.fname === "") {
        error.fname = "Enter details"
    }else {
        error.fname = ""
    }

    // checking if last name is empty
    if(values.lname === "") {
        error.lname = "Enter details"
    }else {
        error.lname = ""
    }

    // checking if date of birth is empty
    if(values.dob === "") {
        error.dob = "Enter date of birth"
    }else {
        error.dob = ""
    }

    // Quick call to the database in order to update our list of emails (needs to be unique per user)
    axios.get('http://127.0.0.1:8000/getallusers')
    .then(response => {
        console.log(response)
        // Extract names from the response and add to the emails array
        Object.values(response.data).map(({ email }) => emails.push(email) );
    })


    // checking if email is empty
    if(emails.includes(values.email)) {
        error.email = "Email address is already taken"
    }
    else if(values.email === "") {
        error.email = "Email shouldn't be empty"
    }
    // checking if email matches
    else if(!email_pattern.test(values.email)) {
        error.email = "Please enter a valid email"
    }
    else {
        error.email = ""
    }

    // checking if password is empty
    if(values.password === "") {
        error.password = "Password should not be empty";
    } else if(!password_pattern.test(values.password)) {
        error.password = "Password should have at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long";
    } else {
        error.password = "";
    }

    return error;
}

export default Validation 