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
    setCartTotal(cartTotal+pizza.price)
    if(cart.pizzas.length === 0){
      async function createCart(){
        const fetchedData = await(await fetch("http://localhost:5000/cart",{
          method: "POST",
          headers: {"Content-Type": "application/json", "Origin": "http://localhost:3000"},
          body: JSON.stringify({pizzas:[{...pizza, amount:1}]})}
        )).json();
        setCart(fetchedData);
      };
      createCart();
    } else {
      const foundPizza = cart.pizzas.find(item=>item._id === pizza._id);
      let someData;
      if(foundPizza){
        let someOtherData = cart.pizzas.map(item=>{
          console.log(item.amount);
          if(item._id === pizza._id){
            return {...item, amount:item.amount+1}
          }
          else{
            return item
          }
        })
        someData = {...cart, pizzas:someOtherData}
      } else {
        someData = {...cart, pizzas:[...cart.pizzas, {...pizza, amount:1}]}
      }
      async function updateCart(){
        console.log(someData);
        const fetchedData = await(await fetch(`http://localhost:5000/cart/${cart._id}`,{
          method: "PUT",
          headers: {"Content-Type": "application/json", "Origin": "http://localhost:3000"},
          body: JSON.stringify(someData)}
        )).json();
        setCart(fetchedData);
      };
      updateCart();
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
