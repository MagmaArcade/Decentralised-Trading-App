function Validation(values) {
    // error object stores errors
    let error = {}
    // ensuring a syntax valid email address is input into the login
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // checking if email is empty
    if(values.email === "") {
        error.email = "Email shouldn't be empty"
    }
    // checking if email matches the regex
    else if(!email_pattern.test(values.email)) {
        error.email = "Please enter a valid email"
    }else {
        error.email = ""
    }
    // checking if password is empty
    if (values.password === "") {
        error.password = "Password should not be empty"
    }
    else {
        error.password = ""
    }

    return error;
}

export default Validation 