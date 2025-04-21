document.addEventListener('DOMContentLoaded', async () => {
    const favoritesGrid = document.getElementById('favoritesGrid') 
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [] 

    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '<p>No favorite products yet.</p>' 
        return 
    }

    try {
        const response = await fetch('../DB/dataSet.json') 
        const data = await response.json() 
        const perfumes = data.perfumes 

        // Filter favorite items
        const favoriteItems = perfumes.filter(perfume =>
            favorites.includes(perfume.id.toString())
        ) 

        // Render favorite items
        favoriteItems.forEach(perfume => {
            const productCard = document.createElement('div') 
            productCard.className = 'product-card' 
            productCard.dataset.id = perfume.id 
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${perfume.image || 'https://via.placeholder.com/300x300?text=Perfume'}" alt="${perfume.name}">
                    ${perfume.price < 100 ? '<span class="product-badge">Sale</span>' : ''}
                    <div class="product-actions">
                        <a href="#" class="action-btn remove-fav" data-id="${perfume.id}">
                            <i class="fas fa-heart added"></i>
                        </a>
                        <a href="#" class="action-btn addCart" data-id="${perfume.id}">
                            <i class="fas fa-shopping-cart"></i>
                        </a>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${perfume.brand}</div>
                    <h3 class="product-title">${perfume.name}</h3>
                    <div class="product-price">$${perfume.price.toFixed(2)}</div>
                </div>
            ` 
            favoritesGrid.appendChild(productCard) 

            // Add event listener to remove from favorites
            productCard.querySelector('.remove-fav').addEventListener('click', (e) => {
                e.preventDefault() 
                const id = perfume.id.toString() 
                favorites = favorites.filter(favId => favId !== id) 
                localStorage.setItem('favorites', JSON.stringify(favorites)) 
                productCard.remove() 
                if (favorites.length === 0) {
                    favoritesGrid.innerHTML = '<p>No favorite products yet.</p>' 
                }
                showToast('Product removed from favorites!') 
            }) 

            // Add event listener to add to cart
            productCard.querySelector('.addCart').addEventListener('click', (e) => {
                e.preventDefault() 
                addToCart(perfume.id) 
                showToast('Product added to cart!') 
            }) 
        }) 
    } catch (error) {
        console.error('Error loading favorites:', error) 
        favoritesGrid.innerHTML = '<p>Failed to load favorite products. Please try again later.</p>' 
    }
}) 

// Toast system for feedback messages
function showToast(msg) {
    const toast = document.createElement('div') 
    toast.className = 'toast' 
    toast.textContent = msg 
    document.body.appendChild(toast) 

    setTimeout(() => {
        toast.remove() 
    }, 3000) 
}

// Cart logic
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

// Initialize the app
initApp() 