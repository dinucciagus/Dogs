const { Router } = require("express");
const axios = require("axios");
const { getAllDogs, getCreatedDog } = require("../controllers/controllers.js");

const dogs = Router();

dogs.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      let breedid = (await getAllDogs()).find((r) => r.id.toString() === id);
      if (breedid) {
        res.status(200).send(breedid);
      } else {
        res.status(404).send("The indicated Id has not associated breed");
      }
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
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
      breed.length > 0
        ? res.status(200).send(breed)
        : res
            .status(404)
            .json({ error: "The indicated breed does not exists" });
    } else {
      res.status(200).json(listOfDogs);
    }
  } catch (error) {
    console.log({ error: error.message });
  }
});

dogs.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dog = await getCreatedDog(id);
    console.log(dog);
    if (!dog) {
      res.status(404).send("The selected breed is not a created breed");
    } else {
      await dog.destroy();
      res.status(200).send("The selected breed was deleted");
    }
  } catch (error) {
    console.log({ error: error.message });
  }
});

module.exports = dogs;
