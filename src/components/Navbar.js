import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Global/CartContext";
const Navbar = () => {
  const { shoppingCart } = useContext(CartContext);
  return (
    <nav>
      <ul className="left">
        <li>
          <Link to="/">React-Shop</Link>
        </li>
      </ul>

      <ul className="right">
        <li>
          <Link to="/cart">
            <span className="shoppingCart">
              <i className="fas fa-cart-plus"></i>
              <span className="cartCount">
                {shoppingCart ? shoppingCart.length : 0}
              </span>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
