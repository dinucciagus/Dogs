const { Router } = require("express");
const axios = require("axios");
const { getAllDogs } = require("../controllers/controllers.js");

const dogs = Router();

dogs.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    let raceid = (await getAllDogs()).find((r) => r.id.toString() === id);
    if (raceid) {
      res.status(200).json(raceid);
    } else {
      res.status(404).send("The indicated Id has not associated breed");
    }
  }
});

dogs.get("/", async (req, res) => {
  const { name } = req.query;
  let listOfDogs = await getAllDogs();
  if (name) {
    let race = await listOfDogs.filter((r) =>
      r.name.toLowerCase().includes(name.toLowerCase())
    );
    race
      ? res.status(200).send(race)
      : res.status(404).send("The indicated breed does not exists");
  } else {
    res.status(200).json(listOfDogs);
  }
});

module.exports = dogs;
