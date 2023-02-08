import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemFromCheckout,
  clearItemFromCheckout,
} from "../../store/cart/cart.action";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { id, name, price, quantity, imageUrl } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  //const { addItemToCart, removeItemFromCheckout, clearItemFromCheckout } =
  //useContext(CartContext);

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCheckout(cartItems, cartItem));
  const clearItemHandler = () =>
    dispatch(clearItemFromCheckout(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="img-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="description">{name}</span>
      <span className="quantity">
        <div className="quantity-arrow" onClick={removeItemHandler}>
          &lt;
        </div>
        <span className="value">{quantity}</span>
        <div className="quantity-arrow" onClick={addItemHandler}>
          &gt;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-icon" onClick={clearItemHandler}>
        &#88;
      </span>
    </div>
  );
};

export default CheckoutItem;
