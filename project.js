document.addEventListener('DOMContentLoaded', () => {
    
    const toggler = document.getElementById('toggler');
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (toggler) toggler.checked = false; 
        });
    });

   
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('dark-mode');
            
            // Icon badalne ke liye (Moon se Sun aur Sun se Moon)
            if (document.body.classList.contains('dark-mode')) {
                themeToggle.classList.remove('fa-moon');
                themeToggle.classList.add('fa-sun');
                themeToggle.style.color = '#f1c40f'; // Sun color yellow
            } else {
                themeToggle.classList.remove('fa-sun');
                themeToggle.classList.add('fa-moon');
                themeToggle.style.color = ''; // Default color
            }
        });
    }

    const heartIcons = document.querySelectorAll('.card .fa-heart');
    
    heartIcons.forEach(heart => {
        heart.addEventListener('click', (e) => {
            e.preventDefault();
            heart.classList.toggle('fa-solid');
            heart.classList.toggle('fa-regular');
            
            if (heart.classList.contains('fa-solid')) {
                heart.style.color = '#e74c3c';
            } else {
                heart.style.color = '';
            }
        });
    });

   
    const cartIcon = document.getElementById('cart-icon');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const addCartButtons = document.querySelectorAll('.card_btn');
    
    let cartArray = [];

    // Cart Open/Close events
    if (cartIcon && cartDrawer && closeCart) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cartDrawer.classList.add('active');
        });

        closeCart.addEventListener('click', () => {
            cartDrawer.classList.remove('active');
        });
    }

    // Add item functionality
    addCartButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const card = button.closest('.card');
            const name = card.querySelector('h3').innerText;
            // String se clean price nikalne ke liye regex logic
            const priceText = card.querySelector('.price').childNodes[0].textContent;
            const price = parseFloat(priceText.replace('$', ''));

            addItemToCart(name, price);
            
            // Automatically open cart to show item added
            cartDrawer.classList.add('active');
        });
    });

    function addItemToCart(name, price) {
        // Pehle se cart mein item hai ya nahi check karein
        const existingItem = cartArray.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartArray.push({ name, price, quantity: 1 });
        }
        updateCartUI();
    }

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        
        if (cartArray.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-message">Your cart is empty 🌸</p>';
            totalPriceElement.innerText = 'Total: $0.00';
            return;
        }

        let totalBill = 0;

        cartArray.forEach(item => {
            const itemCost = item.price * item.quantity;
            totalBill += itemCost;

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name} (x${item.quantity})</h4>
                    <span>$${itemCost.toFixed(2)}</span>
                </div>
                <i class="fas fa-trash remove-item" data-name="${item.name}"></i>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        totalPriceElement.innerText = `Total: $${totalBill.toFixed(2)}`;

        // Remove item logic attachment
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const nameToRemove = btn.getAttribute('data-name');
                cartArray = cartArray.filter(item => item.name !== nameToRemove);
                updateCartUI();
            });
        });
    }
});