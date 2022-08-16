const { Router } = require("express");
const { Dog, Temperament } = require("../db.js");
const dog = Router();
const { Op } = require("sequelize");

dog.post("/", async (req, res) => {
  try {
    const {
      name,
      height_Min,
      height_Max,
      weight_Min,
      weight_Max,
      life_span,
      temperaments,
      createdInDb,
      image,
    } = req.body;
    let dogCreated = await Dog.create({
      name,
      height_Min,
      height_Max,
      weight_Min,
      weight_Max,
      life_span,
      createdInDb,
      image,
    });
    console.log(temperaments);

    let temperamentsOfDog = await Temperament.findAll({
      // where: {
      //   name: {
      //     [Op.or]: [temperaments.maps((t) => t)],
      //   },
      // },
      where: {
        name: temperaments,
      },
    });
    // console.log(temperamentsOfDog);
    dogCreated.addTemperament(temperamentsOfDog);

    res.send("Your new dog was successfully created");
  } catch (error) {
    console.log({ error: error.message });
  }
});

module.exports = dog;
