// ==================== 
// MENU DATA
// ====================

const menuData = [
    // Appetizers
    {
        id: 1,
        name: "Chicken Wings",
        category: "appetizers",
        price: 8.99,
        description: "Crispy chicken wings with sauce",
        calories: 320,
        emoji: "🍗"
    },
    {
        id: 2,
        name: "Garlic Bread",
        category: "appetizers",
        price: 4.99,
        description: "Toasted bread with garlic and butter",
        calories: 280,
        emoji: "🥖"
    },
    {
        id: 3,
        name: "Cheese Dip",
        category: "appetizers",
        price: 5.99,
        description: "Creamy cheese dip with tortilla chips",
        calories: 350,
        emoji: "🧀"
    },
    
    // Main Courses
    {
        id: 4,
        name: "Burger",
        category: "main",
        price: 12.99,
        description: "Juicy beef burger with lettuce and tomato",
        calories: 520,
        emoji: "🍔"
    },
    {
        id: 5,
        name: "Pizza",
        category: "main",
        price: 14.99,
        description: "Pepperoni pizza with mozzarella cheese",
        calories: 680,
        emoji: "🍕"
    },
    {
        id: 6,
        name: "Pasta Carbonara",
        category: "main",
        price: 13.99,
        description: "Creamy pasta with bacon and parmesan",
        calories: 620,
        emoji: "🍝"
    },
    {
        id: 7,
        name: "Grilled Salmon",
        category: "main",
        price: 16.99,
        description: "Fresh salmon fillet with lemon butter",
        calories: 450,
        emoji: "🐟"
    },
    {
        id: 8,
        name: "Chicken Steak",
        category: "main",
        price: 15.99,
        description: "Tender chicken breast with herbs",
        calories: 380,
        emoji: "🍗"
    },
    
    // Sides
    {
        id: 9,
        name: "French Fries",
        category: "sides",
        price: 4.99,
        description: "Crispy golden french fries",
        calories: 420,
        emoji: "🍟"
    },
    {
        id: 10,
        name: "Caesar Salad",
        category: "sides",
        price: 6.99,
        description: "Fresh romaine lettuce with caesar dressing",
        calories: 280,
        emoji: "🥗"
    },
    {
        id: 11,
        name: "Onion Rings",
        category: "sides",
        price: 5.99,
        description: "Crispy fried onion rings",
        calories: 380,
        emoji: "🧅"
    },
    
    // Desserts
    {
        id: 12,
        name: "Chocolate Cake",
        category: "desserts",
        price: 5.99,
        description: "Rich and moist chocolate cake",
        calories: 450,
        emoji: "🍰"
    },
    {
        id: 13,
        name: "Ice Cream",
        category: "desserts",
        price: 4.99,
        description: "Vanilla ice cream with toppings",
        calories: 320,
        emoji: "🍦"
    },
    {
        id: 14,
        name: "Cheesecake",
        category: "desserts",
        price: 6.99,
        description: "Creamy New York style cheesecake",
        calories: 520,
        emoji: "🍪"
    },
    
    // Beverages
    {
        id: 15,
        name: "Coca Cola",
        category: "beverages",
        price: 2.99,
        description: "Classic cola drink",
        calories: 140,
        emoji: "🥤"
    },
    {
        id: 16,
        name: "Iced Tea",
        category: "beverages",
        price: 2.49,
        description: "Refreshing iced tea",
        calories: 0,
        emoji: "🧋"
    },
    {
        id: 17,
        name: "Orange Juice",
        category: "beverages",
        price: 3.99,
        description: "Fresh squeezed orange juice",
        calories: 110,
        emoji: "🧃"
    }
];

// ==================== 
// LOCAL STORAGE FUNCTIONS
// ====================

function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function setCurrentUser(user) {
    if (user) {
        localStorage.setItem('currentUser', user);
    } else {
        localStorage.removeItem('currentUser');
    }
}

function getUserData(email) {
    const users = getUsers();
    return users.find(u => u.email === email);
}

// ==================== 
// MENU FUNCTIONS
// ====================

function displayMenu(category = 'all') {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    
    const items = category === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === category);
    
    items.forEach(item => {
        const html = `
            <div class="menu-item" onclick="openItemModal(${item.id})">
                <div class="menu-item-image">${item.emoji}</div>
                <div class="menu-item-content">
                    <div class="menu-item-name">${item.name}</div>
                    <div class="menu-item-description">${item.description}</div>
                    <div class="menu-item-footer">
                        <span class="menu-item-price">₦${item.price.toFixed(2)}</span>
                        <button class="menu-item-btn" onclick="event.stopPropagation(); addToCart(${item.id}, 1)">Add</button>
                    </div>
                </div>
            </div>
        `;
        menuGrid.innerHTML += html;
    });
}

function filterMenu(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    displayMenu(category);
}

function openItemModal(itemId) {
    const item = menuData.find(m => m.id === itemId);
    if (!item) return;
    
    document.getElementById('modal-name').textContent = item.name;
    document.getElementById('modal-description').textContent = item.description;
    document.getElementById('modal-price').textContent = item.price.toFixed(2);
    document.getElementById('modal-calories').textContent = item.calories;
    document.getElementById('modal-image').textContent = item.emoji;
    document.getElementById('modal-image').style.fontSize = '100px';
    document.getElementById('modal-image').style.backgroundImage = 'none';
    document.getElementById('quantity').value = 1;
    
    // Store current item ID for add to cart
    document.getElementById('modal-name').dataset.itemId = itemId;
    
    const modal = document.getElementById('item-modal');
    modal.classList.add('active');
}

function closeItemModal() {
    document.getElementById('item-modal').classList.remove('active');
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('item-modal');
    if (event.target === modal) {
        modal.classList.remove('active');
    }
});

// ==================== 
// CART FUNCTIONS
// ====================

function addToCart(itemId, quantity = null) {
    const item = menuData.find(m => m.id === itemId);
    if (!item) return;
    
    // If quantity is null, get from modal input
    if (quantity === null) {
        const quantityInput = document.getElementById('quantity');
        if (quantityInput) {
            quantity = parseInt(quantityInput.value) || 1;
        } else {
            quantity = 1;
        }
    }
    
    let cart = getCart();
    const existingItem = cart.find(c => c.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: itemId,
            name: item.name,
            price: item.price,
            quantity: quantity,
            emoji: item.emoji
        });
    }
    
    saveCart(cart);
    updateCartCount();
    closeItemModal();
    showNotification(`${item.name} added to cart!`);
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('#cart-count');
    badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    });
}

function displayCart() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p><a href="menu.html" class="btn btn-primary">Continue Shopping</a></div>';
        return;
    }
    
    container.innerHTML = '';
    
    cart.forEach(item => {
        const html = `
            <div class="cart-item">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₦${item.price.toFixed(2)} each</div>
                    <div class="cart-item-actions">
                        <button onclick="updateCartItem(${item.id}, -1)">-</button>
                        <span style="padding: 4px 8px; background-color: #f0f0f0; border-radius: 3px;">${item.quantity}</span>
                        <button onclick="updateCartItem(${item.id}, 1)">+</button>
                        <button onclick="removeFromCart(${item.id})" style="background-color: #ffcccc; color: #c00;">Remove</button>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: bold; color: var(--primary-color);">₦${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

function updateCartItem(itemId, change) {
    let cart = getCart();
    const item = cart.find(c => c.id === itemId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        saveCart(cart);
        updateCartCount();
        displayCart();
        calculateTotals();
    }
}

function removeFromCart(itemId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== itemId);
    saveCart(cart);
    updateCartCount();
    displayCart();
    calculateTotals();
}

function calculateTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const delivery = 5;
    const total = subtotal + tax + delivery;
    
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = '₦' + subtotal.toFixed(2);
    if (taxEl) taxEl.textContent = '₦' + tax.toFixed(2);
    if (totalEl) totalEl.textContent = '₦' + total.toFixed(2);
    
    return { subtotal, tax, delivery, total };
}

function proceedToCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}

// ==================== 
// CHECKOUT FUNCTIONS
// ====================

function displayCheckoutSummary() {
    const cart = getCart();
    const summaryContainer = document.getElementById('summary-items');
    
    if (!summaryContainer) return;
    
    summaryContainer.innerHTML = '';
    
    cart.forEach(item => {
        const html = `
            <div class="summary-item-checkout">
                <span>${item.name} x${item.quantity}</span>
                <span>₦${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
        summaryContainer.innerHTML += html;
    });
    
    updateCheckoutTotals();
}

function updateCheckoutTotals() {
    const { subtotal, tax, delivery, total } = calculateTotals();
    
    const subtotalEl = document.getElementById('summary-subtotal');
    const taxEl = document.getElementById('summary-tax');
    const totalEl = document.getElementById('summary-total');
    
    if (subtotalEl) subtotalEl.textContent = '₦' + subtotal.toFixed(2);
    if (taxEl) taxEl.textContent = '₦' + tax.toFixed(2);
    if (totalEl) totalEl.textContent = '₦' + total.toFixed(2);
}

function processPayment() {
    const fullname = document.getElementById('fullname')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const address = document.getElementById('address')?.value;
    const city = document.getElementById('city')?.value;
    const zip = document.getElementById('zip')?.value;
    
    const cardname = document.getElementById('cardname')?.value;
    const cardnumber = document.getElementById('cardnumber')?.value;
    const expiry = document.getElementById('expiry')?.value;
    const cvv = document.getElementById('cvv')?.value;
    
    // Basic validation
    if (!fullname || !email || !phone || !address || !city || !zip) {
        alert('Please fill in all delivery information');
        return;
    }
    
    if (!cardname || !cardnumber || !expiry || !cvv) {
        alert('Please fill in all payment information');
        return;
    }
    
    // Validate card number (simple check)
    if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(cardnumber.replace(/\s/g, ''))) {
        alert('Invalid card number');
        return;
    }
    
    // Process payment (simulated)
    const { subtotal, tax, delivery, total } = calculateTotals();
    
    const order = {
        id: 'ORD-' + Date.now(),
        date: new Date().toLocaleDateString(),
        customer: fullname,
        email: email,
        phone: phone,
        address: address,
        city: city,
        zip: zip,
        items: getCart(),
        subtotal: subtotal,
        tax: tax,
        delivery: delivery,
        total: total,
        status: 'Confirmed'
    };
    
    // Save order to user profile
    const currentUser = getCurrentUser();
    if (currentUser) {
        let user = getUserData(currentUser);
        if (user) {
            if (!user.orders) user.orders = [];
            user.orders.push(order);
            
            let users = getUsers();
            const userIndex = users.findIndex(u => u.email === currentUser);
            if (userIndex >= 0) {
                users[userIndex] = user;
                saveUsers(users);
            }
        }
    }
    
    // Clear cart
    localStorage.removeItem('cart');
    updateCartCount();
    
    // Show confirmation
    alert(`Order Confirmed!\nOrder ID: ${order.id}\nTotal: ₦${total.toFixed(2)}\n\nThank you for your order!`);
    window.location.href = 'index.html';
}

// ==================== 
// AUTHENTICATION FUNCTIONS
// ====================

function login() {
    const email = document.getElementById('login-email')?.value;
    const password = document.getElementById('login-password')?.value;
    
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        setCurrentUser(email);
        updateAccountUI();
        alert('Login successful!');
    } else {
        alert('Invalid email or password');
    }
}

function register() {
    const name = document.getElementById('register-name')?.value;
    const email = document.getElementById('register-email')?.value;
    const password = document.getElementById('register-password')?.value;
    const confirm = document.getElementById('register-confirm')?.value;
    
    if (!name || !email || !password || !confirm) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    const users = getUsers();
    if (users.find(u => u.email === email)) {
        alert('Email already registered');
        return;
    }
    
    const newUser = {
        name: name,
        email: email,
        password: password,
        created: new Date().toLocaleDateString(),
        orders: [],
        addresses: [],
        preferences: {
            newsletter: true,
            promotions: true
        }
    };
    
    users.push(newUser);
    saveUsers(users);
    
    setCurrentUser(email);
    updateAccountUI();
    alert('Account created successfully!');
}

function logout() {
    setCurrentUser(null);
    updateAccountUI();
    alert('Logged out successfully!');
}

function checkUserLogin() {
    updateAccountUI();
}

function updateAccountUI() {
    const currentUser = getCurrentUser();
    const loginSection = document.getElementById('login-section');
    const profileSection = document.getElementById('profile-section');
    const accountLink = document.getElementById('account-link');
    
    if (currentUser) {
        // User is logged in
        if (loginSection) loginSection.style.display = 'none';
        if (profileSection) {
            profileSection.style.display = 'block';
            const user = getUserData(currentUser);
            if (user) {
                const userNameEl = document.getElementById('user-name');
                const profileEmailEl = document.getElementById('profile-email');
                const profileCreatedEl = document.getElementById('profile-created');
                
                if (userNameEl) userNameEl.textContent = user.name;
                if (profileEmailEl) profileEmailEl.textContent = user.email;
                if (profileCreatedEl) profileCreatedEl.textContent = user.created;
                
                displayOrderHistory(user.orders);
                displaySavedAddresses(user.addresses);
            }
        }
        if (accountLink) accountLink.textContent = 'Account';
    } else {
        // User is not logged in
        if (loginSection) loginSection.style.display = 'block';
        if (profileSection) profileSection.style.display = 'none';
        if (accountLink) accountLink.textContent = 'Login';
    }
}

function switchToRegister() {
    document.getElementById('login-form').parentElement.style.display = 'none';
    document.getElementById('register-form-div').style.display = 'block';
    event.preventDefault();
}

function switchToLogin() {
    document.getElementById('register-form-div').style.display = 'none';
    document.getElementById('login-form').parentElement.style.display = 'block';
    event.preventDefault();
}

function editProfile() {
    alert('Edit profile feature coming soon!');
}

function addAddress() {
    alert('Add address feature coming soon!');
}

function savePreferences() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        let user = getUserData(currentUser);
        if (user) {
            user.preferences = {
                newsletter: document.getElementById('pref-newsletter')?.checked,
                promotions: document.getElementById('pref-promotions')?.checked
            };
            
            let users = getUsers();
            const userIndex = users.findIndex(u => u.email === currentUser);
            if (userIndex >= 0) {
                users[userIndex] = user;
                saveUsers(users);
                alert('Preferences saved!');
            }
        }
    }
}

function displayOrderHistory(orders) {
    const container = document.getElementById('order-history');
    if (!container) return;
    
    if (!orders || orders.length === 0) {
        container.innerHTML = '<p style="color: #999;">No orders yet</p>';
        return;
    }
    
    container.innerHTML = '';
    orders.forEach(order => {
        const html = `
            <div style="padding: 1rem; background-color: #f5f5f5; border-radius: 5px; margin-bottom: 1rem;">
                <div><strong>${order.id}</strong></div>
                <div>Date: ${order.date}</div>
                <div>Total: $${order.total.toFixed(2)}</div>
                <div>Status: ${order.status}</div>
            </div>
        `;
        container.innerHTML += html;
    });
}

function displaySavedAddresses(addresses) {
    const container = document.getElementById('saved-addresses');
    if (!container) return;
    
    if (!addresses || addresses.length === 0) {
        container.innerHTML = '<p style="color: #999;">No saved addresses</p>';
        return;
    }
    
    container.innerHTML = '';
    addresses.forEach((address, index) => {
        const html = `
            <div style="padding: 1rem; background-color: #f5f5f5; border-radius: 5px; margin-bottom: 1rem;">
                <div><strong>${address.name}</strong></div>
                <div>${address.street}</div>
                <div>${address.city}, ${address.zip}</div>
                <button onclick="removeAddress(${index})" class="btn btn-secondary" style="font-size: 0.8rem; padding: 4px 8px;">Remove</button>
            </div>
        `;
        container.innerHTML += html;
    });
}

function removeAddress(index) {
    if (confirm('Remove this address?')) {
        const currentUser = getCurrentUser();
        if (currentUser) {
            let user = getUserData(currentUser);
            if (user && user.addresses) {
                user.addresses.splice(index, 1);
                
                let users = getUsers();
                const userIndex = users.findIndex(u => u.email === currentUser);
                if (userIndex >= 0) {
                    users[userIndex] = user;
                    saveUsers(users);
                    displaySavedAddresses(user.addresses);
                }
            }
        }
    }
}

// ==================== 
// UTILITY FUNCTIONS
// ====================

function showNotification(message) {
    // Simple notification (could be enhanced with a toast library)
    console.log(message);
}

// Initialize app on page load
window.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateAccountUI();
});
