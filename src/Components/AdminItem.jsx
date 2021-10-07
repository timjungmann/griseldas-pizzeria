import React, {useState} from 'react';

export default function AdminItem({pizza, count}) {
  const [name, setName] = useState(pizza.name);
  const [description, setDescription] = useState(pizza.description);
  const [ingredients, setIngredients] = useState(pizza.ingredients);
  const [image, setImage] = useState(pizza.image);
  const [price, setPrice] = useState(pizza.price);
  const [vegan, setVegan] = useState(pizza.isVegan);
  

  // async function deletePizza(){
  //   const fetchedData = await(await fetch(`https://griseldas-pizzeria-api.vercel.app/pizzas/${pizza._id}`,{
  //     method: "DELETE",
  //     headers: {"Content-Type": "application/json", "Origin": "https://griseldas-pizzeria-client.vercel.app/"}}
  //   )).json();
  // };


  function submitHandler(e){
    e.preventDefault();
    const pizzaData = {name: name, description: description, ingredients:ingredients, image:image, price:price, isVegan:vegan};
    async function updatePizza(){
      const fetchedData = await(await fetch(`https://griseldas-pizzeria-api.vercel.app/pizzas/${pizza._id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json", "Origin": "https://griseldas-pizzeria-client.vercel.app/"},
        body: JSON.stringify(pizzaData)}
      )).json();
    }
    updatePizza();
  }
  
  return (
    <div key={count} className="admin-item">
      <h3>{count < 9 ? "0"+(count+1)+"." : (count+1)+"."}</h3>
      <form onSubmit={submitHandler}>
        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} autoComplete="off" onChange={(e)=>setName(e.target.value)}/>
        </div>

        <div className="form-row">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={description} autoComplete="off" onChange={(e)=>setDescription(e.target.value)}/>
        </div>

        <div className="form-row">
          <label htmlFor="ingredients">Ingredients:</label>
          <input type="text" id="ingredients" value={ingredients} autoComplete="off" onChange={(e)=>{
            setIngredients(e.target.value)
            console.log(ingredients);}}/>
        </div>

        <div className="form-row">
          <label htmlFor="image">Image URL:</label>
          <input type="text" id="image" value={image} autoComplete="off" onChange={(e)=>setImage(e.target.value)}/>
        </div>

        <div className="form-row">
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" value={price} autoComplete="off" onChange={(e)=>setPrice(e.target.value)}/>
        </div>

        <div className="form-row">
          <label htmlFor="vegan">Vegan:</label>
          <input type="checkbox" id="vegan" checked={vegan ? true : false} onChange={(e)=>setVegan(e.target.value)}/>
        </div>

        <button type="submit" disabled>save changes</button>
        {/* <button onClick={deletePizza}>delete</button> */}
      </form>
  
    </div>
  )
}
