import React, { useState } from "react";
import PizzaList from "./Components/PizzaList";
import PizzaContext from "./Context/PizzaContext";

function App() {
  const [pizza, setPizza] = useState([]);

  useState(async()=>{
    const data = await (await fetch("http://localhost:5000/pizzas")).json();
    setPizza(data);
  }, [])

  return (
    <div className="app-container">
      <div className="inner-container">
        <div className="top-left field"></div>
        <div className="top-center field">
          <h1>Kumamon's Pizzeria</h1>
          <div className="cart-icon">
            0 <i class="fas fa-shopping-cart"></i>
        </div>
        </div>
        <div className="top-right field"></div>
        <div className="center-left field"></div>
        <div className="center-center">
          <PizzaContext.Provider value={{pizza}}>
            <PizzaList/>
          </PizzaContext.Provider>
        </div>
        <div className="center-right field"></div>
        <div className="bottom-left field"></div>
        <div className="bottom-center field">
          <div className="social-icons">
            <i class="fab fa-instagram"></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-facebook-square"></i>
          </div>
        </div>
        <div className="bottom-right field"></div>
      </div>
    </div>
  );
}

export default App;
