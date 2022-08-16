const { Router } = require("express");
const axios = require("axios");
const { getAllDogs } = require("../controllers/controllers.js");

const dogs = Router();

dogs.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      let raceid = (await getAllDogs()).find((r) => r.id.toString() === id);
      if (raceid) {
        res.status(200).json(raceid);
      } else {
        res.status(404).send("The indicated Id has not associated breed");
      }
    }
  } catch (error) {
    console.log({ error: error.message });
  }
});

dogs.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let listOfDogs = await getAllDogs();
    if (name) {
      let breed = await listOfDogs.filter((b) =>
        b.name.toLowerCase().includes(name.toLowerCase())
      );
      breed
        ? res.status(200).send(breed)
        : res.status(404).send("The indicated breed does not exists");
    } else {
      res.status(200).json(listOfDogs);
    }
  } catch (error) {
    console.log({ error: error.message });
  }
});

module.exports = dogs;
