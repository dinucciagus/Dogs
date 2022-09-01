import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
export const CREATE_DOG = "CREATE_DOG";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const DELETE_DOG = "DELETE_DOG";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const CLEAN_DOGS = "CLEAN_DOGS";

export function getDogs() {
  return async function (dispatch) {
    try {
      var json = await axios.get("/dogs");
      return dispatch({ type: GET_DOGS, payload: json.data });
    } catch (error) {
      console.log({ error: error.message });
    }
  };
}

export function createDog(payload) {
  return async function () {
    try {
      var json = await axios.post("/dogs", payload);
      return json;
    } catch (error) {
      console.log({ error: error.message });
    }
  };
}

export function getDogsByName(name) {
  return async function (dispatch) {
    var json = await axios.get("/dogs?name=" + name);
    return dispatch({
      type: GET_DOGS_BY_NAME,
      payload: json.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      var info = await axios.get("/temperaments");
      return dispatch({ type: GET_TEMPERAMENTS, payload: info.data });
    } catch (error) {
      console.log({ error: error.message });
    }
  };
}

// export function getTemperaments() {
//   return function (dispatch) {
//     try {
//       fetch("http://localhost:3001/temperaments")
//         .then((res) => res.json())
//         .then((res) => {
//           dispatch({
//             type: "GET_TEMPERAMENTS",
//             payload: res,
//           });
//         });
//     } catch (error) {
//       console.log({ error: error.message });
//     }
//   };
// }

export function orderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function filterByTemperaments(payload) {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload,
  };
}

export function filterByOrigin(payload) {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
}

export function getDogDetails(id) {
  return async (dispatch) => {
    try {
      var json = await axios.get(`/dogs/${id}`);
      return dispatch({
        type: GET_DOG_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error.message);
      return dispatch({
        type: GET_DOG_DETAIL,
        payload: { error: error.message },
      });
    }
  };
}

export function deleteDog(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/dogs/delete/${id}`);
      return dispatch({
        type: DELETE_DOG,
      });
    } catch (error) {
      return dispatch({
        type: DELETE_DOG,
        payload: { error: error.message },
      });
    }
  };
}

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
  };
};

export const cleanDogs = () => {
  return {
    type: CLEAN_DOGS,
  };
};
