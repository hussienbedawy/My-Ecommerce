
document.addEventListener('DOMContentLoaded', async function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search) 
    const productId = urlParams.get('id') 
    
    if (!productId) {
        window.location.href = 'products.html' 
        return 
    }

    try {
        // Fetch product data
        const response = await fetch('../DB/dataSet.json') 
        const data = await response.json() 
        const perfume = data.perfumes.find(p => p.id == productId) 
        
        if (!perfume) {
            window.location.href = 'products.html' 
            return 
        }

        // Display product
        const productDisplay = document.getElementById('productDisplay') 
        productDisplay.innerHTML = `
            <div class="product-image">
                <img src="${perfume.image || 'https://via.placeholder.com/400x400?text=Perfume'}" alt="${perfume.name}">
            </div>
            <div class="product-info">
                <h1 class="product-title">${perfume.name}</h1>
                <span class="product-brand">${perfume.brand}</span>
                <div class="product-price">$${perfume.price.toFixed(2)}</div>
                <div class="product-description">${perfume.description}</div>
                <div class="product-notes">
                    <span class="notes-title">Fragrance Notes:</span>
                    <span class="notes-list">${perfume.notes}</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${perfume.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="favorite-btn" onclick="toggleFavorite(${perfume.id}, this)">
                        <i class="fas fa-heart"></i> Favorite
                    </button>
                </div>
            </div>
        ` 

        // Check if product is favorited
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [] 
        if (favorites.includes(perfume.id.toString())) {
            document.querySelector('.favorite-btn i').style.color = 'red' 
        }

        // Update cart count
        updateCartCount() 
    } catch (error) {
        console.error('Error loading product:', error) 
        window.location.href = 'products.html' 
    }
}) 

function toggleFavorite(productId, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [] 
    const heartIcon = button.querySelector('i') 
    
    if (favorites.includes(productId.toString())) {
        favorites = favorites.filter(id => id !== productId.toString()) 
        heartIcon.style.color = '' 
        showToast('Removed from favorites') 
    } else {
        favorites.push(productId.toString()) 
        heartIcon.style.color = 'red' 
        showToast('Added to favorites') 
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites)) 
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [] 
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0) 
    document.querySelector('.icon-cart span').innerText = totalQuantity 
}

function showToast(message) {
    const toast = document.createElement('div') 
    toast.className = 'toast' 
    toast.textContent = message 
    document.body.appendChild(toast) 
    
    setTimeout(() => {
        toast.remove() 
    }, 3000) 
}
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