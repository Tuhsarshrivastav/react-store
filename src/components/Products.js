import React, { useContext } from "react";
import Banner from "./Banner";
import "./Products.css";
import { ProductsContext } from "../Global/ProductsContext";
import { CartContext } from "../Global/CartContext";

const Products = () => {
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(CartContext);
  return (
    <div className="container">
      <Banner />
      <div className="products" key={products.id}>
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt="not found" />
            </div>

            <div className="product-details">
              <div className="product-name">{product.name}</div>
              <div className="product-price">${product.price}.00</div>
            </div>
            <div
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  id: product.id,
                  product,
                })
              }
              className="add-to-cart"
            >
              add to cart
            </div>
            {product.productStatus === "new" ? (
              <div className="new">New</div>
            ) : (
              ""
            )}
            {product.productStatus === "hot" ? (
              <div className="hot">Hot</div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
