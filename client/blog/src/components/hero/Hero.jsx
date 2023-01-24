import React from "react";
import "./hero.scss";

const Hero = () => {
  return (
    <div id="hero">
      <h1 id="hero-title" className="heading">Development is an Art</h1>
      <h3 id="hero-tagline">
        Don't miss out on the latest news and Tutorials.
      </h3>
      {/* <form action="submit">
        <input required type="email" placeholder="Email" />
        <button>Subscribe</button>
      </form> */}
    </div>
  );
};

export default Hero;
