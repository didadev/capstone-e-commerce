import { useSelector, useDispatch } from "react-redux";
import Button from "../button/button.component";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  //const { addItemToCart, getItemCount } = useContext(CartContext);

  const addItemToCartHandler = () => {
    dispatch(addItemToCart(cartItems, product));
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
