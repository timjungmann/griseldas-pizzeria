import PizzaList from "./Components/PizzaList";

function App() {
  return (
    <div className="app-container">
      <div className="inner-container">
        <div className="top-left field"></div>
        <div className="top-center field"></div>
        <div className="top-right field"></div>
        <div className="center-left field"></div>
        <div className="center-center">
          <PizzaList/>
        </div>
        <div className="center-right field"></div>
        <div className="bottom-left field"></div>
        <div className="bottom-center field"></div>
        <div className="bottom-right field"></div>
      </div>
    </div>
  );
}

export default App;
