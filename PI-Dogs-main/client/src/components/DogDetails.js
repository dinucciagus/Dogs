import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDogDetails } from "../actions";
import Error404 from "./Error404.js"; // si no encuentro el dog muestro el 404
import LOADING from "../assets/loadingdogs.gif";
import "./styles/Details.css";

export default function DogDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDogDetails(id));
  }, [dispatch, id]);

  const dogDetails = useSelector((state) => state.dogDetails);
  const {
    name,
    weight_Min,
    weight_Max,
    height_Max,
    height_Min,
    life_span,
    image,
    temperaments,
  } = dogDetails;
  return (
    <div>
      {dogDetails.error ? (
        <div>
          <Error404 />
        </div>
      ) : !name ? (
        <div className="loading">
          <img src={LOADING} alt="Loading" />
        </div>
      ) : (
        <div>
          <div>
            <Link className="bContainer" to="/home">
              <button className="b">Back to Home!</button>
            </Link>
          </div>
          <div className="details">
            <img
              src={
                image
                  ? image
                  : "https://cutewallpaper.org/24/dog-gif-transparent/cat-dog-gif-storyboard-on-behance.gif"
              }
              alt=" Dog breed"
            />
            <div className="detailText">
              <h1>{name}</h1>
              <h3>Height:</h3>
              <h5>
                from {height_Min} to {height_Max} centimeters
              </h5>
              <h3>Weight:</h3>
              <h5>
                from {weight_Min} to {weight_Max} Kilograms
              </h5>
              <h3>Life span:</h3>
              <h5>{life_span}</h5>
              <h3>Temperaments:</h3>
              <div className="temper">
                {temperaments.map((t) => (
                  <p>{t.name}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
