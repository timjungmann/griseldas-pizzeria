import React, {useContext, useEffect} from 'react';
import PizzaContext from '../Context/PizzaContext';
import CartItem from './CartItem';

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
    if(cart.pizzas.length === 0){
      async function createCart(){
        const fetchedData = await(await fetch("http://localhost:5000/cart",{
          method: "POST",
          headers: {"Content-Type": "application/json", "Origin": "http://localhost:3000"},
          body: JSON.stringify({pizzas:[pizza]})}
        )).json();
        setCart(fetchedData);
      };
      createCart();
    } else {
      async function updateCart(){
        const fetchedData = await(await fetch(`http://localhost:5000/cart/${cart._id}`,{
          method: "PUT",
          headers: {"Content-Type": "application/json", "Origin": "http://localhost:3000"},
          body: JSON.stringify({...cart, pizzas:[...cart.pizzas, pizza]})}
        )).json();
        setCart(fetchedData);
      };
      updateCart();
    }
  }

  
    // if(cart.pizzas.length === 1){
      console.log(cart);
  
    // } else {
    //   async function updateCart(){
    //     const newCart = {pizzas: [...cart.pizzas]};
    //     const fetchedData = await(await fetch(`http://localhost:5000/cart/${cart._id}`,{
    //       method: "PUT",
    //       headers: {"Content-Type": "application/json", "Origin": "http://localhost:3000"},
    //       body: JSON.stringify(newCart)}
    //     )).json();
    //   };
    //   updateCart();
    // }
  

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
              }} onClick={()=>addToCart()}>Order</button>
          </div>
        </div>
      </div>
  )
}
