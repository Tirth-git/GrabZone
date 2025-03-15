document.addEventListener("DOMContentLoaded", () => {
    // Select all cart icons
    const cartIcons = document.querySelectorAll(".cart-icon");

    cartIcons.forEach(icon => {
        icon.addEventListener("click", (event) => {
            // Get shoe details from data attributes
            const name = event.target.getAttribute("data-name");
            const price = event.target.getAttribute("data-price");
            const img = event.target.getAttribute("data-img");

            // Create an object for the shoe
            const shoe = {
                name: name,
                price: price,
                img: img,
                quantity: 1 // Default quantity
            };

            // Get the existing cart from local storage
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Check if the item already exists
            let existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                // If item exists, increase quantity
                existingItem.quantity += 1;
            } else {
                // Otherwise, add new item to cart
                cart.push(shoe);
            }

            // Save updated cart back to local storage
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${name} added to cart!`);
        });
    });
});
