
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
