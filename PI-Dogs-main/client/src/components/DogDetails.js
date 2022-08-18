import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDogDetails } from "../actions";
import Error404 from "./Error404.js"; // si no encuentro el dog muestro el 404
import LOADING from "../assets/LOADING.gif";

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
  console.log(dogDetails);
  return (
    <div>
      {dogDetails.error ? (
        <div>
          <Error404 />
        </div>
      ) : !name ? (
        <div>
          <img src={LOADING} alt="Loading" />
        </div>
      ) : (
        <div>
          <Link to="/home">
            <button>Back to Home!</button>
          </Link>
          <h1>{name}</h1>
          <img
            src={
              image
                ? image
                : "https://cutewallpaper.org/24/dog-gif-transparent/cat-dog-gif-storyboard-on-behance.gif"
            }
            alt="Image of breed not found"
          />
          <h3>Height:</h3>
          <h5>
            from {height_Min} to {height_Max} centimeters
          </h5>
          <br />
          <h3>Weight:</h3>
          <h5>
            from {weight_Min} to {weight_Max} Kilograms
          </h5>
          <br />
          <h3>Life span:</h3>
          <br />
          <h5>{life_span}</h5>
          <h3>Temperaments:</h3>
          {temperaments.map((t) => (
            <h5>{t.name}</h5>
          ))}
        </div>
      )}
      {/* ) : (
        <div>
          <img src={LOADING} alt="Loading" />
        </div>
      )} */}
    </div>
  );
}
