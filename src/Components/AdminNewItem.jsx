import React, {useState} from 'react';

export default function AdminNewItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [vegan, setVegan] = useState(false);

  function submitHandler(e){
    e.preventDefault();
    const newPizza = {name: name, description: description, ingredients:ingredients, image:image, price:price, isVegan:vegan};
    async function addPizza(){
      const fetchedData = await(await fetch("https://griseldas-pizzeria-api.vercel.app/pizzas",{
        method: "POST",
        headers: {"Content-Type": "application/json", "Origin": "https://griseldas-pizzeria-client.vercel.app/"},
        body: JSON.stringify(newPizza)}
      )).json();
    };
    addPizza();
    setName("");
    setDescription("");
    setIngredients("");
    setImage("");
    setPrice("");
    setVegan(false);
  };

  return (
    <div className="admin-item new">
      <form onSubmit={submitHandler}>
        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" onChange={(e)=>setName(e.target.value)} value={name} autoComplete="off"/>
        </div>

        <div className="form-row">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" onChange={(e)=>setDescription(e.target.value)} value={description} autoComplete="off"/>
        </div>

        <div className="form-row">
          <label htmlFor="ingredients">Ingredients:</label>
          <input type="text" id="ingredients" onChange={(e)=>setIngredients(e.target.value)} value={ingredients} autoComplete="off"/>
        </div>

        <div className="form-row">
          <label htmlFor="image">Image URL:</label>
          <input type="text" id="image" onChange={(e)=>setImage(e.target.value)} value={image} autoComplete="off"/>
        </div>

        <div className="form-row">
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" onChange={(e)=>setPrice(e.target.value)} value={price} autoComplete="off"/>
        </div>

        <div className="form-row">
          <label htmlFor="vegan">Vegan:</label>
          <input type="checkbox" id="vegan" onChange={()=>setVegan(!vegan)} checked={vegan}/>
        </div>

        <button type="submit" disabled>create</button>
      </form>
  
    </div>
  )
}
