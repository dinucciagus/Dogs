import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../actions";
import "./styles/SearchBar.css";
import lupa from "../assets/lupa.png";

function SearchBar({ setCurrentPage, setInputPage, setSelected }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  // const dogs = useSelector((state) => state.dogs);

  function handleInput(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    if (name !== "") {
      dispatch(getDogsByName(name)).then((info) => {
        setCurrentPage(1);
        setInputPage(1);
      });
      setName("");
      setSelected(true);
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
    </div>
  );
}

export default SearchBar;
