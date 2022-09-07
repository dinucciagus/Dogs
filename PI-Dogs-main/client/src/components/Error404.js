import React from "react";
import { Link } from "react-router-dom";
import DOGS404 from "../assets/404DOGS.png";
import { cleanDetail } from "../actions";
import { useDispatch } from "react-redux";
import "./styles/Error.css";

export default function Error404() {
  const dispatch = useDispatch();
  function handleClick(e) {
    dispatch(cleanDetail());
  }
  return (
    <div className="ErrorContainer">
      <Link onClick={(e) => handleClick(e)} to={"/home"}>
        <img src={DOGS404} height="680" width="1040" alt="404 Page not found" />
      </Link>
    </div>
  );
}
