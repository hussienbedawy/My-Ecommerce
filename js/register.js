// function validateForm() {
//     const firstName = document.getElementById("first-name").value;
//     const lastName = document.getElementById("last-name").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const repeatPassword = document.getElementById("repeat-password").value;
//     const country = document.getElementById("country").value;
//     const address = document.getElementById("address").value;

   
//     if (password !== repeatPassword) {
//         alert("Passwords do not match!");
//         return false;
//     }

    
//     if (!firstName || !lastName || !email || !password || !repeatPassword || !country) {
//         alert("Please fill in all fields except Address.");
//         return false;
//     }


//     let userData = {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         country: country,
//         address: address
//     };

//     let users = JSON.parse(sessionStorage.getItem("users")) || [];
//     users.push(userData);
//     sessionStorage.setItem("users", JSON.stringify(users));

//     // عرض البيانات المخزنة بعد التسجيل
//     displayUsers();

//     // فرغ الفورم بعد التسجيل
//     document.querySelector("form").reset();

//     // إعادة تعطيل الزر بعد التسجيل
//     document.getElementById("submit-button").disabled = true;

//     return false; // منع إعادة تحميل الصفحة
// }

// // التحقق من الحقول عند الكتابة في أي input
// function checkFormCompletion() {
//     const firstName = document.getElementById("first-name").value;
//     const lastName = document.getElementById("last-name").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const repeatPassword = document.getElementById("repeat-password").value;
//     const country = document.getElementById("country").value;

//     // التحقق من أن جميع الحقول تم تعبئتها ماعدا العنوان
//     if (firstName && lastName && email && password && repeatPassword && country) {
//         document.getElementById("submit-button").disabled = false;
//     } else {
//         document.getElementById("submit-button").disabled = true;
//     }
// }


// window.onload = function() {
//     window.scrollTo(0, 0);
//     const container = document.querySelector('.container');
//     if (container) {
//         container.scrollTop = 0;
//     }


//     // التحقق من الحقول عند الكتابة
//     document.querySelectorAll("input, select").forEach(input => {
//         input.addEventListener("input", checkFormCompletion);
//     });

//     // التحقق من الزر عند تحميل الصفحة
//     checkFormCompletion();
// }

// function displayUsers() {
//     const userList = document.getElementById("user-list");
//     userList.innerHTML = '';  // مسح البيانات السابقة

//     let users = JSON.parse(sessionStorage.getItem("users")) || [];

   
//     }

    // function validateForm() {
    //     const firstName = document.getElementById("first-name").value;
    //     const lastName = document.getElementById("last-name").value;
    //     const email = document.getElementById("email").value;
    //     const password = document.getElementById("password").value;
    //     const repeatPassword = document.getElementById("repeat-password").value;
    
    //     // Check if passwords match
    //     if (password !== repeatPassword) {
    //         alert("Passwords do not match!");
    //         return false;
    //     }
    
    //     // Check if all required fields are filled
    //     if (!firstName || !lastName || !email || !password || !repeatPassword) {
    //         alert("Please fill in all fields.");
    //         return false;
    //     }
    
    //     // Create user data object
    //     let userData = {
    //         firstName: firstName,
    //         lastName: lastName,
    //         email: email,
    //         password: password // Note: Passwords should be hashed in a real application
    //     };
    
    //     // Retrieve existing users from localStorage
    //     let users = JSON.parse(localStorage.getItem("users")) || [];
    
    //     // Check if the email is already registered
    //     const userExists = users.some(user => user.email === email);
    //     if (userExists) {
    //         alert("This email is already registered. Please use a different email.");
    //         return false;
    //     }
    
    //     // Add the new user to the users array
    //     users.push(userData);
    
    //     // Save the updated users array back to localStorage
    //     localStorage.setItem("users", JSON.stringify(users));
    
    //     alert("Registration successful!");
    //     document.querySelector("form").reset(); // Clear the form
    
    //     return false; // Prevent form submission
    // }
    function checkFormCompletion() {
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const repeatPassword = document.getElementById("repeat-password").value;
        const country = document.getElementById("country").value;
    
        if (firstName && lastName && email && password && repeatPassword && country) {
            document.getElementById("submit-button").disabled = false;
          
        } else {
            document.getElementById("submit-button").disabled = true;
        }
    }
    
    window.onload = function () {
        document.querySelectorAll("input, select").forEach(input => {
            input.addEventListener("input", checkFormCompletion);
        });
        checkFormCompletion();
    };
    
    function validateForm() {
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const repeatPassword = document.getElementById("repeat-password").value;
    
        if (password !== repeatPassword) {
            alert("Passwords do not match!");
            return false;
        }
    
        if (!firstName || !lastName || !email || !password || !repeatPassword) {
            alert("Please fill in all fields.");
            return false;
        }
    
        let userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };
    
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            alert("This email is already registered.");
            return false;
        }
    
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
    
        alert("Registration successful!");
        document.querySelector("form").reset();
        document.getElementById("submit-button").disabled = true;
        window.location.href = "main.html";
        return false;
    }