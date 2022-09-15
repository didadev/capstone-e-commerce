import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.component";
import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
