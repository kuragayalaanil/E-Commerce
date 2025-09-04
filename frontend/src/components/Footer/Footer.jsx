import React from "react";
import "./Footer.css";
// import footer_logo from "../assets/logo_big.png";
import ogLogo from "./../assets/ogLogo.png"
import instagram_icon from "../assets/instagram_icon.png";
import pintrest_icon from "../assets/pintester_icon.png";
import whatsapp_icon from "../assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={ogLogo} alt="Footer Logo" />
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="Instagram_Icon" />
        </div>
        <div className="footer-icons-container">
          <img src={pintrest_icon} alt="Pintrest_Icon" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="WhatsApp_Icon" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>
          © 2025 Shopper — All rights reserved. Designed & Developed with ❤️
        </p>
      </div>
    </div>
  );
};
// 

export default Footer;
