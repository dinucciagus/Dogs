const { Router } = require("express");
const { getAllDogs, getCreatedDog } = require("../controllers/controllers.js");
const { Dog, Temperament } = require("../db.js");
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
            // .status(404)
            .json([]);
      // .json({ error: "The indicated breed does not exists" });
    } else {
      res.status(200).json(listOfDogs);
    }
  } catch (error) {
    console.log({ error: error.message });
  }
});

dogs.post("/", async (req, res) => {
  try {
    const {
      name,
      height_Min,
      height_Max,
      weight_Min,
      weight_Max,
      life_span_Min,
      life_span_Max,
      temperaments,
      createdInDb,
      image,
    } = req.body;

    const isUrlImage = function (url) {
      return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    };

    const lettersOnlyCapitalFirst = function (str) {
      return /^[A-Z]+[a-zA-Z\s]{1,29}$/.test(str);
    };

    const onlyNumbers = function (str) {
      return /^[1-9][0-9]{0,2}$/.test(str);
    };

    let alreadyExists = await Dog.findOne({ where: { name: name } });

    if (typeof name !== "string" || !lettersOnlyCapitalFirst(name)) {
      res
        .status(400)
        .send(
          "The name of the breed should be from 2 to 30 letters long and should start with Uppercase"
        );
    } else if (alreadyExists) {
      res.status(400).send("A breed with this name already exists");
    } else if (!onlyNumbers(height_Min)) {
      res
        .status(400)
        .send("The minimum height should be a positive integer number");
    } else if (!onlyNumbers(height_Max) || Number(height_Max) < height_Min) {
      res
        .status(400)
        .send(
          "The maximum height should be a integer number greater than the minimum height"
        );
    } else if (!onlyNumbers(weight_Min)) {
      res
        .status(400)
        .send("The minimum weight should be a positive integer number");
    } else if (!onlyNumbers(weight_Max) || Number(weight_Max) < weight_Min) {
      res
        .status(400)
        .send(
          "The maximum weight should be a integer number greater than the minimum weight"
        );
    } else if (!onlyNumbers(life_span_Min)) {
      res
        .status(400)
        .send("The minimum life span should be a positive integer number");
    } else if (
      !onlyNumbers(life_span_Max) ||
      Number(life_span_Max) < life_span_Min
    ) {
      res
        .status(400)
        .send(
          "The maximum life span should be a integer number greater than the minimum life span"
        );
    } else if (!isUrlImage(image) && image.length > 0) {
      res
        .status(400)
        .send("The image should be a jpg, jpeg, png, webp, avif, gif or svg");
    } else {
      let dogCreated = await Dog.create({
        name,
        height_Min,
        height_Max,
        weight_Min,
        weight_Max,
        life_span: life_span_Min + " to " + life_span_Max + " years",
        createdInDb,
        image: image
          ? image
          : "https://cutewallpaper.org/24/dog-gif-transparent/cat-dog-gif-storyboard-on-behance.gif",
      });
      let temperamentsOfDog = await Temperament.findAll({
        where: {
          name: temperaments,
        },
      });
      dogCreated.addTemperament(temperamentsOfDog);
      res.send("Your new dog was successfully created");
    }
  } catch (error) {
    console.log({ error: error.message });
    res.send("Sorry, your dog could not be created! Try again...");
  }
});

dogs.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dog = await getCreatedDog(id);
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

dogs.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    height_Min,
    height_Max,
    weight_Min,
    weight_Max,
    life_span_Min,
    life_span_Max,
    temperaments,
    image,
  } = req.body;
  try {
    const dogUpdate = await getCreatedDog(id);
    if (!dogUpdate) {
      res.status(404).send("The selected breed does not exists");
    } else {
      const life_span = life_span_Min + " to " + life_span_Max + " years";
      await dogUpdate.update(
        {
          height_Max,
          height_Min,
          weight_Max,
          weight_Min,
          life_span,
          image: image
            ? image
            : "https://cutewallpaper.org/24/dog-gif-transparent/cat-dog-gif-storyboard-on-behance.gif",
        },
        { where: { id: id } }
      );
      let temperamentsOfDog = await Temperament.findAll({
        where: {
          name: temperaments,
        },
      });
      dogUpdate.setTemperaments(temperamentsOfDog);
      res.status(200).send("The selected breed has been updated");
    }
  } catch (error) {
    console.log({ error: error.message });
  }
});

module.exports = dogs;
