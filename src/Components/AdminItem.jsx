import React from 'react';

export default function AdminItem({pizza, count}) {
  return (
    <div key={count} className="admin-item">
      <h3>{count < 9 ? "0"+(count+1)+"." : (count+1)+"."}</h3>
      <form>
        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={pizza.name}/>
        </div>

        <div className="form-row">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={pizza.description}/>
        </div>

        <div className="form-row">
          <label htmlFor="ingredients">Ingredients:</label>
          <input type="text" id="ingredients" value={pizza.ingredients}/>
        </div>

        <div className="form-row">
          <label htmlFor="image">Image URL:</label>
          <input type="text" id="image" value={pizza.image}/>
        </div>

        <div className="form-row">
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" value={pizza.price}/>
        </div>

        <div className="form-row">
          <label htmlFor="vegan">Vegan:</label>
          <input type="checkbox" id="vegan" checked={pizza.isVegan ? true : false}/>
        </div>

        <button type="submit">save changes</button>
      </form>
  
    </div>
  )
}
