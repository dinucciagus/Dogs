import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../actions";
import { useState } from "react";

export default function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [errorsTemps, setErrorsTemps] = useState({});
  const [isdisabled, setIsDisabled] = useState(true);
  const [input, setInput] = useState({
    name: "",
    height_Min: 0,
    height_Max: 0,
    weight_Min: 0,
    weight_Max: 0,
    life_span_Max: 0,
    life_span_Min: 0,
    image: "",
    temperaments: [],
  });
  const isUrlImage = function (url) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  function validate(input) {
    let errors = {};
    if (
      !input.name ||
      typeof input.name !== "string" ||
      input.name.length < 2 ||
      input.name[0] !== input.name[0].toUpperCase()
    ) {
      errors.name =
        "The name of the breed should be at least 2 letters long and should start with uppercase";
    } else if (
      !input.height_Min ||
      isNaN(input.height_Min) ||
      input.height_Min < 0
    ) {
      errors.min_height = "The minimum height should be a positive number";
    } else if (
      !input.height_Max ||
      isNaN(input.height_Max) ||
      Number(input.height_Max) < input.height_Min
    ) {
      errors.max_height =
        "The maximum height should be greater than the minimum height";
    } else if (
      !input.weight_Min ||
      isNaN(input.weight_Min) ||
      input.weight_Min < 0
    ) {
      errors.min_weight = "The minimum weight should be a positive number";
    } else if (
      !input.weight_Max ||
      isNaN(input.weight_Max) ||
      Number(input.weight_Max) < input.weight_Min
    ) {
      errors.max_weight =
        "The maximum weight should be greater than the minimum weight";
    } else if (isNaN(input.life_span_Min) || input.life_span_Min < 0) {
      errors.life_span_Min =
        "The minimum life span should be a positive number";
    } else if (
      isNaN(input.life_span_Max) ||
      Number(input.life_span_Max) < input.life_span_Min
    ) {
      errors.life_span_Max =
        "The maximum life span should be greater than the minimum life span";
    } else if (!isUrlImage(input.image) && input.image.length > 0) {
      errors.image =
        "The image should be a jpg, jpeg, png, webp, avif, gif or svg";
    }
    return errors;
  }

  function validateTemps(input) {
    let errorsTemps = {};
    if (input.temperaments.length === 0 || input.temperaments.length > 5) {
      errorsTemps.temp = "Select up to 5 temperaments for the breed";
    }
    return errorsTemps;
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    const val = validate({ ...input, [e.target.name]: e.target.value });
    const valTemp = validateTemps(input);
    if (JSON.stringify(val) === "{}" && JSON.stringify(valTemp) === "{}") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setErrorsTemps(valTemp);
    setErrors(val);
  }

  function handleSelect(e) {
    console.log(input.temperaments);
    if (!input.temperaments.includes(e.target.value)) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
      const val = validate(input);
      const valTemp = validateTemps({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });

      if (JSON.stringify(val) === "{}" && JSON.stringify(valTemp) === "{}") {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
      setErrors(val);
      setErrorsTemps(valTemp);
    }
  }

  function handleDelete(t) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== t),
    });
    const val = validate(input);
    const valTemp = validateTemps({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== t),
    });
    console.log(val, valTemp);
    if (JSON.stringify(val) === "{}" && JSON.stringify(valTemp) === "{}") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
      setErrorsTemps(valTemp);
    }
    setErrors(val);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.image === "") {
      setInput({
        ...input,
        image:
          "https://cutewallpaper.org/24/dog-gif-transparent/cat-dog-gif-storyboard-on-behance.gif",
      });
    }

    dispatch(createDog(input));
    alert("Dog created successfully! =)");
    setInput({
      name: "",
      height_Min: 0,
      height_Max: 0,
      weight_Min: 0,
      weight_Max: 0,
      life_span_Max: 0,
      life_span_Min: 0,
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
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Minimum height: </label>
          <input
            type="number"
            value={input.height_Min}
            name="height_Min"
            onChange={(e) => handleChange(e)}
          />
          {errors.min_height && <p>{errors.min_height}</p>}
        </div>
        <div>
          <label>Maximum height: </label>
          <input
            type="number"
            value={input.height_Max}
            name="height_Max"
            onChange={(e) => handleChange(e)}
          />
          {errors.max_height && <p>{errors.max_height}</p>}
        </div>
        <div>
          <label>Minimum weight: </label>
          <input
            type="number"
            value={input.weight_Min}
            name="weight_Min"
            onChange={(e) => handleChange(e)}
          />
          {errors.min_weight && <p>{errors.min_weight}</p>}
        </div>
        <div>
          <label>Maximum weight: </label>
          <input
            type="number"
            value={input.weight_Max}
            name="weight_Max"
            onChange={(e) => handleChange(e)}
          />
          {errors.max_weight && <p>{errors.max_weight}</p>}
        </div>
        <div>
          <label>Life span: </label>
          {/* <input
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          /> */}
          <input
            type="number"
            value={input.life_span_Min}
            name="life_span_Min"
            onChange={(e) => handleChange(e)}
          />
          - to -
          <input
            type="number"
            value={input.life_span_Max}
            name="life_span_Max"
            onChange={(e) => handleChange(e)}
          />
          - years
          {errors.life_span_Min && <p>{errors.life_span_Min}</p>}
          {errors.life_span_Max && <p>{errors.life_span_Max}</p>}
        </div>
        <div>
          <label>Image URL: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <label> Temperaments: </label>
        <select onChange={(e) => handleSelect(e)}>
          {temperaments.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
        {input.temperaments.map((t) => (
          <h5 id={t}>
            {t} <p onClick={() => handleDelete(t)}>X</p>
          </h5>
        ))}
        {errorsTemps.temp > 0 && <p>{errorsTemps.temp}</p>}
        {/* <ul>
          {input.temperaments.map((t) => (
            <li>
              {t} <button onClick={() => handleDelete(t)}> X</button>
            </li>
          ))}
        </ul> */}

        <br></br>
        <div>
          <input
            id="create"
            name="create"
            type="submit"
            value="create Dog!"
            disabled={isdisabled}
          />
        </div>
      </form>
    </div>
  );
}
