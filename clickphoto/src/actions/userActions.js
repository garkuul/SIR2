import { LOGIN_USER, NEW_USER } from "./types";
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
      }else{
          return {
              valid: false
          }
      }
    })
    .catch(error => {
      return {
        valid: false
      };
    });
};

export const register = newuserdata => dispatch => {
  console.log(newuserdata)
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
