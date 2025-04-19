let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let productsGrid = document.getElementById('productsGrid');
let perfumes = [];
let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const initApp = async () => {
    try {
        // Fetch product data
        const response = await fetch('../DB/dataSet.json');
        const data = await response.json();
        perfumes = data.perfumes;

        // Add products to HTML
        addDataToHTML();

        // Load cart data from localStorage
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }

        // Set up tab filtering
        setupProductTabs();
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
};

const addDataToHTML = () => {
    // Clear existing products
    productsGrid.innerHTML = '';

    // Add new products
    if (perfumes.length > 0) {
        perfumes.forEach(perfume => {
            let newProduct = document.createElement('div');
            newProduct.className = 'product-card';
            newProduct.dataset.id = perfume.id;
            newProduct.dataset.gender = perfume.gender.toLowerCase();
            newProduct.innerHTML = `
                <div class="product-image">
                    <img src="${perfume.image || 'https://via.placeholder.com/300x300?text=Perfume'}" alt="${perfume.name}">
                    ${perfume.price < 100 ? '<span class="product-badge">Sale</span>' : ''}
                    <div class="product-actions">
                        <a href="#" class="action-btn"><i class="fas fa-heart"></i></a>
                        <a href="#" class="action-btn addCart"><i class="fas fa-shopping-cart"></i></a>
                        <a href="#" class="action-btn"><i class="fas fa-eye"></i></a>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${perfume.brand}</div>
                    <h3 class="product-title">${perfume.name}</h3>
                    <div class="product-price">$${perfume.price.toFixed(2)}</div>
                </div>
            `;
            productsGrid.appendChild(newProduct);
        });

        // Add event listeners to new cart buttons
        document.querySelectorAll('.addCart').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                let id_product = button.closest('.product-card').dataset.id;
                addToCart(id_product);
            });
        });
    }
};

const setupProductTabs = () => {
    document.querySelectorAll('.product-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.product-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const genderFilter = btn.textContent === 'All' ? '' : btn.textContent.toLowerCase();
            filterProducts(genderFilter);
        });
    });
};

const filterProducts = (gender) => {
    const allProducts = document.querySelectorAll('.product-card');
    allProducts.forEach(product => {
        if (gender === '' || product.dataset.gender === gender) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
};

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = perfumes.findIndex((value) => value.id == item.product_id);
            let info = perfumes[positionProduct];
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
                </div>`;
            listCartHTML.appendChild(newItem);
        });
    }
    iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity += 1;
                break;
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
};

// Initialize the app
initApp();