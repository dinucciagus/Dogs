import React from "react";
import { Link } from "react-router-dom";
import "./styles/LandingPage.css";
import logo from "../assets/logo.png";

function LandingPage() {
  return (
    <div className="containerLanding">
      <div className="box">
        <img src={logo} alt="Logo" className="logo" />
        <Link to="/home">
          <button class="buttonEnter">
            <span>Enter the dogs world!</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
