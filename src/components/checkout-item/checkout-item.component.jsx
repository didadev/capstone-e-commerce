import { useContext } from "react";
import { CartContext } from "../../contexts/cart-context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { id, name, price, quantity, imageUrl } = cartItem;

  const { addItemFromCheckout, removeItemFromCheckout, clearItemFromCheckout } =
    useContext(CartContext);

  const addItemHandler = () => addItemFromCheckout(cartItem);
  const removeItemHandler = () => removeItemFromCheckout(cartItem);
  const clearItemHandler = () => clearItemFromCheckout(cartItem);

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
