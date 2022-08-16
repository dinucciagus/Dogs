import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../actions";
import { useState } from "react";

export default function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    height_Min: "",
    height_Max: "",
    weight_Min: "",
    weight_Max: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  function handleSelect(e) {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(createDog(input));
    alert("Dog created successfully! =)");
    setInput({
      name: "",
      height_Min: "",
      height_Max: "",
      weight_Min: "",
      weight_Max: "",
      life_span: "",
      image: "",
      temperaments: [],
    });
    history.push("/home");
  }

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1> Create your Dog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Minimum height: </label>
          <input
            type="text"
            value={input.height_Min}
            name="height_Min"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Maximum height: </label>
          <input
            type="text"
            value={input.height_Max}
            name="height_Max"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Minimum weight: </label>
          <input
            type="text"
            value={input.weight_Min}
            name="weight_Min"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Maximum weight: </label>
          <input
            type="text"
            value={input.weight_Max}
            name="weight_Max"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Life span: </label>
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Image URL: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <label> Temperaments: </label>
        <select onChange={(e) => handleSelect(e)}>
          {temperaments.map((t) => (
            <option value={t.name}>{t.name}</option>
          ))}
        </select>
        <ul>
          <li>{input.temperaments.map((t) => t + ", ")}</li>
        </ul>
        <div>
          <button type="submit"> Create Dog!</button>
        </div>
      </form>
    </div>
  );
}
