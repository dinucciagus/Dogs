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
      life_span_Min,
      life_span_Max,
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
      life_span: life_span_Min + " to " + life_span_Max + " years",
      createdInDb,
      image: image
        ? image
        : "https://cutewallpaper.org/24/dog-gif-transparent/cat-dog-gif-storyboard-on-behance.gif",
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

// function validate(dog) {
//  if(!name || !height_Min  || !height_Max || !weight_Min || !weight_Max || !life_span_Min || !temperaments ||
//   createdInDb,
//   ){}
//   else if (
//     !name ||
//     typeof name !== "string" ||
//     name.length < 2 ||
//     name[0] !== name[0].toUpperCase()
//   ) {
//     res
//       .status(400)
//       .send(
//         "The name of the breed should be at least 2 letters long and should start with uppercase"
//       );
//   } else if (
//     !input.height_Min ||
//     isNaN(input.height_Min) ||
//     input.height_Min < 0
//   ) {
//     errors.min_height = "The minimum height should be a positive number";
//   } else if (
//     !input.height_Max ||
//     isNaN(input.height_Max) ||
//     Number(input.height_Max) < input.height_Min
//   ) {
//     errors.max_height =
//       "The maximum height should be greater than the minimum height";
//   } else if (
//     !input.weight_Min ||
//     isNaN(input.weight_Min) ||
//     input.weight_Min < 0
//   ) {
//     errors.min_weight = "The minimum weight should be a positive number";
//   } else if (
//     !input.weight_Max ||
//     isNaN(input.weight_Max) ||
//     Number(input.weight_Max) < input.weight_Min
//   ) {
//     errors.max_weight =
//       "The maximum weight should be greater than the minimum weight";
//   } else if (isNaN(input.life_span_Min) || input.life_span_Min < 0) {
//     errors.life_span_Min = "The minimum life span should be a positive number";
//   } else if (
//     isNaN(input.life_span_Max) ||
//     Number(input.life_span_Max) < input.life_span_Min
//   ) {
//     errors.life_span_Max =
//       "The maximum life span should be greater than the minimum life span";
//   } else if (!isUrlImage(input.image) && input.image.length > 0) {
//     errors.image =
//       "The image should be a jpg, jpeg, png, webp, avif, gif or svg";
//   }
//   return errors;
// }

module.exports = dog;
