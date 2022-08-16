import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENTS,
  ORDER_BY_WEIGHT,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
  GET_DOGS_BY_NAME,
  CREATE_DOG,
} from "../actions";

const initialState = {
  dogs: [],
  allDogs: [],
  // dogsFilteredbyTemp :[],
  // dogsFilteredbyOrigin:[],
  dogDetails: {},
  temperaments: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
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
    // case GET_DOG_DETAILS:
    //   return {
    //     ...state,
    //     dogDetails: action.payload,
    //   };
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
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });

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
          : state.dogs.sort(function (a, b) {
              return b.weight_Min - a.weight_Min;
            });

      return {
        ...state,
        dogs: orderDogs,
      };

    case GET_TEMPERAMENTS:
      return { ...state, temperaments: action.payload };

    case FILTER_BY_TEMPERAMENTS:
      const allDogs = state.allDogs;
      console.log(allDogs);
      // console.log(allDogs[0].temperaments);
      // console.log(allDogs[0].temperaments[0]);
      // console.log(allDogs[0].temperaments.includes("Stubborn"));

      const tempsFilter =
        action.payload === "All"
          ? allDogs
          : allDogs.filter((d) => d.temperaments?.includes(action.payload));
      return {
        ...state,
        dogs: tempsFilter,
      };

    case FILTER_BY_ORIGIN:
      const allDogsB = state.allDogs;
      const createdFilter =
        action.payload === "created"
          ? allDogsB.filter((el) => el.createdInDb === true)
          : allDogsB.filter((el) => el.createdinDb !== true);
      return {
        ...state,
        dogs: action.payload === "All" ? allDogsB : createdFilter,
      };

    // case SET_LOADING:
    //   return {};
    default:
      return state;
  }
}
