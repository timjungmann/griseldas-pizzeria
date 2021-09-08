import React, { useContext, useState } from 'react';
import CartItem from './CartItem';
import PizzaContext from '../Context/PizzaContext';

export default function Cart() {
  const {cart, pizza} = useContext(PizzaContext);

  const cartItems = pizza.map((item, index)=>{
    return <CartItem pizza={item} count={index}/>
  })

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Cart:</h2>
      </div>
      {cartItems}
      <div className="cart-footer">
        <h2>Total: 999.99 €</h2>
        <button>Order</button>
      </div>
    </div>
  )
}
