import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";


const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
