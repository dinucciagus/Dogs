import React from "react";

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
    <div key={id}>
      <h3>{name}</h3>
      <img src={image} alt="img not found" width="200px" height="200px" />
      <div>
        <h4>Weight</h4>
        <h5>
          Min: {weight_Min} - Max:{weight_Max}
        </h5>
      </div>
      <h4>Temperaments:</h4>
      <ul>
        {temperaments.map((t) => {
          return <li>{t.name}</li>;
        })}
      </ul>
    </div>
  );
}
