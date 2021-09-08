import React, { useContext } from 'react';
import PizzaContext from '../Context/PizzaContext';
import AdminItem from './AdminItem';
import AdminNewItem from './AdminNewItem';

export default function Admin() {
  const {pizza} = useContext(PizzaContext);

  const adminItems = pizza.map((item, index)=>{
    return <AdminItem pizza={item} count={index}/>
  })

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Add item:</h2>
      </div>
      <div className="admin-add">
        <AdminNewItem/>
      </div>
      <div className="admin-header">
        <h2>Edit item:</h2>
      </div>
      <div className="admin-items">
        {adminItems}
      </div>
    </div>
  )
}
