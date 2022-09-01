import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments, getDogs } from "../actions";
import { useState } from "react";
import dogpic from "../assets/backgroundi.png";
import "./styles/Create.css";

export default function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const dogs = useSelector((state) => state.allDogs);
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
  const lettersOnlyCapitalFirst = function (str) {
    return /^[A-Z]+[a-zA-Z\s]{1,29}$/.test(str);
  };

  const onlyNumbers = function (str) {
    return /^[1-9][0-9]{0,2}$/.test(str);
  };

  function validate(input) {
    let errors = {};
    if (
      typeof input.name !== "string" ||
      !lettersOnlyCapitalFirst(input.name)
    ) {
      errors.name =
        "*The name of the breed should be from 2 to 30 letters long and should start with uppercase";
    } else if (
      dogs.find((p) => p.name.toLowerCase() === input.name.toLowerCase())
    ) {
      errors.name = "*A breed with that name already exists";
    } else if (!onlyNumbers(input.height_Min)) {
      errors.min_height =
        "*The minimum height should be a positive integer number";
    } else if (
      !onlyNumbers(input.height_Max) ||
      Number(input.height_Max) < input.height_Min
    ) {
      errors.max_height =
        "*The maximum height should be a integer number greater or equal than the minimum height";
    } else if (!onlyNumbers(input.weight_Min)) {
      errors.min_weight =
        "*The minimum weight should be a positive integer number";
    } else if (
      !onlyNumbers(input.weight_Max) ||
      Number(input.weight_Max) < input.weight_Min
    ) {
      errors.max_weight =
        "*The maximum weight should be a integer number greater or equal  than the minimum weight";
    } else if (!onlyNumbers(input.life_span_Min)) {
      errors.life_span_Min =
        "*The minimum life span should be a positive integer number";
    } else if (
      !onlyNumbers(input.life_span_Max) ||
      Number(input.life_span_Max) < input.life_span_Min
    ) {
      errors.life_span_Max =
        "*The maximum life span should be a integer number greater or equal  than the minimum life span";
    } else if (!isUrlImage(input.image) && input.image.length > 0) {
      errors.image =
        "*The image should be a jpg, jpeg, png, webp, avif, gif or svg";
    }
    return errors;
  }

  function validateTemps(input) {
    let errorsTemps = {};
    if (input.temperaments.length === 0 || input.temperaments.length > 5) {
      errorsTemps.temp = "*Select up to 5 temperaments for the breed";
    }
    return errorsTemps;
  }

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDogs());
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
    if (
      !input.temperaments.includes(e.target.value) &&
      input.temperaments.length < 5
    ) {
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
    alert("Your dog was succesfully created");
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
    <div className="Containercreate">
      <div className="createDog">
        <Link to="/home" className="Back">
          <button>Back</button>
        </Link>
        <h1 ClasName="dogTitle"> Create your dog</h1>
        <div className="errorContainer">
          {errors.name && <p className="error">{errors.name}</p>}
          {errors.min_height && <p className="error">{errors.min_height}</p>}
          {errors.max_height && <p className="error">{errors.max_height}</p>}
          {errors.min_weight && <p className="error">{errors.min_weight}</p>}
          {errors.max_weight && <p className="error">{errors.max_weight}</p>}
          {errors.life_span_Min && (
            <p className="error">{errors.life_span_Min}</p>
          )}
          {errors.life_span_Max && (
            <p className="error">{errors.life_span_Max}</p>
          )}
          {errors.image && <p className="error">{errors.image}</p>}
          {errorsTemps.temp && JSON.stringify(errors) === "{}" && (
            <p className="error">{errorsTemps.temp}</p>
          )}
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Type the breed name..."
            />
          </div>
          <div>
            <label>Minimum height: </label>
            <input
              type="number"
              value={input.height_Min}
              name="height_Min"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Maximum height: </label>
            <input
              type="number"
              value={input.height_Max}
              name="height_Max"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Minimum weight: </label>
            <input
              type="number"
              value={input.weight_Min}
              name="weight_Min"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Maximum weight: </label>
            <input
              type="number"
              value={input.weight_Max}
              name="weight_Max"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Life span: </label>
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
          </div>
          <div>
            <label>Image URL: </label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
              placeholder="Type a URL image..."
            />
          </div>
          <label> Temperaments: </label>
          <select
            disabled={input.temperaments.length > 4}
            onChange={(e) => handleSelect(e)}
          >
            {temperaments.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
          <div ClasName="listTemp">
            <ul>
              {input.temperaments.map((t) => (
                <li id={t} onClick={() => handleDelete(t)}>
                  {t} <span>X</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <input
              className="CreateButton"
              id="create"
              name="create"
              type="submit"
              value="Create dog!"
              disabled={isdisabled}
            />
          </div>
        </form>
        <img className="DogPic" src={dogpic} alt="Dog breed" />
      </div>
    </div>
  );
}
