import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import PizzaList from "./Components/PizzaList";
import PizzaContext from "./Context/PizzaContext";
import Admin from "./Components/Admin";
import Cart from "./Components/Cart";

function App() {
  const [pizza, setPizza] = useState([]);
  const [selection, setSelection] = useState([]);
  const [cart, setCart] = useState({pizzas:[]});
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(()=>{
    let newCartTotal = 0;
    cart.pizzas.map(item=>{
      newCartTotal += (item.quantity*item.price);
      setCartTotal(newCartTotal);
    })
  }, [cart]);

  useState(async()=>{
    const data = await (await fetch("http://localhost:5000/pizzas")).json();
    const sortedData = data.sort(function(a, b) {
      return parseFloat(a.price) - parseFloat(b.price);
    });
    setPizza(sortedData);
    setSelection(sortedData);
  }, [])

  return (
    <Router>
      <div className="app-container">
        <div className="inner-container">
          <div className="top-left field"></div>
          <div className="top-center field">
            <div className="logo-image">
              <img src={process.env.PUBLIC_URL + "kumamon.png"} alt="Kumamon Logo"/>
              <Link to="/">
                <h1>Kumamon's Pizzeria</h1>
              </Link>
            </div>
            <div className="header-menu">
              <Link to="/" exact>
                <p>Menu</p>
              </Link>
              <Link to="/admin">
                <p>Admin</p>
              </Link>
              <Link to="/cart">
                <p>Cart</p>
              </Link>
            </div>
            <div className="cart-icon">
              99 <Link to="/cart"><i class="fas fa-shopping-cart"></i></Link>
            </div>
          </div>
          <div className="top-right field"></div>
          <div className="center-left field"></div>
          <div className="center-center">
            <PizzaContext.Provider value={{pizza, cart, setCart, cartTotal, setCartTotal}}>
              <Switch>
                <Route path="/" exact>
                  <PizzaList selection={selection} setSelection={setSelection}/>
                </Route>
                <Route path="/admin" exact>
                  <Admin/>
                </Route>
                <Route path="/cart" exact>
                  <Cart/>
                </Route>
              </Switch>
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
    </Router>
  );
}

export default App;
