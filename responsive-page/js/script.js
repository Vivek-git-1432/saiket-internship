// ==============================
// DOM Content Loaded
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });

  initScrollToTop();
  initNavbarScroll();
  initActiveNavigation();
  initFadeInAnimations();
  initSmoothScroll();
  initTypingAnimation();
  initCounterAnimation();
  initCartFunctionality();
  initQuickView();
});

// ==============================
// Scroll to Top Button
// ==============================
function initScrollToTop() {
  // Create scroll-to-top button
  const scrollBtn = document.createElement("button");
  scrollBtn.className = "scroll-to-top";
  scrollBtn.innerHTML = "↑";
  scrollBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollBtn);

  // Show/hide button on scroll
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  // Scroll to top on click
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ==============================
// Navbar Scroll Effect
// ==============================
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// ==============================
// Active Navigation Highlighting
// ==============================
function initActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// ==============================
// Fade-in Animations on Scroll
// ==============================
function initFadeInAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and highlight boxes
  const cards = document.querySelectorAll(".card");
  const highlights = document.querySelectorAll("#about .border");
  
  cards.forEach((card) => {
    observer.observe(card);
  });
  
  highlights.forEach((highlight) => {
    observer.observe(highlight);
  });
}

// ==============================
// Smooth Scroll for Navigation Links
// ==============================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        }
      }
    });
  });
}

// ==============================
// Newsletter Email Validation
// ==============================
document.getElementById("subscribeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const emailValue = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Remove previous error styling
  emailInput.classList.remove("is-invalid");

  if (emailValue === "") {
    showNotification("Please enter your email address!", "error");
    emailInput.classList.add("is-invalid");
    emailInput.focus();
    return;
  }

  if (!emailPattern.test(emailValue)) {
    showNotification("Please enter a valid email address!", "error");
    emailInput.classList.add("is-invalid");
    emailInput.focus();
    return;
  }

  // Success
  showNotification("🎉 Thank you for subscribing! We'll keep you updated.", "success");
  this.reset();
  emailInput.classList.remove("is-invalid");
});

// ==============================
// Notification System
// ==============================
function showNotification(message, type = "success") {
  // Remove existing notifications
  const existing = document.querySelector(".notification");
  if (existing) {
    existing.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px 25px",
    borderRadius: "10px",
    color: "white",
    fontWeight: "600",
    zIndex: "10000",
    boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
    animation: "slideInRight 0.3s ease",
    maxWidth: "350px",
    background: type === "success" 
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  });

  document.body.appendChild(notification);

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// Add notification animations to CSS dynamically
const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  .is-invalid {
    border-color: #f5576c !important;
    box-shadow: 0 0 10px rgba(245, 87, 108, 0.3) !important;
  }
`;
document.head.appendChild(style);

// ==============================
// Typing Animation
// ==============================
function initTypingAnimation() {
  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  const text = typingElement.textContent;
  typingElement.textContent = "";
  typingElement.style.borderRight = "3px solid white";
  
  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => {
        typingElement.style.borderRight = "none";
      }, 500);
    }
  }, 100);
}

// ==============================
// Counter Animation
// ==============================
function initCounterAnimation() {
  const counters = document.querySelectorAll(".counter");
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    // Start animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  };

  counters.forEach(animateCounter);
}

// ==============================
// Shopping Cart Functionality
// ==============================
let cart = [];
let cartTotal = 0;

function initCartFunctionality() {
  const cartBtn = document.getElementById("cartBtn");
  const closeCartBtn = document.getElementById("closeCart");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartSidebar = document.getElementById("cartSidebar");

  // Open cart
  cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close cart
  closeCartBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      const productName = this.getAttribute("data-product");
      const productPrice = parseFloat(this.getAttribute("data-price"));
      
      addToCart(productName, productPrice, this);
    });
  });

  // Checkout button
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length > 0) {
        showNotification("🚀 Redirecting to checkout...", "success");
        setTimeout(() => {
          showNotification("Thank you for your purchase! (Demo)", "success");
        }, 1500);
      } else {
        showNotification("Your cart is empty!", "error");
      }
    });
  }
}

function addToCart(productName, price, button) {
  // Add ripple effect
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = (rect.left + rect.width / 2) - rect.left - size / 2;
  const y = (rect.top + rect.height / 2) - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    left: ${x}px;
    top: ${y}px;
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  `;
  
  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);

  // Add product to cart
  cart.push({ name: productName, price: price });
  cartTotal += price;
  
  updateCartUI();
  showNotification(`🛒 ${productName} added to cart!`, "success");
  
  // Button animation
  button.style.transform = "scale(0.95)";
  setTimeout(() => {
    button.style.transform = "";
  }, 150);
}

function updateCartUI() {
  const cartBadge = document.getElementById("cartBadge");
  const cartItems = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");

  // Update badge
  cartBadge.textContent = cart.length;
  cartBadge.style.display = cart.length > 0 ? "block" : "none";

  // Update cart items
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty text-center py-5">
        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
        <p class="text-muted">Your cart is empty</p>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <img src="assets/product${(index % 4) + 1}.jpg" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `).join("");
  }

  // Update total
  cartTotalElement.textContent = `₹${cartTotal.toFixed(2)}`;
}

function removeFromCart(index) {
  cartTotal -= cart[index].price;
  cart.splice(index, 1);
  updateCartUI();
  showNotification("Item removed from cart", "success");
}

function closeCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Make removeFromCart globally accessible
window.removeFromCart = removeFromCart;

// ==============================
// Quick View Functionality
// ==============================
function initQuickView() {
  const quickViewButtons = document.querySelectorAll(".quick-view-btn");
  quickViewButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      e.stopPropagation();
      const productId = this.getAttribute("data-product");
      showQuickView(productId);
    });
  });
}

function showQuickView(productId) {
  const products = {
    1: { name: "Stylish Sneakers", price: "₹899.99", rating: 4.5 },
    2: { name: "Casual Backpack", price: "₹779.99", rating: 5.0 },
    3: { name: "Classic Watch", price: "₹1090.99", rating: 4.0 },
    4: { name: "Smart Headphones", price: "₹1058.99", rating: 4.8 }
  };

  const product = products[productId];
  if (product) {
    showNotification(`👁️ Quick View: ${product.name} - ${product.price} ⭐ ${product.rating}`, "success");
  }
}

// Add ripple animation
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);
