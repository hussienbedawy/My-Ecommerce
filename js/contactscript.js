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