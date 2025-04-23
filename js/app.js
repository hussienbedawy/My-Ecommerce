

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

// --- Product card hover
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
        
        const response = await fetch('/DB/dataSet.json') 
        const data = await response.json() 
        const perfumes = data.perfumes 

        
        const productsGrid = document.querySelector('.products-grid') 

        
        productsGrid.innerHTML = '' 

        
        const sortedPerfumes = perfumes.sort((a, b) => b.price - a.price) 

        
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


        

    } catch (error) {
        console.error('Error loading perfumes:', error) 
       
    }
}


window.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayPerfumes() 

    
    document.body.style.opacity = '0' 
    document.body.style.transition = 'opacity 0.8s ease' 
    requestAnimationFrame(() => {
        document.body.style.opacity = '1' 
    }) 
   
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
           
        } else {
            favorites = favorites.filter(favId => favId !== productId) 
            localStorage.setItem('favorites', JSON.stringify(favorites)) 
            heartIcon.style.color = ''  
         
        }
    }) 
}) 



document.querySelectorAll('.product-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('', async () => {
        try {
            const response = await fetch('/DB/dataSet.json') 
            const data = await response.json() 
            let filteredPerfumes = data.perfumes 

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


        } catch (error) {
            console.error('Error filtering perfumes:', error) 
         
        }
    }) 
}) 



 