import React from "react";
import { Link } from "react-router-dom";
import DOGS404 from "../assets/404DOGS.png";

export default function Error404() {
  return (
    <div>
      <Link to={"/home"}>
        <img src={DOGS404} height="680" width="1040" alt="404 Page not found" />
      </Link>
    </div>
  );
}
