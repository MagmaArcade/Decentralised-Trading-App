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

    // checking if email is empty
    if(values.email === "") {
        error.email = "Email shouldn't be empty"
    }
    // checking if email matches
    else if(!email_pattern.test(values.email)) {
        error.email = "Please enter a valid email"
    }else {
        error.email = ""
    }
    // checking if password is empty
    if (values.password === "") {
        error.password = "Password should not be empty"
    }
    // checking if password matches
    else if(!password_pattern.test(values.password)) {
        error.password = "Password didn't match with the associated email"
    } else {
        error.password = ""
    }
    return error;
}

export default Validation 