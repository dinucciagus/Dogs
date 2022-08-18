const { Router } = require("express");
const { getAllDogs, getInfoApi } = require("../controllers/controllers.js");
const { Temperament } = require("../db.js");
const temperament = Router();
const { YOUR_API_KEY } = process.env;

temperament.get("/", async (req, res) => {
  try {
    const listTemperaments = [];
    const apiDogs = await getAllDogs();
    // console.log(apiDogs);
    const temperaments = apiDogs.map((d) => d.temperaments).flat();
    // console.log("TEMPERAMENTS", temperaments);
    //temperaments es un array de arrays al momento ....
    temperaments?.forEach((t) => {
      if (t !== undefined) {
        if (!listTemperaments.includes(t.name)) {
          listTemperaments.push(t.name);
        }
      }
    });
    // console.log("LISTTEMPERAMENTS", listTemperaments);
    listTemperaments.forEach((t) => {
      Temperament.findOrCreate({ where: { name: t } });
    });
    const allTemperaments = await Temperament.findAll();
    // console.log(allTemperaments);
    res.status(200).json(allTemperaments);
  } catch (error) {
    console.log({ error: error.message });
  }
});

module.exports = temperament;
