// ==============================
// MOBILE NAVIGATION
// ==============================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("show")) {
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
    }
});

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("show");
        const icon = menuToggle.querySelector("i");
        icon.classList.replace("fa-xmark", "fa-bars");
    });
});

// ==============================
// PRODUCT FILTERS
// ==============================
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        const selectedCategory = button.dataset.filter;

        productCards.forEach(function (card) {
            if (selectedCategory === "all" || card.dataset.category === selectedCategory) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

// ==============================
// SHOPPING CART (LOCAL DEMO)
// ==============================
let cart = JSON.parse(localStorage.getItem("electroHubCart")) || [];
const cartCount = document.querySelector(".cart-count");

function updateCartCount() {
    let totalItems = 0;

    cart.forEach(function (product) {
        totalItems += product.quantity;
    });

    cartCount.textContent = totalItems;
    localStorage.setItem("electroHubCart", JSON.stringify(cart));
}

function addToCart(name, price) {
    const existingProduct = cart.find(function (product) {
        return product.name === name;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    updateCartCount();
    alert(name + " added to your cart!");
}

const quickAddButtons = document.querySelectorAll(".quick-add");

quickAddButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const productName = button.dataset.name;
        const productPrice = Number(button.dataset.price);
        addToCart(productName, productPrice);
    });
});

updateCartCount();

// ==============================
// WISHLIST (VISUAL DEMO)
// ==============================
const wishlistButtons = document.querySelectorAll(".wishlist-btn");

wishlistButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        button.classList.toggle("liked");
        const icon = button.querySelector("i");

        if (button.classList.contains("liked")) {
            icon.classList.replace("fa-regular", "fa-solid");
        } else {
            icon.classList.replace("fa-solid", "fa-regular");
        }
    });
});

// ==============================
// NEWSLETTER (FRONT-END DEMO)
// ==============================
const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you for subscribing to ElectroHub!");
    newsletterForm.reset();
});

// ==============================
// BASIC PRODUCT SEARCH
// ==============================
const searchButton = document.querySelector(".search-btn");

searchButton.addEventListener("click", function () {
    const searchTerm = prompt("What are you looking for?");
    if (!searchTerm) return;

    const normalizedTerm = searchTerm.toLowerCase().trim();
    let foundProducts = 0;

    productCards.forEach(function (card) {
        const productName = card.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(normalizedTerm)) {
            card.classList.remove("hidden");
            foundProducts++;
        } else {
            card.classList.add("hidden");
        }
    });

    filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
    });

    document.querySelector('[data-filter="all"]').classList.add("active");

    document.getElementById("products").scrollIntoView({ behavior: "smooth" });

    if (foundProducts === 0) {
        alert("No products found!");
    }
});
