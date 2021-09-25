import React, { useState, useContext } from 'react';
import CartItem from './CartItem';
import PizzaContext from '../Context/PizzaContext';

export default function Cart() {
  const {cart, setCart, cartTotal} = useContext(PizzaContext);
  const [orderId, setOrderId] = useState(null);

  const cartItems = cart.pizzas.map((item, index)=>{
    return <CartItem pizza={item} count={index}/>
  })
  
  const placeOrder = () => {
    console.log(cart);
    async function createOrder(){
      const fetchedData = await(await fetch("http://localhost:5000/orders",{
        method: "POST",
        headers: {"Content-Type": "application/json", "Origin": "http://localhost:3000"},
        body: JSON.stringify(cart)}
      )).json();
      setOrderId(fetchedData._id);
    };
    createOrder();
    setCart({pizzas:[]});
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Cart:</h2>
      </div>
      {cart.pizzas.length === 0 ? <h3 className="nothing-inside">You have no pizzas in your cart yet.</h3> :cartItems}
      <div className="cart-footer">
        <div className="cart-footer-inner">
          <h2>Total: {cartTotal === 0 ? "0.00" : Math.round((cartTotal + Number.EPSILON) * 100) / 100} €</h2>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      </div>
    </div>
  )
}
