import { useContext } from "react";
import { CartContext } from "../../contexts/cart-context";
import { ReactComponent as ShoppingBag } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

const CartIcon = ({}) => {
  const { isCartOpen, setIsCartOpen, itemCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingBag className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
