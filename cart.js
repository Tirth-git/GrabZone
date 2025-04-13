document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((item, index) => {
      totalPrice += item.price * item.quantity;

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
          cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
      });
    });

    document.querySelectorAll(".remove").forEach(button => {
      button.addEventListener("click", (event) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let index = event.target.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
      });
    });
  }

  loadCart();
});

// Checkout popup functions
function showCheckoutPopup() {
  const form = document.getElementById('checkoutForm');
  form.reset();
  document.getElementById('checkoutPopup').style.display = 'flex';
}

function closeCheckoutPopup() {
  document.getElementById('checkoutPopup').style.display = 'none';
}

document.getElementById('checkoutForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const payment = document.getElementById('payment').value;

  if (!payment) {
    alert("Please fill in all details.");
    return;
  }

  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  document.getElementById("cart-items").innerHTML = "";
  document.getElementById("cart-total").textContent = "0";

  closeCheckoutPopup();
});
