import React, {useContext} from 'react';
import PizzaContext from '../Context/PizzaContext';

export default function OrderItem({pizza, count}) {

  function capitalizeFirstLetter(item){
    const newItem = item.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return newItem;
  }

  return (
    <>
      <div key={count} className="order-item">
        <div className="name">
          <h3>{count < 9 ? "0"+(count+1)+"." : (count+1)+"."} {capitalizeFirstLetter(pizza.name)} </h3>
        </div>
        <div className="price">
          <div className="quantity">
            <p className="multiplied">{pizza.quantity} X</p>
            <h4>{pizza.price} €</h4>
          </div>
          <h4>{pizza.price*pizza.quantity} €</h4>
        </div>
      </div>
      <hr />
    </>
  )
}
