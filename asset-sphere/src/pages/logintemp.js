    /*
        if (response.data.status === "success") {
            navigate('/Wallet');
        } else {
            setErrors(prev => ({ ...prev, password: "Invalid email or password" }));
        }
      } catch (error) {
          if(error.response && error.response.data.detail) {
              setErrors(prev => ({ ...prev, password: error.response.data.detail }));
          } else {
              console.error("Error during login validation", error);
          }
        }
        */
  
  /*
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
  } */
