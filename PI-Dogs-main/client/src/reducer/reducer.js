import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENTS,
  ORDER_BY_WEIGHT,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
  GET_DOGS_BY_NAME,
  CREATE_DOG,
  GET_DOG_DETAIL,
  DELETE_DOG,
  CLEAN_DETAIL,
  CLEAN_DOGS,
} from "../actions";

const initialState = {
  dogs: [],
  allDogs: [],
  dogDetails: {},
  temperaments: [],
  loading: true,
  dogsOrigin: [],
  dogsTemperaments: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
        dogsOrigin: action.payload,
        dogsTemperaments: action.payload,
      };
    case CREATE_DOG:
      return {
        ...state,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case GET_DOGS_BY_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_DOG_DETAIL:
      return {
        ...state,
        dogDetails: action.payload,
      };
    case ORDER_BY_NAME:
      let orderedDogs =
        action.payload === "name_asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : action.payload === "name_desc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            })
          : state.dogs;

      return {
        ...state,
        dogs: orderedDogs,
      };

    case ORDER_BY_WEIGHT:
      let orderDogs =
        action.payload === "weight_asc"
          ? state.dogs.sort(function (a, b) {
              return a.weight_Min - b.weight_Min;
            })
          : action.payload === "weight_desc"
          ? state.dogs.sort(function (a, b) {
              return b.weight_Min - a.weight_Min;
            })
          : state.dogs;

      return {
        ...state,
        dogs: orderDogs,
      };

    case FILTER_BY_TEMPERAMENTS:
      const allDogs = state.allDogs;
      const allDogsOrigin = state.dogsOrigin;
      const tempsFilter =
        action.payload === "All"
          ? allDogs
          : allDogs.filter((d) => {
              return d.temperaments?.find((t) => t.name === action.payload);
            });
      let intersection =
        state.dogsOrigin.length > 0
          ? tempsFilter.filter((x) => allDogsOrigin.includes(x))
          : tempsFilter;
      if (intersection.length === 0) {
        intersection = ["error"];
      }
      return {
        ...state,
        dogsTemperaments: tempsFilter,
        dogs: intersection,
      };

    case FILTER_BY_ORIGIN:
      const allDogsB = state.allDogs;
      const allDogsTemps = state.dogsTemperaments;
      const createdFilter =
        action.payload === "created"
          ? allDogsB.filter((el) => el.createdInDb)
          : allDogsB.filter((el) => !el.createdInDb);
      let intersectionB =
        state.dogsTemperaments.length > 0
          ? createdFilter.filter((x) => allDogsTemps.includes(x))
          : createdFilter;
      if (intersectionB.length === 0) {
        intersectionB = ["error"];
      }
      return {
        ...state,
        dogsOrigin: createdFilter,
        dogs: intersectionB,
      };
    case DELETE_DOG:
      return { ...state };
    case CLEAN_DETAIL:
      return { ...state, dogDetails: {} };
    case CLEAN_DOGS:
      return { ...state, dogs: [] };
    default:
      return state;
  }
}
