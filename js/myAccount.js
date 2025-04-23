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
    "Loyalty Status": "Golden Membership"
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
  const favoritesListEl = document.getElementById("favorites-list")  
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
