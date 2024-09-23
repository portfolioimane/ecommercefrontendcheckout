import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import { FaCreditCard, FaPaypal, FaTruck } from 'react-icons/fa';  // Icons from React Icons

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items || []);
  const guestItems = useSelector(state => state.cart.guestItems || []);
  const isLoggedIn = useSelector(state => !!state.auth.token);

  const itemsToDisplay = isLoggedIn ? cartItems : guestItems;
  const totalPrice = itemsToDisplay.reduce((total, item) => total + (Number(item.price) * item.quantity), 0).toFixed(2);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Order placed! Total Price:", totalPrice);
    navigate('/thank-you');
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        {/* Cart Summary */}


        {/* Billing and Payment Form */}
        <div className="checkout-form">
          <h3>Billing Information</h3>
          <form onSubmit={handleSubmit}>
            {['name', 'email', 'phone', 'address'].map((field) => (
              <div className="form-group" key={field}>
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input type={field === 'email' ? 'email' : 'text'} id={field} required />
              </div>
            ))}

            {/* Payment Method with Icons */}
            <h4>Payment Method</h4>
            <div className="payment-methods">
              <div className="payment-option">
                <input type="radio" id="credit-card" name="payment" value="credit-card" required />
                <label htmlFor="credit-card">
                  <FaCreditCard className="payment-icon" /> Credit Card
                </label>
              </div>
              <div className="payment-option">
                <input type="radio" id="paypal" name="payment" value="paypal" required />
                <label htmlFor="paypal">
                  <FaPaypal className="payment-icon" /> PayPal
                </label>
              </div>
              <div className="payment-option">
                <input type="radio" id="cash-on-delivery" name="payment" value="cash-on-delivery" required />
                <label htmlFor="cash-on-delivery">
                  <FaTruck className="payment-icon" /> Cash on Delivery
                </label>
              </div>
            </div>



            <button type="submit" className="order-button">Place Order</button>
          </form>
        </div>

                <div className="cart-summary">
          <h3>Cart Summary</h3>
          <ul>
            {itemsToDisplay.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={isLoggedIn ? item.product.name : item.name} className="item-image" />
                <div className="item-details">
                  <p className="item-name">{isLoggedIn ? item.product.name : item.name}</p>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                  <p className="item-price">{Number(item.price).toFixed(2)} MAD</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-price">
            <h4>Total: {totalPrice} MAD</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
