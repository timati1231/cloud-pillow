// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let cart = [];
let products = [
    // Ортопедические подушки
    {
        id: 1,
        name: "Ортопедическая подушка Premium",
        category: "orthopedic",
        description: "Идеальна для поддержки шеи и спины",
        size: "50x70 см",
        filler: "memory-foam",
        price: 18500,
        rating: 5,
        image: "🛏️"
    },
    {
        id: 2,
        name: "Ортопедическая Memory Foam",
        category: "orthopedic",
        description: "Анатомическая поддержка позвоночника",
        size: "50x70 см",
        filler: "memory-foam",
        price: 16900,
        rating: 5,
        image: "🛏️"
    },
    {
        id: 3,
        name: "Ортопедическая из латекса",
        category: "orthopedic",
        description: "Натуральный латекс для комфорта",
        size: "50x70 см",
        filler: "latex",
        price: 22000,
        rating: 5,
        image: "🛏️"
    },
    
    // Подушки для сна на боку
    {
        id: 4,
        name: "Подушка для сна на боку",
        category: "side",
        description: "Специально разработана для боковой позы",
        size: "50x70 см",
        filler: "memory-foam",
        price: 15800,
        rating: 5,
        image: "🛏️"
    },
    {
        id: 5,
        name: "Высокая подушка для боку",
        category: "side",
        description: "Повышенная поддержка для бокового сна",
        size: "50x70 см",
        filler: "bamboo",
        price: 14500,
        rating: 5,
        image: "🛏️"
    },
    
    // Подушки для сна на спине
    {
        id: 6,
        name: "Подушка для спины Standard",
        category: "back",
        description: "Оптимальная высота для спинального сна",
        size: "50x70 см",
        filler: "memory-foam",
        price: 13900,
        rating: 5,
        image: "🛏️"
    },
    {
        id: 7,
        name: "Подушка для спины Comfort",
        category: "back",
        description: "Мягкая поддержка для позвоночника",
        size: "50x70 см",
        filler: "down",
        price: 12800,
        rating: 5,
        image: "🛏️"
    },
    
    // Пуховые подушки
    {
        id: 8,
        name: "Пуховая подушка Облако",
        category: "down",
        description: "Мягкость премиального пуха",
        size: "50x70 см",
        filler: "down",
        price: 11500,
        rating: 4,
        image: "🛏️"
    },
    {
        id: 9,
        name: "Пуховая подушка Royal",
        category: "down",
        description: "Королевский комфорт премиум класса",
        size: "70x70 см",
        filler: "down",
        price: 14200,
        rating: 5,
        image: "🛏️"
    },
    
    // Подушки для детей
    {
        id: 10,
        name: "Детская подушка Мечта",
        category: "kids",
        description: "Безопасна и комфортна для малышей",
        size: "40x60 см",
        filler: "bamboo",
        price: 8900,
        rating: 5,
        image: "🛏️"
    },
    {
        id: 11,
        name: "Подушка для подростка",
        category: "kids",
        description: "Поддержка растущего организма",
        size: "50x70 см",
        filler: "memory-foam",
        price: 10500,
        rating: 5,
        image: "🛏️"
    },
    
    // Декоративные подушки
    {
        id: 12,
        name: "Декоративная подушка Уют",
        category: "decorative",
        description: "Стильное украшение интерьера",
        size: "50x50 см",
        filler: "bamboo",
        price: 7500,
        rating: 4,
        image: "🛏️"
    },
    {
        id: 13,
        name: "Декоративная подушка Минимал",
        category: "decorative",
        description: "Современный дизайн для любого интерьера",
        size: "50x50 см",
        filler: "bamboo",
        price: 6900,
        rating: 4,
        image: "🛏️"
    }
];

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    renderProducts();
});

// ===== ФУНКЦИИ ПОИСКА И ФИЛЬТРАЦИИ =====
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        document.getElementById('searchInput').focus();
    }
}

function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const price = parseInt(document.getElementById('priceFilter').value);
    const size = document.getElementById('sizeFilter').value;
    const filler = document.getElementById('fillerFilter').value;
    
    // Обновляем отображение цены
    document.getElementById('priceValue').textContent = `до ${price.toLocaleString()} ₸`;
    
    const filtered = products.filter(product => {
        const categoryMatch = !category || product.category === category;
        const priceMatch = product.price <= price;
        const sizeMatch = !size || product.size === size;
        const fillerMatch = !filler || product.filler === filler;
        
        return categoryMatch && priceMatch && sizeMatch && fillerMatch;
    });
    
    renderProducts(filtered);
}

function resetFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('priceFilter').value = '50000';
    document.getElementById('sizeFilter').value = '';
    document.getElementById('fillerFilter').value = '';
    document.getElementById('priceValue').textContent = 'до 50000 ₸';
    renderProducts();
}

// ===== ОТРИСОВКА ТОВАРОВ =====
function renderProducts(productsToRender = products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">Товары не найдены</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-content">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-specs">
                    <div><strong>Размер:</strong> ${product.size}</div>
                    <div><strong>Наполнитель:</strong> ${getFillerName(product.filler)}</div>
                </div>
                <div class="product-footer">
                    <div>
                        <div class="product-price">${product.price.toLocaleString()} ₸</div>
                        <div class="product-rating">
                            <span class="stars">${'★'.repeat(product.rating)}${'☆'.repeat(5-product.rating)}</span>
                        </div>
                    </div>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Добавить в корзину</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function getCategoryName(category) {
    const names = {
        'orthopedic': 'Ортопедические',
        'side': 'Для боку',
        'back': 'Для спины',
        'down': 'Пуховые',
        'kids': 'Для детей',
        'decorative': 'Декоративные'
    };
    return names[category] || category;
}

function getFillerName(filler) {
    const names = {
        'memory-foam': 'Memory foam',
        'latex': 'Натуральный латекс',
        'down': 'Пух и перо',
        'bamboo': 'Бамбук'
    };
    return names[filler] || filler;
}

// ===== КОРЗИНА =====
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.toggle('active');
}

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
    
    updateCart();
    saveCart();
    
    // Показываем уведомление
    showNotification(`"${product.name}" добавлена в корзину`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
            saveCart();
        }
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
        cartCount.textContent = '0';
        cartTotal.textContent = '0 ₸';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        count += item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} ₸</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartCount.textContent = count;
    cartTotal.textContent = total.toLocaleString() + ' ₸';
}

function goToCheckout() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const promoCode = 'WELCOME20';
    
    alert(`Оформление заказа\n\nТовары в корзине: ${cart.length}\nОбщая сумма: ${total.toLocaleString()} ₸\n\nПромокод: ${promoCode}\nСкидка 20%: -${Math.round(total * 0.2).toLocaleString()} ₸\nИтого к оплате: ${Math.round(total * 0.8).toLocaleString()} ₸\n\nФункция оплаты: скоро!`);
}

function saveCart() {
    localStorage.setItem('cloudPillowCart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('cloudPillowCart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCart();
    }
}

// ===== ПОМОЩНИК ВЫБОРА =====
function getRecommendation() {
    const position = document.querySelector('input[name="position"]:checked');
    const firmness = document.querySelector('input[name="firmness"]:checked');
    const pain = document.querySelector('input[name="pain"]:checked');
    
    if (!position || !firmness || !pain) {
        alert('Пожалуйста, ответьте на все вопросы');
        return;
    }
    
    let recommendation = '';
    let recommendedCategory = '';
    
    // Логика рекомендации
    if (position.value === 'side') {
        recommendedCategory = 'side';
        recommendation = 'Вам идеально подойдет подушка для сна на боку с хорошей поддержкой.';
    } else if (position.value === 'back') {
        recommendedCategory = 'back';
        recommendation = 'Рекомендуем подушку для спины со средней высотой.';
    } else {
        recommendedCategory = 'down';
        recommendation = 'Мягкая пуховая подушка будет комфортной для вас.';
    }
    
    // Уточнение по упругости
    if (pain.value === 'yes') {
        recommendation += ' Обратите внимание на ортопедические подушки из Memory Foam!';
        recommendedCategory = 'orthopedic';
    }
    
    const result = document.getElementById('helperResult');
    result.style.display = 'block';
    result.innerHTML = `
        <div style="text-align: center;">
            <h3 style="margin-bottom: 12px;">✨ Ваша рекомендация:</h3>
            <p style="font-size: 16px; margin-bottom: 16px;">${recommendation}</p>
            <button class="btn btn-primary" onclick="scrollToCategory('${recommendedCategory}')">Посмотреть товары</button>
        </div>
    `;
}

function scrollToCategory(category) {
    document.getElementById('categoryFilter').value = category;
    filterProducts();
    scrollToSelector('#catalog');
    document.querySelector('.catalog').scrollIntoView({ behavior: 'smooth' });
}

// ===== FAQ =====
function toggleFaq(element) {
    const item = element.parentElement;
    const answer = item.querySelector('.faq__answer');
    
    // Закрываем все остальные
    document.querySelectorAll('.faq__item').forEach(el => {
        if (el !== item) {
            el.querySelector('.faq__question').classList.remove('active');
            el.querySelector('.faq__answer').classList.remove('active');
        }
    });
    
    // Переключаем текущий
    element.classList.toggle('active');
    answer.classList.toggle('active');
}

// ===== КОНТАКТЫ =====
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    console.log('Сообщение отправлено:', { name, email, message });
    showNotification('Спасибо! Мы скоро свяжемся с вами.');
    form.reset();
}

// ===== ПРОМОКОД =====
function copyPromoCode() {
    const code = document.getElementById('promoCode');
    navigator.clipboard.writeText(code.value);
    showNotification('Промокод скопирован в буфер обмена!');
}

// ===== УТИЛИТЫ =====
function scrollToSelector(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #d4a574;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(44, 44, 44, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== АНИМАЦИЯ =====
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

// ===== ПОИСК ТОВАРОВ =====
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            const query = e.target.value.toLowerCase();
            const filtered = products.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );
            renderProducts(filtered);
        });
    }
});