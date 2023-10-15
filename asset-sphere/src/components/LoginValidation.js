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

async function handleLogin(email, password) {
    try {
        const response = await fetch("http://127.0.0.1:8000/validate_login", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Invalid credentials"); // This can be customized based on API error messages
        }

        const data = await response.json();
        // Use the user ID as per your app logic. For instance, storing it in localStorage/sessionStorage.
        localStorage.setItem('userID', data.userID);
    } catch (error) {
        // Triggering LoginValidation.js error handling. 
        // Assuming `showLoginError` is a function in LoginValidation.js that shows error to user.
        throw new Error("Error"); // This can be customized based on API error messages
    }
}

export default Validation 