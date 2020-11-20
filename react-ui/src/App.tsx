import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./App.css";
// import { ProductsContainer } from "./ProductsContainer";
import { ProductsContainerFC } from "./functionComponents/ProductsContainerFC";

const App: React.FC = () => {
  return (
    
    <BrowserRouter>
      <Switch>
        <Route path="/items/:id" render={() => <div>Item with id of 2 </div>} />

        <Route
          path="/items"
          render={() => (
            <div>
              <em>List of items</em>
            </div>
          )}
        />

        <Route path="/products" component={ProductsContainerFC} exact />
        <Route
          path="/"
          render={() => (
            <div>
              <Link to="/products">Go To Products</Link>
            </div>
          )}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
