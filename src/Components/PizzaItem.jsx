import React, {useContext, useState} from 'react';
import PizzaContext from '../Context/PizzaContext';

export default function PizzaItem({pizza, count}) {
  const {cart, setCart, cartTotal, setCartTotal} = useContext(PizzaContext);

  function capitalizeFirstLetter(item){
    const newItem = item.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return newItem;
  }

  function addToCart(){
    // setCartTotal(cartTotal+pizza.price);
    const foundPizza = cart.pizzas.find(item=>item._id === pizza._id);
    if(foundPizza){
      const updatedPizza = {...foundPizza, quantity:foundPizza.quantity+1}
      const filteredCart = cart.pizzas.filter(item=>item._id !== pizza._id);
      setCart({pizzas:[...filteredCart, updatedPizza]})
    } else {
      setCart({pizzas:[...cart.pizzas, {...pizza, quantity:1}]})
    }
    console.log("CAAAART", cart);
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
          <h3>{capitalizeFirstLetter(pizza.name)} {pizza.isVegan ? <i class="fas fa-seedling"></i> : null}</h3>
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
