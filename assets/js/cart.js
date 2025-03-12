document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cart-button');
    const cartPopup = document.getElementById('cart-popup');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartItemCount = cartButton.querySelector('span:last-child');
    let isCartOpen = false;
    let cartItems = [];

    // Load cart items from localStorage
    function loadCartFromStorage() {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            cartItems = JSON.parse(savedCart);
            cartItems.forEach(item => {
                if (!item.quantity) item.quantity = 1;
            });
            cartItemCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            updateCartDisplay();
        }
    }

    // Save cart items to localStorage
    function saveCartToStorage() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Load cart on page load
    loadCartFromStorage();

    // Toggle cart popup
    cartButton.addEventListener('click', function(e) {
        e.stopPropagation();
        isCartOpen = !isCartOpen;
        cartPopup.classList.toggle('hidden');
    });

    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (isCartOpen && !cartPopup.contains(e.target) && e.target !== cartButton) {
            isCartOpen = false;
            cartPopup.classList.add('hidden');
        }
    });

    // Prevent popup from closing when clicking inside it
    cartPopup.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Add to cart functionality
    function initializeAddToCartButtons() {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const courseCard = this.closest('.course-card');
                const courseImage = courseCard.querySelector('.course-image').src;
                const courseTitle = courseCard.querySelector('.course-title').textContent;
                const coursePriceText = courseCard.querySelector('.course-price').textContent;
                const coursePrice = parseInt(coursePriceText); // Extract first number from text

                // Get the image filename only for comparison
                const imageUrl = new URL(courseImage);
                const imagePath = imageUrl.pathname;

                // Check if course is already in cart by comparing image paths
                const isInCart = cartItems.some(item => {
                    const itemUrl = new URL(item.image);
                    return itemUrl.pathname === imagePath;
                });

                if (isInCart) {
                    Swal.fire({
                        title: 'Already in Cart!',
                        text: 'This course is already in your cart',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#3B82F6'
                    });
                    return;
                }

                // Create cart item object
                const cartItem = {
                    image: courseImage,
                    title: courseTitle,
                    price: coursePrice,
                    quantity: 1
                };

                // Add to cart array
                cartItems.push(cartItem);

                // Save to localStorage
                saveCartToStorage();

                // Update cart count
                cartItemCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);

                // Update cart display
                updateCartDisplay();

                // Show success message with SweetAlert2
                Swal.fire({
                    title: 'Added to Cart!',
                    text: 'Course has been added to your cart successfully',
                    icon: 'success',
                    confirmButtonText: 'Continue Shopping',
                    confirmButtonColor: '#3B82F6',
                    showDenyButton: true,
                    denyButtonText: 'View Cart',
                    denyButtonColor: '#6B7280'
                }).then((result) => {
                    if (result.isDenied) {
                        isCartOpen = true;
                        cartPopup.classList.remove('hidden');
                    }
                });
            });
        });
    }

    // Initialize add to cart buttons
    initializeAddToCartButtons();

    function updateCartDisplay() {
        // Clear current display
        cartItemsContainer.innerHTML = '';

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<img src="assets/images/courses/cart image.png" alt="" class="w-[100px]">';
            return;
            
        }
        // Calculate total

        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Update items display
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex items-center gap-4 p-2 border-b';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-semibold text-sm">${item.title}</h4>
                    <p class="text-blue-600 font-semibold">${item.price} EGP</p>
                    <div class="flex items-center justify-around">
                        <button class="decrease-quantity text-red-500 text-2xl font-bold ">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="increase-quantity text-red-500 text-2xl font-bold ">+</button>
                    </div>
                </div>
                <button  class=" text-red-500 hover:text-red-600  p-2 rounded-full" onclick="removeFromCart(${index})">
                    <ion-icon name="trash-outline" class ="text-xl text-red-500" style="color:red;"></ion-icon>
                </button>
            `;
            cartItemsContainer.appendChild(itemElement);

            // Add event listeners for quantity buttons
            itemElement.querySelector('.increase-quantity').addEventListener('click', () => {
                item.quantity++;
                saveCartToStorage();
                updateCartDisplay();
            });

            itemElement.querySelector('.decrease-quantity').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    saveCartToStorage();
                    updateCartDisplay();
                }
            });
        });

        // Update total
        const totalElement = cartPopup.querySelector('.total-price');
        if (totalElement) {
            totalElement.textContent = `${total} EGP`;
        }
    }

    // Function to handle checkout button click
    function handleCheckout() {
        window.location.href = 'checkout.html';
    }

    // Add event listener to checkout button
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', handleCheckout);
    }

    // Add global function to remove items
    window.removeFromCart = function(index) {
        Swal.fire({
            title: 'Remove Course?',
            text: 'Are you sure you want to remove this course from your cart?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it',
            confirmButtonColor: '#EF4444',
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#6B7280'
        }).then((result) => {
            if (result.isConfirmed) {
                cartItems.splice(index, 1);
                // Save to localStorage after removing
                saveCartToStorage();
                cartItemCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
                updateCartDisplay();
                Swal.fire({
                    title: 'Removed!',
                    text: 'Course has been removed from your cart',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3B82F6',
                    timer: 2000,
                    timerProgressBar: true
                });
            }
        });
    };
});
