import { useSelector, useDispatch } from "react-redux";
import {
  selectItemsCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount,
} from "./cart-icon.styles.jsx";

const CartIcon = ({}) => {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectItemsCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  //const { isCartOpen, setIsCartOpen, itemCount } = useContext(CartContext);

  //const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{itemCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
