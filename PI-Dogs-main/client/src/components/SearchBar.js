import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../actions";
import { useSelector } from "react-redux";
import "./styles/SearchBar.css";
import lupa from "../assets/lupa.png";

function SearchBar({ setCurrentPage, setInputPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  // const dogs = useSelector((state) => state.dogs);

  function handleInput(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    if (name !== "") {
      setCurrentPage(1);
      setInputPage(1);
      dispatch(getDogsByName(name));
      setName("");
    }
  }
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <div className="search">
      <input
        className="inputsearch"
        onChange={(e) => handleInput(e)}
        type="text"
        value={name}
        onKeyDown={(e) => onKeyDown(e)}
        placeholder="Search for a dog breed ..."
      />
      <button classname="submitsearch" onClick={(e) => handleSubmit(e)}>
        <img src={lupa} alt="Search" />
      </button>
      {/* <input
        classname="submitsearch"
        type="submit"
        value="Search"
        onClick={(e) => handleSubmit(e)}
      /> */}
    </div>
  );
}

export default SearchBar;
