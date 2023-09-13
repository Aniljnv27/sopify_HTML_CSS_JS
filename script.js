document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cart-icon");
    const cart = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const chocolateItems = document.querySelectorAll(".chocolate-item");
    const modal = document.getElementById("chocolateModal");
    const modalImage = document.getElementById("modal-image");
    const modalName = document.getElementById("modal-name");
    const modalPrice = document.getElementById("modal-price");
    const closeButton = document.querySelector(".close-button");

    let total = 0;
    let itemCount = 0;
    let isCartVisible = false;

    // Function to toggle the cart
    function toggleCart() {
        isCartVisible = !isCartVisible;
        cart.classList.toggle("show-cart", isCartVisible);
    }

    // Event listener for the cart icon
    cartIcon.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent the click event from propagating to the document body
        toggleCart();
    });

    // Event listener for the document body to hide the cart when clicking outside
    document.body.addEventListener("click", function () {
        if (isCartVisible) {
            toggleCart();
        }
    });

    // Prevent clicks inside the cart from closing it
    cart.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent clicks inside the cart from propagating to the document body
    });

    // Event listener for chocolate items to show image details on image click
    chocolateItems.forEach(function (item) {
        item.addEventListener("click", function (e) {
            const chocolateName = item.querySelector("h2").textContent;
            const chocolatePrice = parseFloat(item.querySelector(".price").textContent.replace("₹", ""));

            // Check if the click event target is the "Add" button
            if (e.target.classList.contains("add-button")) {
                // This is the "Add" button, so do nothing here
                return;
            }

            // Set modal content
            modalName.textContent = chocolateName;
            modalPrice.textContent = `₹${chocolatePrice.toFixed(2)}`;
            modalImage.src = item.querySelector("img").src;

            // Show the modal
            modal.style.display = "block";
        });
    });

    // Event listener for closing the modal
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Event listener for "Add" buttons to add chocolates to the cart
    const addButtons = document.querySelectorAll(".add-button");
    addButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const chocolateItem = button.parentElement;
            const chocolateName = chocolateItem.querySelector("h2").textContent;
            const chocolatePrice = parseFloat(chocolateItem.querySelector(".price").textContent.replace("₹", ""));

            if (itemCount < 8) {
                const selectedChocolate = document.createElement("li");
                selectedChocolate.innerHTML = `
                    <span>${chocolateName}</span>
                    <span class="price">₹${chocolatePrice.toFixed(2)}</span>
                    <button class="remove-button">Remove</button>
                `;
                cartItems.appendChild(selectedChocolate);

                total += chocolatePrice;
                total = parseFloat(total.toFixed(2)); // Round to 2 decimal places
                cartTotal.textContent = `₹${total.toFixed(2)}`;
                itemCount++;
                cartCount.textContent = itemCount;
            } else {
                alert("You have already added the maximum limit of chocolates (8 items).");
            }
        });
    });

    // Event listener for "Remove" buttons to remove chocolates from the cart
    cartItems.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-button")) {
            const itemToRemove = e.target.parentElement;
            const itemPrice = parseFloat(itemToRemove.querySelector(".price").textContent.replace("₹", ""));
            
            // Update the total and item count
            total -= itemPrice;
            total = parseFloat(total.toFixed(2));
            itemCount--;
            
            // Update the cart
            cartItems.removeChild(itemToRemove);
            cartTotal.textContent = `₹${total.toFixed(2)}`;
            cartCount.textContent = itemCount;
        }
    });
});
