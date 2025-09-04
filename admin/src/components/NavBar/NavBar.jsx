import React from "react";
import "./NavBar.css";
import ogLogo from "./../../assets/ogLogo.png";

const NavBar = () => {
  return (
    <div className="navbar">
      <img src={ogLogo} alt="" className="nav-logo" />
    </div>
  );
};

export default NavBar;
