const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");

const getInfoApi = async () => {
  const urlApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  );
  const infoApi = await urlApi.data.map((el) => {
    return {
      name: el.name,
      id: el.id,
      height_Min: parseInt(el.height.metric.split(" - ")[0]),
      height_Max: parseInt(el.height.metric.split(" - ")[1]),
      weight_Min: parseInt(el.weight.metric.split(" - ")[0]),
      weight_Max: parseInt(el.weight.metric.split(" - ")[1]),
      life_span_Min: parseInt(el.life_span.split(" ")[0]),
      life_span_Max: parseInt(el.life_span.split(" ")[2]),
      temperament: el.temperament,
      image: el.image.url,
    };
  });
  return infoApi;
};

const getInfoDb = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  const info = (await getInfoApi()).concat(await getInfoDb());
  return info;
};

module.exports = {
  getInfoApi,
  getInfoDb,
  getAllDogs,
};
