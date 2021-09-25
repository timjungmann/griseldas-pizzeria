import React, {useContext} from 'react';
import PizzaContext from '../Context/PizzaContext';

export default function CartItem({pizza, count}) {
  const {cart, setCart} = useContext(PizzaContext);

  function capitalizeFirstLetter(item){
    const newItem = item.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return newItem;
  }

  async function deleteFromCart(){
    const deletedFromCart = cart.pizzas.filter(item=>{
      return item._id !== pizza._id;
    })
    setCart({pizzas:[...deletedFromCart]})
  };

  function changeAmount(e){
    const foundPizza = cart.pizzas.find(item=>item._id === pizza._id);
    if(foundPizza){
      const foundIndex = cart.pizzas.indexOf(foundPizza);
      const updatedCart = {...cart};
      const updatedPizza = {...foundPizza, quantity:e.target.value};
      updatedCart.pizzas.splice(foundIndex,1,updatedPizza);
      setCart({pizzas:[...updatedCart.pizzas]})
    }
  }

  return (
    <>
      <div key={count} className="cart-item">
        <div className="name">
          <h3>{count < 9 ? "0"+(count+1)+"." : (count+1)+"."} {capitalizeFirstLetter(pizza.name)} </h3>
        </div>
        <div className="price">
          <div className="quantity-input">
            <p className="delete-button" onClick={deleteFromCart}>🗑</p>
            <input type="number" name="amount" value={pizza.quantity} min="1" max="99" autoComplete="off" onChange={changeAmount}/>
            <p className="multiplied">X</p>
            <h4>{pizza.price} €</h4>
          </div>
          <h4>{pizza.price*pizza.quantity} €</h4>
        </div>
      </div>
      <hr />
    </>
  )
}
