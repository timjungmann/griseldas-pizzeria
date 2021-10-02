import React, {useContext, useEffect, useState} from 'react';
import PizzaContext from '../Context/PizzaContext';

export default function PizzaItem({pizza, count}) {
  const {cart, setCart} = useContext(PizzaContext);

  function capitalizeFirstLetter(item){
    const newItem = item.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return newItem;
  }

  function addToCart(){
    const foundPizza = cart.pizzas.find(item=>item._id === pizza._id);
    if(foundPizza){
      const foundIndex = cart.pizzas.indexOf(foundPizza);
      const updatedCart = {...cart};
      const updatedPizza = {...foundPizza, quantity:foundPizza.quantity+1};
      updatedCart.pizzas.splice(foundIndex,1,updatedPizza);
      setCart({pizzas:[...updatedCart.pizzas]})
    } else {
      setCart({pizzas:[...cart.pizzas, {...pizza, quantity:1}]})
    }
  }
  

  return (
    <div key={count} className="pizza-list-item">
      <div className="pizza-number">
          <h3>{count < 9 ? "0"+(count+1)+"." : (count+1)+"."}</h3>
        </div>
        <div className="pizza-image">
          <img src={pizza.image} alt="Pizza Image" />
        </div>
        <div className="pizza-details">
          <h3>{capitalizeFirstLetter(pizza.name)} {pizza.isVeg ? <i class="fas fa-seedling"></i> : null}</h3>
          <hr/>
          <p className="pizza-desc">{capitalizeFirstLetter(pizza.description)}</p>
          <p><b>Ingredients:</b> {capitalizeFirstLetter(pizza.ingredients.join(", "))}</p>
        </div>
        <div className="pizza-menu">
          <div className="price">
            <h4>{pizza.price} €</h4>
          </div>
          <div className="order">
            <button style={{
              borderTopLeftRadius: Math.ceil(Math.random()*(100-60)+60),
              borderTopRightRadius: Math.ceil(Math.random()*(100-60)+60),
              borderBottomLeftRadius: Math.ceil(Math.random()*(100-60)+60),
              borderBottomRightRadius: Math.ceil(Math.random()*(100-60)+60)
              }} onClick={addToCart}>Order</button>
          </div>
        </div>
      </div>
  )
}
