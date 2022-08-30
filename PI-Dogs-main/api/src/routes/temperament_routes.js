const { Router } = require("express");
const { getAllDogs, getInfoApi } = require("../controllers/controllers.js");
const { Temperament } = require("../db.js");
const temperament = Router();

temperament.get("/", async (req, res) => {
  try {
    const listTemperaments = [];
    const apiDogs = await getAllDogs();
    const temperaments = apiDogs.map((d) => d.temperaments).flat();
    temperaments?.forEach((t) => {
      if (t !== undefined) {
        if (!listTemperaments.includes(t.name)) {
          listTemperaments.push(t.name);
        }
      }
    });
    listTemperaments.forEach((t) => {
      Temperament.findOrCreate({ where: { name: t } });
    });
    const allTemperaments = await Temperament.findAll();
    res.status(200).json(allTemperaments);
  } catch (error) {
    console.log({ error: error.message });
  }
});

temperament.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    Temperament.findOrCreate({ where: { name: name } });
    res.status(200).send("Succesfully created");
  } catch (error) {
    console.log({ error: error.message });
  }
});

module.exports = temperament;
