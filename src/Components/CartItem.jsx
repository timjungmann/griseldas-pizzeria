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

  async function deleteCart(){

    const fetchedData = await (await fetch(`http://localhost:5000/cart`,{
      method: "DELETE",
      headers: {"Content-Type": "application/json", "Origin": "http://localhost:3000"},
      body: JSON.stringify({pizzas:[pizza]})})).json()
  
      setCart(fetchedData);

      };

  return (
    <>
      <form key={count} className="cart-item" onSubmit={deleteCart}>
        <div className="pizza-details">
          <h3>{count < 9 ? "0"+(count+1)+"." : (count+1)+"."} {capitalizeFirstLetter(pizza.name)} </h3>
        </div>
        <div className="price">
          {/* <input type="number" name="amount" defaultValue="0" min="0" max="99" autoComplete="off"/> */}
          <h4>{pizza.price} €</h4>
          <button style={{border: 'none', cursor: 'pointer'}} type="submit">❌</button>
        </div>
      </form>
      <hr />
      
    </>
  )
}
