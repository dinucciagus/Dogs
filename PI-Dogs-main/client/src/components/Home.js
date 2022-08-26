import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterByTemperaments,
  filterByOrigin,
  orderByWeight,
  orderByName,
} from "../actions";
import { Link } from "react-router-dom";
import DogCard from "./DogCard";
import Paginated from "./paginated";
import SearchBar from "./SearchBar";
import LOADING from "../assets/loadingdogs.gif";
import logo from "../assets/logo.png";
import "./styles/home.css";
import Error404 from "./Error404";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemps = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const max = Math.ceil(allDogs.length / dogsPerPage);
  const [inputPage, setInputPage] = useState(1);
  const [order, setOrder] = useState("");
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClickLoadDogs(e) {
    e.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1);
    setInputPage(1);
    setSelected(true);
  }

  function handleFilterTemp(e) {
    e.preventDefault();
    setCurrentPage(1);
    setInputPage(1);
    console.log(allDogs);
    dispatch(filterByTemperaments(e.target.value));
  }

  function handleFilterByOrigin(e) {
    e.preventDefault();
    setCurrentPage(1);
    setInputPage(1);
    dispatch(filterByOrigin(e.target.value));
  }

  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setOrder(`Order by ${e.target.value}`);
    setCurrentPage(1);
    setInputPage(1);
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Order by ${e.target.value}`);
    setCurrentPage(1);
    setInputPage(1);
  }

  return (
    <div className="AllContainer">
      <div className="headerHome">
        <div className="logoContainer">
          <img src={logo} alt="Logo Dogs" className="logoimg" />
        </div>
        <div className="buttonsContainer">
          <button className="buttons">
            <a className="Link" href="/create">
              Create a dog
            </a>
          </button>
          <button
            className="buttons"
            onClick={(e) => {
              handleClickLoadDogs(e);
            }}
            value="title"
          >
            Load all dogs
          </button>
        </div>
        <div className="filterContainer">
          <select defaultValue="title" onChange={(e) => handleOrderByName(e)}>
            <option value="title" disabled selected={selected}>
              Order by: Alphabet
            </option>
            <option value="name_asc">A-Z</option>
            <option value="name_desc">Z-A </option>
          </select>
          <select defaultValue="title" onChange={(e) => handleOrderByWeight(e)}>
            <option value="title" disabled selected={selected}>
              Order by: weight
            </option>
            <option value="weight_asc">Ascendent </option>
            <option value="weight_desc">Descendent</option>
          </select>
          <SearchBar
            setCurrentPage={setCurrentPage}
            setInputPage={setInputPage}
          />
          <select
            defaultValue="title"
            onChange={(e) => handleFilterByOrigin(e)}
          >
            <option value="title" disabled selected={selected}>
              Filter by: Origin
            </option>
            <option value="created">Created</option>
            <option value="from api">Existing</option>
          </select>
          <select
            defaultValue="title"
            onChange={(e) => {
              handleFilterTemp(e);
            }}
          >
            <option value="title" disabled selected={selected}>
              Filter by: Temperament
            </option>
            <option value="All"> All </option>
            {allTemps.map((t) => {
              return <option value={t.name}> {t.name} </option>;
            })}
          </select>
        </div>
      </div>
      {allDogs[0] === "error" ? (
        <h3 className="errorMatch">
          No match was found, please try another!
          <button onClick={(e) => handleClickLoadDogs(e)}>
            Load all dogs again!
          </button>
        </h3>
      ) : allDogs.length ? (
        <div className="cardsContainer">
          {allDogs
            .slice(
              (currentPage - 1) * dogsPerPage,
              (currentPage - 1) * dogsPerPage + dogsPerPage
            )
            .map((d) => {
              return (
                <Link className="Link" key={d.id} to={"/dogs/" + d.id}>
                  <DogCard
                    name={d.name}
                    image={d.image}
                    weight_Min={d.weight_Min}
                    weight_Max={d.weight_Max}
                    temperaments={d.temperaments}
                    id={d.id}
                  />
                </Link>
              );
            })}
        </div>
      ) : (
        <div className="loading">
          <img src={LOADING} alt="Loading" />
        </div>
      )}
      <Paginated
        inputPage={inputPage}
        setInputPage={setInputPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        max={max}
      />
    </div>
  );
}
