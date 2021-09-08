import React, { useContext } from 'react';
import CartItem from './CartItem';
import PizzaContext from '../Context/PizzaContext';

export default function Cart() {
  const {pizza} = useContext(PizzaContext);

  console.log(pizza);

  const cartItems = pizza.map((item, index)=>{
    return <CartItem pizza={item} count={index}/>
  })

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Cart:</h2>
      </div>
      {cartItems}
    </div>
  )
}
