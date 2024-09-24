import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  console.log(cart); // Log cart items to check their state
  useEffect(() => {
    console.log("Cart items updated:", cart);
  }, [cart]);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      const costNumber = parseFloat(item.cost.replace('$', '')); // Convert to number
      totalAmount += item.quantity * costNumber; // Use costNumber
    });
    return totalAmount;
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    console.log("Removing item:", item.name);
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const costNumber = parseFloat(item.cost.replace('$', '')); // Convert to number for calculation
    return item.quantity * costNumber; // Use costNumber for calculation
  };


  return (
    <div className="cart-page-wrapper">
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <div className="cart-item-cost ps">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <p className="cart-item-quantity-value">{item.quantity}</p>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total links">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete links" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button CS" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="get-started-button1 links" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
    </div>
  );
};

export default CartItem;


