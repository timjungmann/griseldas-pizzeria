import React from 'react';

export default function AdminNewItem({pizza, count}) {
  return (
    <div key={count} className="admin-item">
      <form>
        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name"/>
        </div>

        <div className="form-row">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description"/>
        </div>

        <div className="form-row">
          <label htmlFor="ingredients">Ingredients:</label>
          <input type="text" id="ingredients"/>
        </div>

        <div className="form-row">
          <label htmlFor="image">Image URL:</label>
          <input type="text" id="image"/>
        </div>

        <div className="form-row">
          <label htmlFor="price">Price:</label>
          <input type="text" id="price"/>
        </div>

        <div className="form-row">
          <label htmlFor="vegan">Vegan:</label>
          <input type="checkbox" id="vegan"/>
        </div>

        <button type="submit">create</button>
      </form>
  
    </div>
  )
}
