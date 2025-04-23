function loginUser() {
    const email = document.getElementById("email").value 
    const password = document.getElementById("password").value 

    let users = JSON.parse(localStorage.getItem("users")) || [] 

    const user = users.find(user => user.email === email && user.password === password) 

    if (user) {
        alert(`Welcome back, ${user.firstName}!`) 
        localStorage.setItem('isLoggedIn', 'true')  
        window.location.href = 'index.html' 
    } else {
        alert("Invalid email or password. Please try again.") 
    }

    return false  // Prevent form submit
}


