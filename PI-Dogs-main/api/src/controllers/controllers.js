const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");

const getInfoApi = async () => {
  try {
    const urlApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );
    const infoApi = await urlApi.data.map((el) => {
      let temp = [];
      if (el.temperament !== undefined) {
        temp = el.temperament.split(", ");
      } else temp = el.temperament;
      return {
        name: el.name,
        id: el.id,
        height_Min: parseInt(el.height.metric.split(" - ")[0]),
        height_Max: parseInt(el.height.metric.split(" - ")[1]),
        weight_Min: parseInt(el.weight.metric.split(" - ")[0]),
        weight_Max: parseInt(el.weight.metric.split(" - ")[1]),
        life_span: el.life_span,
        temperaments: temp,
        image: el.image.url,
      };
    });

    return infoApi;
  } catch (error) {
    console.log({ error: error.message });
  }
};

const getInfoDb = async () => {
  try {
    const dogs = await Dog.findAll({
      include: Temperament,
      //  {
      // model: Temperament,
      // attributes: ["name"],
      // through: {
      //   attributes: [],
      // },
      // },
    });
    return dogs;
  } catch (error) {
    console.log({ error: error.message });
  }
};

//     const info = dogs.map((el) => {
//       // let temp = el.temperament.map((te) => te.name);
//       let temp = el.temperament;
//       return {
//         id: el.id,
//         name: el.name,
//         height_Min: el.height_Min,
//         height_Max: el.height_Max,
//         weight_Min: el.weight_Min,
//         weight_Max: el.weight_Max,
//         life_span: el.life_span,
//         image: el.image,
//         createdInDb: true,
//         temperament: temp,
//       };
//     });
//     return info;
//   } catch (error) {
//     console.log(error);
//   }
// };

const getAllDogs = async () => {
  try {
    const info = (await getInfoApi()).concat(await getInfoDb());
    return info;
  } catch (error) {
    console.log({ error: error.message });
  }
};

module.exports = {
  getInfoApi,
  getInfoDb,
  getAllDogs,
};
