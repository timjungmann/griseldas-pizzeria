import React, { useState, useContext } from 'react';
import CartItem from './CartItem';
import PizzaContext from '../Context/PizzaContext';
import {Link} from "react-router-dom";

export default function Cart() {
  const {cart, setCart, cartTotal} = useContext(PizzaContext);
  const [orderId, setOrderId] = useState(null);

  const cartItems = cart.pizzas.map((item, index)=>{
    return <CartItem pizza={item} count={index}/>
  })
  
  const placeOrder = () => {
    if(cart.pizzas.length>0){
      async function createOrder(){
        const fetchedData = await(await fetch("https://griseldas-pizzeria-api.vercel.app/orders",{
          method: "POST",
          headers: {"Content-Type": "application/json", "Origin": "https://griseldas-pizzeria-client.vercel.app/"},
          body: JSON.stringify(cart)}
        )).json();
        setOrderId(fetchedData._id);
      };
      createOrder();
      setCart({pizzas:[]});
    }
  }

  if(!orderId){
    return (
      <div className="cart-container">
        {cart.pizzas.length > 0 ? <h3>Your Cart:</h3> : null}
        {cart.pizzas.length === 0 ? <p className="nothing-inside big-text">You have no pizzas in your cart yet.</p> : cartItems}
        <div className="cart-footer">
          <div className="cart-footer-inner">
            <h2>Total: {cartTotal === 0 ? "0.00" : Math.round((cartTotal + Number.EPSILON) * 100) / 100} €</h2>
            <button onClick={placeOrder} className={cart.pizzas.length==0 ? "disabled" : ""}>Place Order</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="cart-container">
        <div className="order-placed">
          <p className="big-text thanks">Thanks for your order!</p>
          <p>Find it again with id :</p>
          <div className="id-container">
            <p className="order-id">{orderId}</p>
            </div>
          <button><Link to="/" exact>← back to menu</Link></button>
        </div>
      </div>
    )
  }
}
