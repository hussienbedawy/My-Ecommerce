// --- Tabs ---
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active')) 
        btn.classList.add('active') 
        showToast(`Filtered by: ${btn.textContent}`) 
    }) 
}) 
function checkLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' 
    const loginBtn = document.getElementById('loginBtn') 
    const logoutBtn = document.getElementById('logoutBtn') 

    if (isLoggedIn) {
        loginBtn.style.display = 'none' 
        logoutBtn.style.display = 'inline-block' 
    } else {
        loginBtn.style.display = 'inline-block' 
        logoutBtn.style.display = 'none' 
    }
}
// --- Login / Logout ---
function toggleLogin(isLogin) {
    const loginBtn = document.getElementById('loginBtn') 
    const logoutBtn = document.getElementById('logoutBtn') 

    if (isLogin) {
        // User is logging in
        loginBtn.style.display = 'inline-block' 
        logoutBtn.style.display = 'none' 
        // Save login state
        showToast('Logged in successfully!') 
        window.location.href = 'index.html' 
        localStorage.setItem('isLoggedIn', 'true')  // Redirect to index.html
    }
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' 
    if (isLoggedIn) {
        // User is logging out
        loginBtn.style.display = 'none' 
        logoutBtn.style.display = 'inline-block' 
        localStorage.removeItem('isLoggedIn')  // Remove login state
        showToast('Logged out successfully!') 
        window.location.href = 'login.html'  // Redirect to login.html
    }
}

// Show/hide login/logout buttons on all pages
window.onload = function () {
    const loginBtn = document.getElementById('loginBtn') 
    const logoutBtn = document.getElementById('logoutBtn') 

    // Check login state from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' 

    if (loginBtn && logoutBtn) {
        loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block' 
        logoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none' 
    }
} 


// --- Toast System ---
function showToast(msg) {
    const toast = document.createElement('div') 
    toast.innerText = msg 
    toast.style.cssText = `
    position: fixed 
    bottom: 30px 
    right: 30px 
    background: #e65540 
    color: white 
    padding: 12px 20px 
    border-radius: 5px 
    box-shadow: 0 3px 10px rgba(0,0,0,0.2) 
    z-index: 9999 
    opacity: 0 
    transition: opacity 0.4s ease 
  ` 
    document.body.appendChild(toast) 
    requestAnimationFrame(() => toast.style.opacity = '1') 
    setTimeout(() => {
        toast.style.opacity = '0' 
        setTimeout(() => toast.remove(), 400) 
    }, 2500) 
}

// --- Animated Counter (for category or products section) ---
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]') 
    counters.forEach(counter => {
        const target = +counter.dataset.count 
        let current = 0 
        const increment = Math.ceil(target / 40) 
        const updateCount = () => {
            current += increment 
            if (current > target) current = target 
            counter.textContent = current 
            if (current < target) requestAnimationFrame(updateCount) 
        } 
        updateCount() 
    }) 
}
window.addEventListener('scroll', () => {
    const header = document.querySelector('header') 
    if (window.scrollY > 50) {
        header.classList.add('scrolled') 
    } else {
        header.classList.remove('scrolled') 
    }
}) 


// --- Smooth Scroll to Anchors ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault() 
        const target = document.querySelector(this.getAttribute('href')) 
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' }) 
        }
    }) 
}) 

// --- Autofocus search on "/" keypress ---
document.addEventListener('keydown', e => {
    if (e.key === '/') {
        e.preventDefault() 
        document.getElementById('searchInput')?.focus() 
    }
}) 

// --- Product card hover expansion (JS assisted effect) ---
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.03)' 
        card.style.zIndex = '10' 
    }) 
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)' 
        card.style.zIndex = '1' 
    }) 
}) 

// --- Page Entrance Animation ---
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0' 
    document.body.style.transition = 'opacity 0.8s ease' 
    requestAnimationFrame(() => {
        document.body.style.opacity = '1' 
    }) 

    animateCounters()  // Trigger any counter animations on load
}) 
const slides = document.querySelectorAll('.slide') 
const dots = document.querySelectorAll('.dot') 
const prevBtn = document.getElementById('prevBtn') 
const nextBtn = document.getElementById('nextBtn') 
let current = 0 
let slideInterval 

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active') 
        dots[i].classList.remove('active') 
        if (i === index) {
            slide.classList.add('active') 
            dots[i].classList.add('active') 
        }
    }) 
}

function nextSlide() {
    current = (current + 1) % slides.length 
    showSlide(current) 
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length 
    showSlide(current) 
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 6000) 
}

function stopSlider() {
    clearInterval(slideInterval) 
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        stopSlider() 
        current = i 
        showSlide(current) 
        startSlider() 
    }) 
}) 

nextBtn.addEventListener('click', () => {
    stopSlider() 
    nextSlide() 
    startSlider() 
}) 

prevBtn.addEventListener('click', () => {
    stopSlider() 
    prevSlide() 
    startSlider() 
}) 

startSlider() 

// Swipe support for mobile
let touchStartX = 0 
let touchEndX = 0 

document.querySelector('.slider').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX 
}) 

document.querySelector('.slider').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX 
    handleSwipe() 
}) 

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        stopSlider() 
        nextSlide() 
        startSlider() 
    }
    if (touchEndX > touchStartX + 50) {
        stopSlider() 
        prevSlide() 
        startSlider() 
    }
}
// Function to fetch and display perfumes
async function fetchAndDisplayPerfumes() {
    try {
        // Fetch the perfumes data
        const response = await fetch('/DB/dataSet.json') 
        const data = await response.json() 
        const perfumes = data.perfumes 

        // Get the products grid container
        const productsGrid = document.querySelector('.products-grid') 

        // Clear existing products (except the first one which we'll use as template)
        productsGrid.innerHTML = '' 

        // Create product cards for each perfume
        // Sort perfumes by price in descending order
        const sortedPerfumes = perfumes.sort((a, b) => b.price - a.price) 

        // Select only the top 4 most expensive perfumes
        const topPerfumes = sortedPerfumes.slice(0, 4) 

        topPerfumes.forEach(perfume => {
            const productCard = document.createElement('div') 
            productCard.className = 'product-card' 
            productCard.innerHTML = `
            <a href="/singleProduct.html?id=${perfume.id}">
        <div class="product-image">
        <img src="${perfume.image || 'https://via.placeholder.com/300x300?text=Perfume'}" alt="${perfume.name}">
        ${perfume.price < 100 ? '<span class="product-badge">Sale</span>' : ''}
        </div>
        <div class="product-info">
        <div class="product-category">${perfume.brand}</div>
        <h3 class="product-title">${perfume.name}</h3>
        <div class="product-price">$${perfume.price.toFixed(2)}</div>
        <div class="product-description" style="display:none">${perfume.description}</div>
        <div class="product-notes" style="display:none">${perfume.notes}</div>
        </div>
        </a>
        ` 
            productsGrid.appendChild(productCard) 
        }) 


        // Update the counter in the categories section

    } catch (error) {
        console.error('Error loading perfumes:', error) 
        showToast('Error loading products. Please try again later.') 
    }
}

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayPerfumes() 

    // Your existing DOMContentLoaded code
    document.body.style.opacity = '0' 
    document.body.style.transition = 'opacity 0.8s ease' 
    requestAnimationFrame(() => {
        document.body.style.opacity = '1' 
    }) 
    animateCounters() 
}) 
document.querySelectorAll('.fa-heart').forEach(heartIcon => {
    heartIcon.addEventListener('click', (e) => {
        e.preventDefault() 
        const productCard = heartIcon.closest('.product-card') 
        const productId = productCard.dataset.id 

        // Save to favorites in localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [] 
        if (!favorites.includes(productId)) {
            favorites.push(productId) 
            localStorage.setItem('favorites', JSON.stringify(favorites)) 
            heartIcon.style.color = 'gray' 
            showToast('Product added to favorites!') 
        } else {
            favorites = favorites.filter(favId => favId !== productId) 
            localStorage.setItem('favorites', JSON.stringify(favorites)) 
            heartIcon.style.color = ''  // Reset heart color
            showToast('Product removed from favorites!') 
        }
    }) 
}) 
// Update the search function to search through perfumes
async function searchProduct() {
    const value = document.getElementById('searchInput').value.trim().toLowerCase() 
    if (!value) {
        showToast("Please enter a product name.") 
        return 
    }

    try {
        const response = await fetch('/DB/dataSet.json') 
        const data = await response.json() 
        const matchingPerfumes = data.perfumes.filter(perfume =>
            perfume.name.toLowerCase().includes(value) ||
            perfume.brand.toLowerCase().includes(value) ||
            perfume.notes.toLowerCase().includes(value)
        ) 

        if (matchingPerfumes.length > 0) {
            showToast(`Found ${matchingPerfumes.length} matching perfumes`) 
            // Here you could display the matching perfumes in a modal or filtered view
        } else {
            showToast(`No perfumes found matching "${value}"`) 
        }
    } catch (error) {
        console.error('Error searching perfumes:', error) 
        showToast('Error searching products. Please try again later.') 
    }
}
// Add this to your existing JavaScript
document.querySelectorAll('.product-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        // Remove active class from all buttons
        document.querySelectorAll('.product-tabs .tab-btn').forEach(b => b.classList.remove('active')) 
        // Add active class to clicked button
        btn.classList.add('active') 

        const genderFilter = btn.textContent === 'All' ? '' : btn.textContent 

        try {
            const response = await fetch('/DB/dataSet.json') 
            const data = await response.json() 
            let filteredPerfumes = data.perfumes 

            if (genderFilter) {
                // Filter perfumes by gender
                filteredPerfumes = data.perfumes.filter(perfume =>
                    perfume.gender.toLowerCase() === genderFilter.toLowerCase()
                ) 
            } else {
                // For "All" section, sort by price and select the top 4
                filteredPerfumes = data.perfumes
                    .sort((a, b) => b.price - a.price) // Sort by price (descending)
                    .slice(0, 4)  // Take the top 4
            }

            const productsGrid = document.querySelector('.products-grid') 
            productsGrid.innerHTML = '' 

            filteredPerfumes.forEach(perfume => {
                const productCard = document.createElement('div') 
                productCard.className = 'product-card' 
                productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${perfume.image || 'https://via.placeholder.com/300x300?text=Perfume'}" alt="${perfume.name}">
                        ${perfume.price < 100 ? '<span class="product-badge">Sale</span>' : ''}
                        <div class="product-actions">
                            <a href="#" class="action-btn"><i class="fas fa-heart"></i></a>
                            <a href="#" class="action-btn"><i class="fas fa-shopping-cart"></i></a>
                            <a href="#" class="action-btn"><i class="fas fa-eye"></i></a>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${perfume.brand}</div>
                        <h3 class="product-title">${perfume.name}</h3>
                        <div class="product-price">$${perfume.price.toFixed(2)}</div>
                        <div class="product-description" style="display:none">${perfume.description}</div>
                        <div class="product-notes" style="display:none">${perfume.notes}</div>
                    </div>
                ` 
                productsGrid.appendChild(productCard) 

            }) 

            showToast(`Showing ${filteredPerfumes.length} ${genderFilter || 'top 4'} perfumes`) 

        } catch (error) {
            console.error('Error filtering perfumes:', error) 
            showToast('Error filtering products. Please try again later.') 
        }
    }) 
}) 
// Add to Favorites
document.querySelectorAll('.product-card .fa-heart').forEach(heartIcon => {
    heartIcon.addEventListener('click', (e) => {
        e.preventDefault() 
        const productCard = heartIcon.closest('.product-card') 
        const product = {
            image: productCard.querySelector('.product-image img').src,
            name: productCard.querySelector('.product-title').textContent,
            price: productCard.querySelector('.product-price').textContent,
            brand: productCard.querySelector('.product-category').textContent,
        } 

        // Save to localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [] 
        if (!favorites.some(fav => fav.name === product.name)) {
            favorites.push(product) 
            localStorage.setItem('favorites', JSON.stringify(favorites)) 
            showToast(`${product.name} added to favorites!`) 
        } else {
            showToast(`${product.name} is already in favorites.`) 
        }
    }) 
}) 


// cart logic
let listCartHTML = document.querySelector('.listCart') 
let iconCart = document.querySelector('.icon-cart') 
let iconCartSpan = document.querySelector('.icon-cart span') 
let body = document.querySelector('body') 
let closeCart = document.querySelector('.close') 

let cart = [] 

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart') 
}) 
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart') 
}) 

const initApp = async () => {
    try {
        // Fetch product data
        const response = await fetch('../DB/dataSet.json') 
        const data = await response.json() 
        perfumes = data.perfumes 


        // Load cart data from localStorage
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart')) 
            addCartToHTML() 
        }

    } catch (error) {
        console.error('Error fetching product data:', error) 
    }
} 
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id) 
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }] 
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        }) 
    } else {
        cart[positionThisProductInCart].quantity += 1 
    }
    addCartToHTML() 
    addCartToMemory() 
} 

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart)) 
} 

const addCartToHTML = () => {
    listCartHTML.innerHTML = '' 
    let totalQuantity = 0 
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity 
            let newItem = document.createElement('div') 
            newItem.classList.add('item') 
            newItem.dataset.id = item.product_id 

            let positionProduct = perfumes.findIndex((value) => value.id == item.product_id) 
            let info = perfumes[positionProduct] 
            newItem.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="${info.name}">
                </div>
                <div class="name">${info.name}</div>
                <div class="totalPrice">$${(info.price * item.quantity).toFixed(2)}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>` 
            listCartHTML.appendChild(newItem) 
        }) 
    }
    iconCartSpan.innerText = totalQuantity 
} 

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target 
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id 
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus' 
        changeQuantityCart(product_id, type) 
    }
}) 

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id) 
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity += 1 
                break 
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1 
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity 
                } else {
                    cart.splice(positionItemInCart, 1) 
                }
                break 
        }
    }
    addCartToHTML() 
    addCartToMemory() 
} 


initApp() 