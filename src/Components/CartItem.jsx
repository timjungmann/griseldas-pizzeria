import React from 'react'

export default function CartItem({pizza, count}) {
  function capitalizeFirstLetter(item){
    const newItem = item.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return newItem;
  }

  return (
    <>
      <div key={count} className="cart-item">
        <div className="pizza-details">
          <h3>{count < 9 ? "0"+(count+1)+"." : (count+1)+"."} {capitalizeFirstLetter(pizza.name)} </h3>
        </div>
        <div className="price">
          <span>x&nbsp;</span><input type="number" name="amount" value="1" min="1" max="99" autoComplete="off"/>
          <h4>{pizza.price} €</h4>
        </div>
      </div>
      <hr />
    </>
  )
}
