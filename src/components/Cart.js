import "./Cart.css";
import { CartContext } from "../Global/CartContext";
import { useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Cart = (props) => {
  const { shoppingCart, totalPrice, qty, dispatch } = useContext(CartContext);
  const handleToken = async (token) => {
    const product = {
      name: "ALL products",
      price: totalPrice,
    };
    const response = await axios.post("http://localhost:5000/checkout", {
      product,
      token,
    });

    const { status } = response.data;
    if (status === "sucess") {
      dispatch({ type: "EMPTY" });
      props.history.push("/");
      toast.success(
        "You have paid successfully now you can continoue your shopping",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-details">
        {shoppingCart.length > 0 ? (
          shoppingCart.map((cart) => (
            <div className="cart" key={cart.id}>
              <span className="cart-image">
                <img src={cart.image} alt="Product" />
              </span>
              <span className="cart-product-name">{cart.name}</span>
              <span className="cart-product-price">${cart.price}.00</span>
              <span
                onClick={() => dispatch({ type: "INC", id: cart.id, cart })}
                className="inc"
              >
                <i className="fas fa-plus"></i>
              </span>
              <span className="product-quantity">{cart.qty}</span>
              <span
                onClick={() => dispatch({ type: "DEC", id: cart.id, cart })}
                className="dec"
              >
                <i className="fas fa-minus"></i>
              </span>
              <span className="product-total-price">
                ${cart.price * cart.qty}.00
              </span>
              <span
                onClick={() => dispatch({ type: "DELETE", id: cart.id, cart })}
                className="delete-product"
              >
                <i className="fas fa-trash-alt"></i>
              </span>
            </div>
          ))
        ) : (
          <div className="empty">Sorry your Cart is Currently empty</div>
        )}
      </div>
      {shoppingCart.length > 0 ? (
        <div className="cart-summary">
          <div className="summary">
            <h3>Order Summary</h3>
            <div className="total-items">
              <div className="items">Total Items</div>
              <div className="items-count">{qty.length}</div>
            </div>
            <div className="total-price-section">
              <div className="just-title">Total Price</div>
              <div className="items-price">${totalPrice}.00</div>
            </div>
            <div className="stripSection">
              <StripeCheckout
                stripeKey="pk_test_51HvfktAxBrXJs2UIVhIC9DKXWhTmPmGSoZblhwCwF7Qt9owus1UCB9D7UblFcutQNrhCsaIoIR9aQQCXVdVQhBdv00DgUIGCHZ"
                token={handleToken}
                billingAddress
                shippingAddress
                amount={totalPrice * 100}
                name="All products in the cart"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
