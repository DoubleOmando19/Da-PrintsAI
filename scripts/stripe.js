/**
 * Stripe Payment Integration Module
 * 
 * This module provides integration between the Amazon cart system and Stripe payment processing.
 * It handles initializing the Stripe API, creating checkout sessions, and processing payments.
 * 
 * Version: 1.0.0
 * Last Updated: 2025-06-04
 */

import { cartEvents, calculateCartTotal, getCartItems, getFormattedCartTotal } from './amazon.js';

// Stripe instance that will be initialized
let stripeInstance = null;

/**
 * Initialize the Stripe API with the provided publishable key
 * @param {string} apiKey - Stripe publishable API key
 * @returns {Object} The initialized Stripe instance
 */
export function initializeStripe(apiKey) {
  try {
    if (!apiKey) {
      throw new Error('Stripe API key is required');
    }

    // Initialize Stripe with the provided API key
    stripeInstance = Stripe(apiKey);
    console.log('Stripe initialized successfully');

    // Set up event listeners for Stripe checkout buttons
    setupStripeCheckoutButtons();

    return stripeInstance;
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
    displayErrorMessage('Payment system initialization failed. Please try again later.');
    return null;
  }
}

/**
 * Create a checkout session with the Stripe API
 * @param {number} cartTotal - Total amount to charge in cents
 * @param {Array} cartItems - Array of items in the cart
 * @returns {Promise<Object>} Promise resolving to the created session
 */
export async function createCheckoutSession(cartTotal, cartItems) {
  try {
    if (!stripeInstance) {
      throw new Error('Stripe has not been initialized. Call initializeStripe() first.');
    }

    if (!cartTotal || cartTotal <= 0) {
      throw new Error('Cart total must be greater than 0');
    }

    // Convert cart items to Stripe line items format
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: item.priceCents,
      },
      quantity: item.quantity,
    }));

    // Make API request to your backend to create a checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lineItems,
        successUrl: `${window.location.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cart.html`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    displayErrorMessage('Unable to process payment. Please try again later.');
    throw error;
  }
}

/**
 * Redirect the customer to the Stripe checkout page
 * @param {string} sessionId - ID of the created checkout session
 * @returns {Promise<void>}
 */
export async function redirectToCheckout(sessionId) {
  try {
    if (!stripeInstance) {
      throw new Error('Stripe has not been initialized');
    }

    if (!sessionId) {
      throw new Error('Session ID is required');
    }

    const { error } = await stripeInstance.redirectToCheckout({
      sessionId,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    displayErrorMessage('Unable to redirect to payment page. Please try again.');
    throw error;
  }
}

/**
 * Handle successful payment
 * @param {string} sessionId - ID of the completed checkout session
 * @returns {Promise<void>}
 */
export async function handlePaymentSuccess(sessionId) {
  try {
    // Verify the payment was successful with your backend
    const response = await fetch(`/api/verify-payment/${sessionId}`);

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    const paymentData = await response.json();

    // Clear the cart after successful payment
    clearCart();

    // Display success message to the user
    displaySuccessMessage('Payment successful! Your order has been placed.');

    // You might want to redirect to an order confirmation page
    setTimeout(() => {
      window.location.href = '/order-confirmation.html?order_id=' + paymentData.orderId;
    }, 2000);

    return paymentData;
  } catch (error) {
    console.error('Error handling payment success:', error);
    displayErrorMessage('Payment verification failed. Please contact customer support.');
    throw error;
  }
}

/**
 * Handle payment failure
 * @param {Object} error - Error object from Stripe
 */
export function handlePaymentFailure(error) {
  console.error('Payment failed:', error);

  // Display appropriate error message based on the error type
  let errorMessage = 'Payment failed. Please try again.';

  if (error.type === 'card_error') {
    errorMessage = error.message || 'Your card was declined.';
  } else if (error.type === 'validation_error') {
    errorMessage = 'Please check your payment details and try again.';
  }

  displayErrorMessage(errorMessage);
}

/**
 * Set up event listeners for Stripe checkout buttons
 */
function setupStripeCheckoutButtons() {
  document.querySelectorAll('.js-stripe-checkout').forEach(button => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();

      try {
        // Show loading indicator
        displayLoadingIndicator(true);

        // Get cart total and items
        const cartTotal = calculateCartTotal();
        const cartItems = getCartItems();

        if (cartTotal <= 0 || cartItems.length === 0) {
          displayErrorMessage('Your cart is empty. Please add items before checkout.');
          return;
        }

        // Create checkout session
        const session = await createCheckoutSession(cartTotal, cartItems);

        // Redirect to Stripe checkout
        await redirectToCheckout(session.id);
      } catch (error) {
        handlePaymentFailure(error);
      } finally {
        // Hide loading indicator
        displayLoadingIndicator(false);
      }
    });
  });

  // Listen for cart updates to update payment buttons if needed
  cartEvents.on('cart-updated', (data) => {
    updateStripeCheckoutButtons(data.cartTotal);
  });
}

/**
 * Update Stripe checkout buttons based on cart total
 * @param {number} cartTotal - Total amount in cart in cents
 */
function updateStripeCheckoutButtons(cartTotal) {
  const buttons = document.querySelectorAll('.js-stripe-checkout');

  buttons.forEach(button => {
    if (cartTotal <= 0) {
      button.classList.add('disabled');
      button.setAttribute('aria-disabled', 'true');
      button.textContent = 'Checkout (Cart Empty)';
    } else {
      button.classList.remove('disabled');
      button.setAttribute('aria-disabled', 'false');
      button.textContent = `Checkout ($${(cartTotal / 100).toFixed(2)})`;
    }
  });
}

/**
 * Clear the cart after successful payment
 */
function clearCart() {
  // This function would interact with your cart module to clear the cart
  // Implementation depends on how your cart is managed
  console.log('Cart cleared after successful payment');

  // If there's a global cart reset function, call it here
  if (typeof resetCart === 'function') {
    resetCart();
  }

  // Emit cart updated event
  cartEvents.emit('cart-updated', {
    cartItems: [],
    cartTotal: 0
  });
}

/**
 * Display an error message to the user
 * @param {string} message - Error message to display
 */
function displayErrorMessage(message) {
  // Implementation depends on your UI
  console.error(message);

  // Example implementation - create or update an error message element
  let errorElement = document.querySelector('.stripe-error-message');

  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'stripe-error-message error-message';
    document.body.appendChild(errorElement);
  }

  errorElement.textContent = message;
  errorElement.style.display = 'block';

  // Hide the message after 5 seconds
  setTimeout(() => {
    errorElement.style.display = 'none';
  }, 5000);
}

/**
 * Display a success message to the user
 * @param {string} message - Success message to display
 */
function displaySuccessMessage(message) {
  // Implementation depends on your UI
  console.log(message);

  // Example implementation - create or update a success message element
  let successElement = document.querySelector('.stripe-success-message');

  if (!successElement) {
    successElement = document.createElement('div');
    successElement.className = 'stripe-success-message success-message';
    document.body.appendChild(successElement);
  }

  successElement.textContent = message;
  successElement.style.display = 'block';

  // Hide the message after 5 seconds
  setTimeout(() => {
    successElement.style.display = 'none';
  }, 5000);
}

/**
 * Display or hide a loading indicator
 * @param {boolean} isLoading - Whether to show or hide the loading indicator
 */
function displayLoadingIndicator(isLoading) {
  // Implementation depends on your UI
  let loadingElement = document.querySelector('.stripe-loading-indicator');

  if (!loadingElement && isLoading) {
    loadingElement = document.createElement('div');
    loadingElement.className = 'stripe-loading-indicator loading-indicator';
    loadingElement.textContent = 'Processing payment...';
    document.body.appendChild(loadingElement);
  }

  if (loadingElement) {
    loadingElement.style.display = isLoading ? 'block' : 'none';
  }
}

// Export all functions for use in other modules
export {
  stripeInstance,
  setupStripeCheckoutButtons,
  updateStripeCheckoutButtons,
  displayErrorMessage,
  displaySuccessMessage,
  displayLoadingIndicator
};