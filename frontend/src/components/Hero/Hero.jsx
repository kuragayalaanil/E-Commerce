import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-left">
      <h2>New Arriavals</h2>
      <div>
        <div className="hero-hand-icon">
          <p>new</p>
        </div>
        <p>the OG Wear </p>
        <p>collection for everyone</p>
      </div>
      <div className="hero-latest-btn">
        <div>Latest Collection</div>
      </div>
      {/* <div className="hero-right">
        <img src={hero_image} alt="" />
      </div> */}
    </div>
  );
};
//
export default Hero;
