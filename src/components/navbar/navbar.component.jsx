import { ReactComponent as CapstoneLogo } from "../../assets/crown.svg";
import { useSelector, useDispatch } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutUser } from "../../utils/firebase/firebase";
import { signOutStart } from "../../store/user/user.action";
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navbar.styles";

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  //const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    //await signOutUser();
    dispatch(signOutStart());
  };
  return (
    <NavigationContainer>
      <LogoContainer to="/">
        <CapstoneLogo className="logo" />
      </LogoContainer>
      <NavLinks>
        <NavLink to="/shop">SHOP</NavLink>
        {currentUser ? (
          <NavLink as="span" onClick={signOutHandler}>
            SIGN OUT
          </NavLink>
        ) : (
          <NavLink to="/auth">SIGN IN</NavLink>
        )}
        <CartIcon />
      </NavLinks>
      {isCartOpen && <CartDropdown />}
    </NavigationContainer>
  );
};

export default Navbar;
