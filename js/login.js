// function loginUser() {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     // Retrieve users from localStorage
//     let users = JSON.parse(localStorage.getItem("users")) || [];

//     // Check if the user exists and the password matches
//     const user = users.find(user => user.email === email && user.password === password);

//     if (user) {
//         alert(`Welcome back, ${user.firstName}!`);
//         // Redirect to a dashboard or homepage
//         window.location.href = "main.html";
//     } else {
//         alert("Invalid email or password. Please try again.");
//     }

//     return false; // Prevent form submission
// }
// login.js

function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert(`Welcome back, ${user.firstName}!`);
        localStorage.setItem('isLoggedIn', 'true'); // Save login state
        showToast('Logged in successfully!');
        window.location.href = 'main.html';
    } else {
        alert("Invalid email or password. Please try again.");
    }

    return false; // Prevent form submit
}

// Toast (placeholder)
function showToast(message) {
    console.log("Toast:", message); // Replace with your UI toast
}
