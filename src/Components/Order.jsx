import React, { useState, useEffect } from 'react';
import OrderItem from './OrderItem';
import PizzaContext from '../Context/PizzaContext';

export default function Order() {
  const [foundOrder, setFoundOrder] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [noOrder, setNoOrder] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(()=>{
    let newOrderTotal = 0;
    if(!foundOrder) {
      setOrderTotal(0);
    } else {
      foundOrder.pizzas.map(item=>{
        newOrderTotal += (item.quantity*item.price);
        setOrderTotal(newOrderTotal);
    })}
  }, [foundOrder]);
  
  const getOrder = async() => {
    try {
      const fetchedData = await(await fetch(`http://localhost:5000/orders/${orderId}`)).json();
      console.log(fetchedData);
      if(!fetchedData.pizzas){
        setNoOrder(true);
        setFoundOrder(null);
        return;
      }
      setFoundOrder(fetchedData);
      setNoOrder(false);
    } catch (err) {
      console.log(err);
    }
  }

  function resetOrderSearch(){
    setFoundOrder(null);
    setOrderId("");
    setNoOrder(false);
  }

  if(!foundOrder){
    return (
      <div className="order-container">
        <h3 className="nothing-inside">Find your order :</h3>
        <div className="order-search">
          <input value={orderId} type="text" name="orderId" id="orderId" onChange={e=>setOrderId(e.target.value)} placeholder="&#128270; order id" />
          <button onClick={getOrder}>Find Order</button>
        </div>
        {noOrder ? <h3 className="nothing-inside">Your order couldn't be found...<br/>Try Again!</h3> : null}
      </div>
    )
  } else {
    const orderItems = foundOrder.pizzas.map((item, index)=>{
      return <OrderItem pizza={item} count={index}/>
    });

    return (
      <div className="order-container">
        <div className="order-header">
          <button onClick={resetOrderSearch}>← back</button>
          <h3>Order #{orderId}:</h3>
          <p>placed on {(new Date(foundOrder.createdAt)+"").slice(0,24)}</p>
        </div>
        {orderItems}
        <div className="cart-footer">
          <div className="cart-footer-inner">
            <h2>Total: {orderTotal}€</h2>
          </div>
        </div>
      </div>
    )
  }
}
