function Validation(values) {
    // error object stores errors
    let error = {}
    // ensuring a syntax valid email address and password is input into the login 
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

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
    // checking if password matches the regex
    else if(!password_pattern.test(values.password)) {
        error.password = "Passwords must be at least eight digits long, contain one number, and be mixed cases"
    } else {
        error.password = ""
    }

    return error;
}

export default Validation 