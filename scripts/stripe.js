/**
 * stripe.js - Stripe Frontend Helper
 * 
 * Provides Stripe-related utilities for the frontend.
 * The main Stripe Checkout flow is handled in paymentSummary.js,
 * but this module provides additional helper functions.
 */

/**
 * Verify that Stripe.js has been loaded and initialized correctly.
 * @returns {boolean} True if Stripe is available
 */
export function isStripeReady() {
  return typeof stripe !== 'undefined' && stripe !== null;
}

/**
 * Format a cart for Stripe Checkout display.
 * Useful for showing the user what they're about to purchase.
 * @param {Array} cartItems - Array of cart items with product details
 * @returns {Object} Summary of the checkout
 */
export function getCheckoutSummary(cartItems) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCents = cartItems.reduce((sum, item) => sum + (item.priceCents * item.quantity), 0);

  return {
    itemCount: totalItems,
    totalCents: totalCents,
    totalFormatted: `$${(totalCents / 100).toFixed(2)}`,
    items: cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      subtotal: `$${((item.priceCents * item.quantity) / 100).toFixed(2)}`
    }))
  };
}

// Log Stripe readiness on load
if (isStripeReady()) {
  console.log('Stripe.js initialized successfully');
} else {
  console.warn('Stripe.js not yet loaded - make sure the Stripe script tag is included before this module');
}