import { useContext } from "react";
import { CartContext } from "../../contexts/cart-context";

import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount,
} from "./cart-icon.styles.jsx";

const CartIcon = ({}) => {
  const { isCartOpen, setIsCartOpen, itemCount } = useContext(CartContext);

  //const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{itemCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
