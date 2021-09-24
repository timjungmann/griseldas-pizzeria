import React, { useContext } from 'react';
import CartItem from './CartItem';
import PizzaContext from '../Context/PizzaContext';

export default function Cart() {
  const {cart, cartTotal} = useContext(PizzaContext);


  console.log("CART LOG:", cart);
  const cartItems = cart.pizzas.map((item, index)=>{
    return <CartItem pizza={item} count={index}/>
  })

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Cart:</h2>
      </div>
      {cart.pizzas.length === 0 ? <h3 className="nothing-inside">You have no pizzas in your cart yet.</h3> :cartItems}
      <div className="cart-footer">
        <div className="cart-footer-inner">
          <h2>Total: {cartTotal === 0 ? "0.00" : Math.round((cartTotal + Number.EPSILON) * 100) / 100} €</h2>
          <button>Order</button>
        </div>
      </div>
    </div>
  )
}
