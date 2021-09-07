import React, { useContext, useState } from 'react';
import PizzaItem from './PizzaItem';
import PizzaContext from '../Context/PizzaContext';

export default function PizzaList() {
  const {pizza} = useContext(PizzaContext);

  const pizzaItems = pizza.map((item, index)=>{
    return <PizzaItem pizza={item} count={index}/>
  })

  return (
    <div className="pizza-list-container">
      <div className="pizza-list-header">
        <h2>Our menu:</h2>
        <div className="search-container">
          <input type="text" name="search" id="search" placeholder="&#128270; search" autocomplete="off"/>
          <button>search</button>
          </div>
          <div></div>
      </div>
      {pizzaItems}
    </div>
  )
}
