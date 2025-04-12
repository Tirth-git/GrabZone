document.addEventListener("DOMContentLoaded", () => {
    const cartIcons = document.querySelectorAll(".cart-icon");

    cartIcons.forEach(icon => {
        icon.addEventListener("click", (event) => {
            const name = event.target.getAttribute("data-name");
            const price = event.target.getAttribute("data-price");
            const img = event.target.getAttribute("data-img");
            const shoe = {
                name: name,
                price: price,
                img: img,
                quantity: 1 
            };
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(shoe);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
         alert(`${name} added to cart!`);
        });
    });
});
