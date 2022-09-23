import { useContext } from "react";
import Button from "../button/button.component";
import { CartContext } from "../../contexts/cart-context";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const { addItemToCart, getItemCount } = useContext(CartContext);

  const addItemToCartHandler = () => {
    addItemToCart(product);
  };
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      {/* <div
        className="product-background-img"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <Button buttonType="inverted">Add to cart</Button>
      </div> */}

      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addItemToCartHandler}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
