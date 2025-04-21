// Load user info from localStorage
function loadUserInfo() {
  const userInfoEl = document.getElementById("user-info") 
  const users = JSON.parse(localStorage.getItem("users")) || [] 

  if (users.length === 0) {
    userInfoEl.innerHTML = '<p class="empty">No user data found.</p>' 
    return 
  }

  const user = users[users.length - 1]  // Last registered user

  const fields = {
    "Full Name": user.firstName + " " + user.lastName,
    "Email": user.email,
    "Country": user.country || "Not specified",
    "Address": user.address || "Not specified",
    "Member Since": new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    "Loyalty Status": "Gold Tier Member"
  } 

  userInfoEl.innerHTML = Object.entries(fields)
    .map(([label, value]) => `
      <div class="info-box">
        <div class="label">${label}</div>
        <div class="value">${value}</div>
      </div>
    `)
    .join("") 
}

// Load My Orders from cart + perfumes DB
async function loadOrders() {
  const orderListEl = document.getElementById("order-list") 
  const cart = JSON.parse(localStorage.getItem("cart")) || [] 

  if (cart.length === 0) {
    orderListEl.innerHTML = '<p class="empty">Your collection awaits. No orders yet.</p>' 
    return 
  }

  try {
    const res = await fetch('/DB/dataSet.json') 
    const data = await res.json() 
    const perfumes = data.perfumes 

    const ordersHtml = cart.map(item => {
      const product = perfumes.find(p => p.id == item.product_id) 
      if (!product) return '' 

      return `
        <div class="order-item">
          <img src="${product.image}" alt="${product.name}" />
          <div class="order-details">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${item.quantity} × ${product.price.toFixed(2)}</div>
          </div>
        </div>
      ` 
    }).join("") 

    orderListEl.innerHTML = ordersHtml || '<p class="empty">No matching products found in DB.</p>' 

  } catch (err) {
    console.error("Error fetching products:", err) 
    orderListEl.innerHTML = '<p class="empty">Error loading your collection. Please try again later.</p>' 
  }
}
async function loadfavorites() {
  const favoritesListEl = document.getElementById("favorites-list")  // Add a container for favorites in your HTML
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [] 

  if (favorites.length === 0) {
    favoritesListEl.innerHTML = '<p class="empty">No favorite products yet.</p>' 
    return 
  }

  try {
    const res = await fetch('/DB/dataSet.json') 
    const data = await res.json() 
    const perfumes = data.perfumes 

    const favoritesHtml = favorites.map(favoriteId => {
      const product = perfumes.find(p => p.id == favoriteId) 
      if (!product) return '' 

      return `
        <div class="favorite-item">
          <img src="${product.image}" alt="${product.name}" />
          <div class="favorite-details">
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
          </div>
        </div>
      ` 
    }).join("") 

    favoritesListEl.innerHTML = favoritesHtml || '<p class="empty">No matching products found in DB.</p>' 

  } catch (err) {
    console.error("Error fetching products:", err) 
    favoritesListEl.innerHTML = '<p class="empty">Error loading your favorites. Please try again later.</p>' 
  }
}
// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  loadUserInfo() 
  loadOrders() 
  loadfavorites()
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