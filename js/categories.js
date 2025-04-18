// --- Tabs ---
// document.querySelectorAll('.tab-btn').forEach(btn => {
//     btn.addEventListener('click', () => {
//         document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
//         btn.classList.add('active');
//         showToast(`Filtered by: ${btn.textContent}`);
//     });
// });

// --- Login / Logout ---
// function toggleLogin(isLogin) {
//     const loginBtn = document.getElementById('loginBtn');
//     const logoutBtn = document.getElementById('logoutBtn');
//     if (isLogin) {
//         loginBtn.style.display = 'none';
//         logoutBtn.style.display = 'inline-block';
//         showToast('Logged in successfully!');
//     } else {
//         loginBtn.style.display = 'inline-block';
//         logoutBtn.style.display = 'none';
//         showToast('Logged out successfully!');
//     }
// }

// --- Product/Game Search ---
// function searchProduct() {
//     const value = document.getElementById('searchInput').value.trim();
//     if (value) {
//         showToast(`Searching for "${value}"...`);
//     } else {
//         showToast("Please enter a product or game name.");
//     }
// }


document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayPerfumes();
    setupTabFilters();
    animatePageEntrance();
});


async function fetchAndDisplayPerfumes(filter = '') {
    try {
        const response = await fetch('/DB/dataSet.json');
        const data = await response.json();
        let perfumes = data.perfumes;

        
        if (filter && filter !== 'All') { 
            perfumes = perfumes.filter(p => 
                p.gender.toLowerCase() === filter.toLowerCase()
            );
        } else {
            
            perfumes = perfumes.sort((a, b) => b.price - a.price).slice(0, 12);
        }

        renderProducts(perfumes);
        showToast(`Showing ${perfumes.length} ${filter || 'featured'} perfumes`);

    } catch (error) {
        console.error('Error loading products:', error);
        showToast('Error loading products. Please try again later.');
    }
}


function renderProducts(perfumes) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    perfumes.forEach(perfume => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${perfume.image || 'https://via.placeholder.com/300x300?text=Perfume'}" 
                     alt="${perfume.name}">
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
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}


function setupTabFilters() {
    document.querySelectorAll('.product-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
           
            document.querySelectorAll('.tab-btn').forEach(b => 
                b.classList.remove('active')
            );
            btn.classList.add('active');
            
            
            fetchAndDisplayPerfumes(btn.textContent);
        });
    });
}

// Toast notification
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = msg;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}


function animatePageEntrance() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
}


document.addEventListener('click', (e) => {
    if (e.target.closest('.action-btn .fa-shopping-cart')) {
        e.preventDefault();
        showToast('Product added to cart!');
    }
    
    if (e.target.closest('.action-btn .fa-heart')) {
        e.preventDefault();
        showToast('Added to favorites!');
    }
});