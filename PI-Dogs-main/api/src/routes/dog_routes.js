const { Router } = require("express");
const { Dog, Temperament } = require("../db.js");
const dog = Router();

dog.post("/", async (req, res) => {
  const {
    name,
    height_Min,
    height_Max,
    weight_Min,
    weight_Max,
    life_span_Min,
    life_span_Max,
    temperament,
    createdInDb,
    image,
  } = req.body;
  let dogCreated = await Dog.create({
    name,
    height_Min,
    height_Max,
    weight_Min,
    weight_Max,
    life_span_Min,
    life_span_Max,
    createdInDb,
    image,
  });
  //   console.log(temperament);
  const dogTemperaments = temperament.split(", ");
  //   console.log(dogTemperaments);
  let temperaments = await Temperament.findAll({
    where: { name: dogTemperaments.map((t) => t) },
  });

  dogCreated.addTemperament(temperaments);

  res.send("Your new dog was successfully created");
});

module.exports = dog;
