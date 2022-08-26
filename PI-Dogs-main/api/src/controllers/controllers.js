const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");
// const fetch = require("node-fetch");

const getInfoApi = async () => {
  try {
    const urlApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );
    const infoApi = await urlApi.data.map((el) => {
      let temp = [];
      if (el.temperament !== undefined) {
        let arrayTemp = el.temperament.split(", ");
        temp = arrayTemp.map((t) => {
          return { name: t };
        });
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

// const getInfoApi = () => {
//   try {
//     const infoApi = fetch(
//       `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
//     )
//       .then((r) => r.json())
//       .then((data) =>
//         data.map((el) => {
//           let temp = [];
//           if (el.temperament !== undefined) {
//             let arrayTemp = el.temperament.split(", ");
//             temp = arrayTemp.map((t) => {
//               return { name: t };
//             });
//           } else temp = el.temperament;
//           return {
//             name: el.name,
//             id: el.id,
//             height_Min: parseInt(el.height.metric.split(" - ")[0]),
//             height_Max: parseInt(el.height.metric.split(" - ")[1]),
//             weight_Min: parseInt(el.weight.metric.split(" - ")[0]),
//             weight_Max: parseInt(el.weight.metric.split(" - ")[1]),
//             life_span: el.life_span,
//             temperaments: temp,
//             image: el.image.url,
//           };
//         })
//       );
//     return infoApi;
//   } catch (error) {
//     console.log({ error: error.message });
//   }
// };

const getInfoDb = async () => {
  try {
    const dogs = await Dog.findAll({
      include: Temperament,
    });
    return dogs;
  } catch (error) {
    console.log({ error: error.message });
  }
};

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
