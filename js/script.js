// ===== PRODUCT DATA =====
const products = [
    {
        id: 1,
        name: "Cloud Comfort",
        category: "Комфортные",
        description: "Мягкая и удобная подушка для спокойного сна",
        price: 49,
        emoji: "☁️",
        type: "comfort"
    },
    {
        id: 2,
        name: "Memory Gel Pro",
        category: "Ортопедические",
        description: "С эффектом памяти и охлаждающим гелем",
        price: 89,
        emoji: "🧊",
        type: "memory"
    },
    {
        id: 3,
        name: "Cool Night",
        category: "Охлаждающие",
        description: "Идеальна для жарких ночей",
        price: 75,
        emoji: "❄️",
        type: "cooling"
    },
    {
        id: 4,
        name: "Premium Luxury",
        category: "Премиум",
        description: "Премиальная подушка с натуральной шелковой наволочкой",
        price: 149,
        emoji: "👑",
        type: "premium"
    },
    {
        id: 5,
        name: "Eco Organic",
        category: "Эко-материалы",
        description: "Полностью органичная и экологичная",
        price: 95,
        emoji: "🌿",
        type: "memory"
    },
    {
        id: 6,
        name: "Support Pillow",
        category: "Ортопедические",
        description: "Специальная поддержка для боков и спины",
        price: 79,
        emoji: "🛡️",
        type: "memory"
    }
];

let cart = [];

// ===== INITIALIZE PAGE =====
document.addEventListener('DOMContentLoaded', function() {
    loadProducts(products);
    setupEventListeners();
    loadCartFromStorage();
});

// ===== LOAD PRODUCTS =====
function loadProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #9ca3af;">Товары не найдены</p>';
        return;
    }

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price}€</span>
                    <button class="btn btn-primary btn-small" onclick="addToCart(${product.id})">
                        🛒 В корзину
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// ===== ADD TO CART =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCartCount();
    showNotification(`${product.name} добавлена в корзину!`);
}

// ===== REMOVE FROM CART =====
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartCount();
    displayCart();
}

// ===== UPDATE CART COUNT =====
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// ===== DISPLAY CART =====
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #9ca3af;">Корзина пуста</p>';
        document.getElementById('totalPrice').textContent = '0';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>${item.quantity} x ${item.price}€ = ${itemTotal}€</small>
            </div>
            <button class="btn btn-primary btn-small" onclick="removeFromCart(${item.id})">
                ✕
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// ===== CART MODAL FUNCTIONS =====
function openCart() {
    displayCart();
    document.getElementById('cartModal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// ===== SETUP EVENT LISTENERS =====
function setupEventListeners() {
    // Поиск
    document.getElementById('searchInput').addEventListener('input', filterProducts);

    // Фильтр по цене
    document.getElementById('priceFilter').addEventListener('change', filterProducts);

    // Фильтр по категории
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);

    // Закрытие модального окна по клику вне его
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('cartModal');
        if (event.target === modal) {
            closeCart();
        }
    });

    // Мобильное меню
    document.querySelector('.hamburger')?.addEventListener('click', toggleMobileMenu);
}

// ===== FILTER PRODUCTS =====
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const priceFilter = document.getElementById('priceFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;

    let filtered = products.filter(product => {
        // Поиск по названию и описанию
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);

        // Фильтр по цене
        let matchesPrice = true;
        if (priceFilter === 'budget') matchesPrice = product.price <= 50;
        if (priceFilter === 'medium') matchesPrice = product.price > 50 && product.price <= 100;
        if (priceFilter === 'premium') matchesPrice = product.price > 100;

        // Фильтр по категории
        const matchesCategory = !categoryFilter || product.type === categoryFilter;

        return matchesSearch && matchesPrice && matchesCategory;
    });

    loadProducts(filtered);
}

// ===== NOTIFICATION =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== SCROLL TO PRODUCTS =====
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ===== SUBSCRIBE TO NEWSLETTER =====
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    showNotification(`Спасибо! Мы отправили подтверждение на ${email}`);
    event.target.reset();
}

// ===== LOCAL STORAGE FUNCTIONS =====
function saveCartToStorage() {
    localStorage.setItem('cloudPillowCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('cloudPillowCart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartCount();
    }
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    }
}

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== SMOOTH SCROLL FALLBACK =====
if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'auto' });
            }
        });
    });
}
