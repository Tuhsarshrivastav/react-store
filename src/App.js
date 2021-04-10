import "./App.css";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import Products from "./components/Products";
import ProductsContextProvider from "./Global/ProductsContext";
import CartContextProvider from "./Global/CartContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <ProductsContextProvider>
        <CartContextProvider>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Products} />
              <Route path="/cart" exact component={Cart} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </CartContextProvider>
      </ProductsContextProvider>
    </div>
  );
}

export default App;
