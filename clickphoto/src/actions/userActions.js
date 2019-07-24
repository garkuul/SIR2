import {
  LOGIN_USER,
  NEW_USER,
  GET_USERS,
  GET_FOLLOWING,
  CREATE_FOLLOWER
} from "./types";
import axios from "axios";

const url = "http://localhost:3001/user";

export const login = userdata => dispatch => {
  return axios
    .post(url + "/login", userdata)
    .then(response => {
      dispatch({
        type: LOGIN_USER,
        payload: response
      });
      if (response.data) {
        return {
          valid: true,
          user: response.data
        };
      } else {
        return {
          valid: false
        };
      }
    })
    .catch(error => {
      return {
        valid: false
      };
    });
};

export const register = newuserdata => dispatch => {
  return axios
    .post(url + "/insertUser", newuserdata)
    .then(response => {
      dispatch({
        type: NEW_USER,
        payload: response
      });
    })
    .catch(error => {
      return {
        valid: false
      };
    });
};

export const getUsers = body => dispatch => {
  return axios
    .post(url + "/search", body)
    .then(response => {
      dispatch({
        type: GET_USERS,
        payload: response
      });
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};

export const getFollowing = body => dispatch => {
  return axios
    .post(url + "/getFollowing", body)
    .then(response => {
      dispatch({
        type: GET_FOLLOWING,
        payload: response
      });
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};

export const createFollower = newfollower => dispatch => {
  return axios
    .post(url + "/createFollower", newfollower)
    .then(response => {
      dispatch({
        type: CREATE_FOLLOWER,
        payload: response
      });
    })
    .catch(error => {
      return {
        valid: false
      };
    });
};
