document.addEventListener('DOMContentLoaded', async () => {
    const favoritesGrid = document.getElementById('favoritesGrid') 
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [] 

    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '<h2>No favorite products yet.</h2>' 
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

            
        }) 
    } catch (error) {
        console.error('Error loading favorites:', error) 
        favoritesGrid.innerHTML = '<p>Failed to load favorite products. Please try again later.</p>' 
    }
}) 



