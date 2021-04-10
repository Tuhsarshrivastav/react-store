import React, { createContext, useReducer } from "react";
import {CartReducer} from "./CartReducer";

export const CartContext = createContext();

const CartContextPovider = (props) => {
  const [cart, dispatch] = useReducer(CartReducer, {
    shoppingCart: [],
    totalPrice: [],
    qty: [],
  });
  return (
    <CartContext.Provider value={{ ...cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextPovider;
