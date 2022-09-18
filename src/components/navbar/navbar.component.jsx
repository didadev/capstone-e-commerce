import { ReactComponent as CapstoneLogo } from "../../assets/crown.svg";
import { Link } from "react-router-dom";
import "./navbar.styles.scss";

const Navbar = () => {
  return (
    <div className="navigation">
      <Link to="/" className="logo-container">
        <CapstoneLogo className="logo" />
      </Link>
      <div className="nav-links-container">
        <Link to="/shop" className="nav-link">
          SHOP
        </Link>
        <Link to="/auth" className="nav-link">
          SIGN IN
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
