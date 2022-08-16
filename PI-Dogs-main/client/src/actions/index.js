import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
export const CREATE_DOG = "CREATE_DOG";

export function getDogs() {
  try {
    return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/dogs");
      return dispatch({ type: GET_DOGS, payload: json.data });
    };
  } catch (error) {
    console.log({ error: error.message });
  }
}

export function createDog(payload) {
  try {
    return async function (dispatch) {
      var json = await axios.post("http://localhost:3001/dog", payload);
      return json;
    };
  } catch (error) {
    console.log({ error: error.message });
  }
}

export function getDogsByName(name) {
  try {
    return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/dogs?name=" + name);
      return dispatch({
        type: GET_DOGS_BY_NAME,
        payload: json.data,
      });
    };
  } catch (error) {
    console.log({ error: error.message });
  }
}

export function getTemperaments() {
  try {
    return async function (dispatch) {
      var info = await axios.get("http://localhost:3001/temperaments");
      return dispatch({ type: GET_TEMPERAMENTS, payload: info.data });
    };
  } catch (error) {
    console.log({ error: error.message });
  }
}

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
