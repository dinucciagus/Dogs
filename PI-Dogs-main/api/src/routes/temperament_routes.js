const { Router } = require("express");
const { getAllDogs } = require("../controllers/controllers.js");
const { Temperament } = require("../db.js");
const temperament = Router();

temperament.get("/", async (req, res) => {
  const listTemperaments = [];
  const temperaments = (await getAllDogs()).map((d) => {
    return d.temperament;
  });
  temperaments.forEach((t) => {
    if (t !== undefined) {
      let array = t.split(", ");
      array.forEach((t) => {
        if (!listTemperaments.includes(t)) {
          listTemperaments.push(t);
        }
      });
    }
  });
  listTemperaments.forEach((t) => {
    Temperament.findOrCreate({ where: { name: t } });
  });
  const allTemperaments = await Temperament.findAll();
  if (allTemperaments) {
    res.status(200).json(allTemperaments);
  } else res.status(404).send("The temperaments have not been found");
});

module.exports = temperament;
