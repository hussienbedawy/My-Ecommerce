// auth.js
function checkLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' 
    const loginBtn = document.getElementById('loginBtn') 
    const logoutBtn = document.getElementById('logoutBtn') 
    
    if (loginBtn && logoutBtn) {
        loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block' 
        logoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none' 
    }
}

function toggleLogin(isLogin) {
    if (isLogin) {
        localStorage.setItem('isLoggedIn', 'true') 
        window.location.href = 'login.html' 
        showToast('Logged in successfully!') 
    } else {
        localStorage.removeItem('isLoggedIn') 
        window.location.href = 'login.html' 
        showToast('Logged out successfully!') 
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkLoginState() 
    
    const loginBtn = document.getElementById('loginBtn') 
    const logoutBtn = document.getElementById('logoutBtn') 
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault() 
            toggleLogin(true) 
        }) 
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault() 
            toggleLogin(false) 
        }) 
    }
}) 