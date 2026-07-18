// Sample product data
const products = [
    { id: 1, name: "Smartphone", price: 599, image: "https://images.hindustantimes.com/tech/img/2022/09/20/960x540/iphone-14-pro-model-unselect-gallery-2-202209_GEO_US_1662809684583_1663679105577_1663679105577.jpg", category: "Smartphones" },
    { id: 2, name: "Laptop", price: 999, image: "https://www.hindustantimes.com/ht-img/img/2025/02/25/550x309/best_laptop_under_70000_1740466998992_1740467035546.jpg", category: "Laptops" },
    { id: 3, name: "Headphones", price: 99, image: "https://image.freepik.com/free-photo/black-wireless-headphones-isolated-black-background_95544-15.jpg", category: "Accessories" },
    { id: 4, name: "Smartwatch", price: 199, image: "https://wallpaperaccess.com/full/2067432.jpg", category: "Accessories" },
    { id: 5, name: "Tablet", price: 399, image: "https://imgeng.jagran.com/images/2023/jan/Best%20Apple%20iPad1673262840388.jpg", category: "Smartphones" },
    { id: 6, name: "Gaming Console", price: 499, image: "https://devstutor.com/wp-content/uploads/2024/08/Gaming-Consoles.jpg", category: "Accessories" },
    { id: 7, name: "Bluetooth Speaker", price: 79, image: "https://www.slashgear.com/img/gallery/10-major-bluetooth-speaker-brands-ranked-worst-to-best/l-intro-1684351042.jpg", category: "Accessories" },
    { id: 8, name: "Camera", price: 699, image: "https://i.pinimg.com/originals/58/42/93/584293ad68f734418d323b4c5ef1d91a.jpg", category: "Accessories" },
    { id: 9, name: "Monitor", price: 249, image: "https://www.electrical-deals.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/2/7/27UK650-W-front.jpg", category: "Laptops" },
    { id: 10, name: "Keyboard", price: 49, image: "https://api.duniagames.co.id/api/content/upload/file/17059522021664444314.jpg", category: "Accessories" }
];

// Cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load products on products page
function loadProducts(filteredProducts = products) {
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        productGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `).join('');
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

// Load cart items
function loadCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    if (cartItems && cartTotal) {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${item.price * item.quantity}</span>
            </div>
        `).join('');
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotal.textContent = total;
    }
}

// Search products
document.querySelectorAll('.search-bar input').forEach(input => {
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(query));
        loadProducts(filtered);
    });
});

// Filter products by category
document.getElementById('category')?.addEventListener('change', (e) => {
    const category = e.target.value;
    const filtered = category === 'All' ? products : products.filter(p => p.category === category);
    loadProducts(filtered);
});

// Filter products by price
document.getElementById('price')?.addEventListener('input', (e) => {
    const maxPrice = parseInt(e.target.value);
    const filtered = products.filter(p => p.price <= maxPrice);
    loadProducts(filtered);
});

// Form validation for login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = e.target.querySelector('.btn');
    btn.disabled = true;
    btn.textContent = 'Logging in...';
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success) {
            alert('Login successful!');
            window.location.href = 'index.html';
        }  else {
            alert('Invalid credentials!');
        }
    } catch (error) {
        alert('Error logging in!');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Login';
    }
});

// Form validation for register
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const btn = e.target.querySelector('.btn');
    btn.disabled = true;
    btn.textContent = 'Registering...';
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        btn.disabled = false;
        btn.textContent = 'Register';
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (data.success) {
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed!');
        }
    } catch (error) {
        alert('Error registering!');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Register';
    }
});

// Payment form submission
document.getElementById('paymentForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    const btn = e.target.querySelector('.btn');
    btn.disabled = true;
    btn.textContent = 'Processing...';
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, '')) || !/^\d{3}$/.test(cvv) || !/^\d{2}\/\d{2}$/.test(expiry)) {
        alert('Invalid payment details!');
        btn.disabled = false;
        btn.textContent = 'Confirm Payment';
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart, total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) })
        });
        const data = await response.json();
        if (data.success) {
            alert('Payment successful! Order placed.');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        } else {
            alert('Payment failed!');
        }
    } catch (error) {
        alert('Error processing payment!');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Confirm Payment';
    }
});

// Initialize pages
loadProducts();
loadCart();