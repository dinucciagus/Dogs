import React from "react";
// import "./styles/Card.css";
import "./styles/Card.css";

export default function DogCard({
  image,
  name,
  temperaments,
  weight_Min,
  weight_Max,
  id,
}) {
  if (temperaments === undefined) {
    temperaments = ["No temperaments associated to this breed"];
  }
  return (
    <div key={id} className="card">
      <img className="img" src={image} alt="img not found" />
      <h3 className="name">{name}</h3>
      <div className="textCont">
        <div className="weight">
          <h4 className="subtitle">Weight</h4>
          <h5>
            Min: {weight_Min} - Max:{weight_Max}
          </h5>
        </div>
        <div className="temperaments">
          <h4 className="subtitle">Temperaments:</h4>
          <p>
            {temperaments.map((t) => {
              return t.name + " |  ";
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
