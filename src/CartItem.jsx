import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => 
      total + item.quantity * parseFloat(item.cost.substring(1)), 0
    ).toFixed(2);
  };

  // Handle Continue Shopping button
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Handle Increment Quantity (Add Item)
  const handleIncrement = (item) => {
    dispatch(addItem(item)); // This will increase the quantity of the item in the cart
  };

  // Handle Decrement Quantity (Update Quantity)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // Remove item if quantity becomes 0
    }
  };

  // Handle Remove Item from Cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for each item
  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost.substring(1))).toFixed(2);
  };

  // Handle Checkout button
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button 
                  className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(item)}
                >-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}
                >+</button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button 
                className="cart-item-delete" 
                onClick={() => handleRemove(item)}
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn">
        <button 
          className="get-started-button" 
          onClick={handleContinueShopping}
        >Continue Shopping</button>
        <br />
        <button 
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
