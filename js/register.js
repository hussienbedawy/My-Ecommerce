
    function checkFormCompletion() {
        const firstName = document.getElementById("first-name").value 
        const lastName = document.getElementById("last-name").value 
        const email = document.getElementById("email").value 
        const password = document.getElementById("password").value 
        const repeatPassword = document.getElementById("repeat-password").value 
        const country = document.getElementById("country").value 
    
        if (firstName && lastName && email && password && repeatPassword && country) {
            document.getElementById("submit-button").disabled = false 
          
        } else {
            document.getElementById("submit-button").disabled = true 
        }
    }
    
    window.onload = function () {
        document.querySelectorAll("input, select").forEach(input => {
            input.addEventListener("input", checkFormCompletion) 
        }) 
        checkFormCompletion() 
    } 
    
    function validateForm() {
        const firstName = document.getElementById("first-name").value 
        const lastName = document.getElementById("last-name").value 
        const email = document.getElementById("email").value 
        const password = document.getElementById("password").value 
        const repeatPassword = document.getElementById("repeat-password").value 
        const adderss = document.getElementById("address").value 
        const country = document.getElementById("country").value 
    
        if (password !== repeatPassword) {
            alert("Passwords do not match!") 
            return false 
        }
    
        if (!firstName || !lastName || !email || !password || !repeatPassword) {
            alert("Please fill in all fields.") 
            return false 
        }
    
        let userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            address: adderss,
            country:country
        } 
    
        let users = JSON.parse(localStorage.getItem("users")) || [] 
        const userExists = users.some(user => user.email === email) 
        if (userExists) {
            alert("This email is already registered.") 
            return false 
        }
    
        users.push(userData) 
        localStorage.setItem("users", JSON.stringify(users)) 
    
        alert("Registration successful!") 
        document.querySelector("form").reset() 
        document.getElementById("submit-button").disabled = true 
        window.location.href = "index.html" 
        return false 
    }