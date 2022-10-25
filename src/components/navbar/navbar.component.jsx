import { useContext } from "react";
import { ReactComponent as CapstoneLogo } from "../../assets/crown.svg";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/userContext";
import { CartContext } from "../../contexts/cart-context";
import { signOutUser } from "../../utils/firebase/firebase";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navbar.styles";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
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
