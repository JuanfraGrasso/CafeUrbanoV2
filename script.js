let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    document.getElementById('cart-count').textContent = cart.length;
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    let totalDiscount = 0;
    cart.forEach((item, idx) => {
        const price = parseInt(item.product.price);
        const subtotal = price * item.quantity;
        const li = document.createElement('li');
        li.textContent = `${item.product.name} - $${subtotal} (x${item.quantity})`;
        cartItems.appendChild(li);

        if (item.quantity >= 2 && (item.product.name === "Café Latte" || item.product.name === "Café Espresso" || item.product.name === "Capuccino")) {
            const discountLi = document.createElement('li');
            discountLi.textContent = `Descuento 2x1 ${item.product.name} - -$${price}`;
            discountLi.classList.add('discount-line');
            cartItems.appendChild(discountLi);
            totalDiscount += price;
        }

        if (item.product.name === "Tarta de Frutilla") {
            const discountLi = document.createElement('li');
            discountLi.textContent = `Tarta 80% ${item.product.name} - -$${price * 0.2 * item.quantity}`;
            discountLi.classList.add('discount-line');
            cartItems.appendChild(discountLi);
            totalDiscount += price * 0.2 * item.quantity;
        }
        total += subtotal;
    });
    total -= totalDiscount;
    document.getElementById('cart-total').textContent = total;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    updateCartDisplay();
}

function addToCart(product, quantity) {
    const item = { product, quantity: parseInt(quantity) };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}


function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', updateCartDisplay);