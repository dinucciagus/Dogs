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

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemps = useSelector((state) => state.temperaments);
  console.log(allTemps);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const iOfLastDog = currentPage * dogsPerPage;
  const iOfFirstDog = iOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(iOfFirstDog, iOfLastDog);
  const [order, setOrder] = useState("asc");
  const [wOrder, setWOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getDogs());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClickLoadDogs(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFilterTemp(e) {
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value));
  }

  function handleFilterByOrigin(e) {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
  }

  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setWOrder(`Order by ${e.target.value}`);
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Order by ${e.target.value}`);
  }

  return (
    <div>
      <h1>Dogs app</h1>
      <button>
        <Link to="/create">Create a dog</Link>
      </button>
      <button
        onClick={(e) => {
          handleClickLoadDogs(e);
        }}
      >
        Load Dogs
      </button>
      <div></div>
      <select onChange={(e) => handleOrderByName(e)}>
        <option value="title" disabled selected>
          Order by: Alphabet
        </option>
        <option value="name_asc">A-Z</option>
        <option value="name_desc">Z-A </option>
      </select>
      <select onChange={(e) => handleOrderByWeight(e)}>
        <option value="title" disabled selected>
          Order by: weight
        </option>
        <option value="weight_asc">Ascendent </option>
        <option value="weight_desc">Descendent</option>
      </select>
      <select onChange={(e) => handleFilterByOrigin(e)}>
        <option value="title" disabled selected>
          Filter by: Origin
        </option>
        <option value="all">All</option>
        <option value="created">Created</option>
        <option value="from api">Existing</option>
      </select>
      <select
        onChange={(e) => {
          handleFilterTemp(e);
        }}
      >
        <option value="title" disabled selected>
          Filter by: Temperament
        </option>
        <option value="All"> All </option>
        {allTemps.map((t) => {
          return <option value={t.name}> {t.name} </option>;
        })}
      </select>
      <Paginated
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginated={paginated}
      />
      <SearchBar />
      {currentDogs &&
        currentDogs.map((d) => {
          return (
            <Link key={d.id} to={"/home/" + d.id}>
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
  );
}
