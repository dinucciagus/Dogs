import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { getDogsByName } from "../actions";
// import { useSelector } from "react-redux";

//importar css para darle estilo.

function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  // const name = useSelector (state => state.name);

  function handleInput(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name !== "") {
      dispatch(getDogsByName(name));
      setName("");
    }
  }

  return (
    <div>
      <input
        onChange={(e) => handleInput(e)}
        type="text"
        value={name}
        placeholder="Search for a dog breed ..."
      />
      <input type="submit" value="Search" onClick={(e) => handleSubmit(e)} />
    </div>
  );
}

export default SearchBar;
