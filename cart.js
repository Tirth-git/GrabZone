document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartContainer.innerHTML = "";

        let totalPrice = 0;

        cart.forEach((item, index) => {
            totalPrice += item.price * item.quantity;

            // Create cart item element
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" width="100">
                <div class="cart-details">
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p>
                    <div class="quantity">
                        <button class="decrease" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-index="${index}">+</button>
                    </div>
                    <button class="remove" data-index="${index}">Remove</button>
                </div>
            `;

            cartContainer.appendChild(cartItem);
        });

        cartTotal.textContent = totalPrice;

        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", (event) => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                let index = event.target.getAttribute("data-index");
                cart[index].quantity += 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                loadCart();
            });
        });

        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", (event) => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                let index = event.target.getAttribute("data-index");
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1); // Remove if quantity is 1
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                loadCart();
            });
        });

        document.querySelectorAll(".remove").forEach(button => {
            button.addEventListener("click", (event) => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                let index = event.target.getAttribute("data-index");
                cart.splice(index, 1); // Remove item
                localStorage.setItem("cart", JSON.stringify(cart));
                loadCart();
            });
        });

        clearCartBtn.addEventListener("click", () => {
            localStorage.removeItem("cart");
            loadCart();
        });
    }

    loadCart();
});
