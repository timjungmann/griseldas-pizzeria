import React, { useContext, useState } from 'react';
import PizzaItem from './PizzaItem';
import PizzaContext from '../Context/PizzaContext';

export default function PizzaList({selection, setSelection}) {
  const {pizza} = useContext(PizzaContext);
  const [vegan, setVegan] = useState(false);
  const [search, setSearch] = useState("");

  console.log(pizza);

  const pizzaItems = selection.map((item, index)=>{
    return <PizzaItem pizza={item} count={index}/>
  })

  function veganChange(){
    setVegan(!vegan);
    if(!vegan){
      const veganPizzas = selection.filter(item=>{
        return item.isVegan==true;
      })
      setSelection(veganPizzas);
    } else{
      setSelection(pizza);
    }
  }

  function searchChange(e){
    setSearch(e.target.value);
  }

  function handleSearch(){
    setSearch("");
    const filteredSelection = pizza.filter(item=>{
      return item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) || item.ingredients.join(" ").toLowerCase().includes(search.toLowerCase());
    })
    console.log(filteredSelection);
    setSelection(filteredSelection);
  }

  function resetSearch(){
    setSelection(pizza);
    setVegan(false);
    setSearch("")
  }

  return (
    <div className="pizza-list-container">
      <div className="pizza-list-header">
        <h2>Our menu:</h2>
        <div className="search-container">
          <input type="text" name="search" id="search" placeholder="&#128270; search" autoComplete="off" value={search} onChange={searchChange}/>
          <button onClick={handleSearch}>search</button>
          <button onClick={resetSearch}>reset</button>
        </div>
        <div className="vegan-check">
          <input type="checkbox" name="vegan" id="vegan" value={vegan} onChange={veganChange}/>
          <label htmlFor="vegan">vegan <i class="fas fa-seedling"></i></label>
        </div>
      </div>
      {selection.length>0 ? pizzaItems : <h3 className="nothing-found">Sorry.... no pizza found for your search. Try again.</h3>}
    </div>
  )
}
