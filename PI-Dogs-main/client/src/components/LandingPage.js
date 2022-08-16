import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="BackgroundDogs">
      <h1> Welcome to the Dogs app!</h1>
      <Link to="/home">
        <button>Enter dogs world</button>
      </Link>
    </div>
  );
}

export default LandingPage;
