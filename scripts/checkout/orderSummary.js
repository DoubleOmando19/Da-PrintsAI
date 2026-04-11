import { cart, removeFromCart, updateDeliveryOption, updateQuantity } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  if (cart.length === 0) {
    cartSummaryHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <p style="font-size: 18px; color: #666;">Your cart is empty.</p>
        <a href="index.html" style="display: inline-block; margin-top: 15px; padding: 10px 25px; background: #f0c14b; color: #111; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Continue Shopping
        </a>
      </div>
    `;
  }

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    if (!matchingProduct) return;

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          ${matchingProduct.name}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              Digital Download
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity
              js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: 
                <select class="js-quantity-select" data-product-id="${matchingProduct.id}" style="padding: 2px 5px; font-size: 14px;">
                  ${[1].map(n =>
      `<option value="${n}" ${n === cartItem.quantity ? 'selected' : ''}>${n}</option>`
    ).join('')}
                </select>
              </span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  // Delete item handlers
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();
        renderPaymentSummary();

        // If cart is now empty, re-render
        if (cart.length === 0) {
          renderOrderSummary();
        }
      });
    });

  // Quantity change handlers - allows updating quantity for each item
  document.querySelectorAll('.js-quantity-select')
    .forEach((select) => {
      select.addEventListener('change', () => {
        const productId = select.dataset.productId;
        const newQuantity = parseInt(select.value);
        updateQuantity(productId, newQuantity);
        renderPaymentSummary();
      });
    });

  // Delivery option handlers
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}
