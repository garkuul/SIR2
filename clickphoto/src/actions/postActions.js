import { FETCH_POSTS, NEW_POST, GET_COMMENTS, ADD_LIKE, REMOVE_LIKE, NEW_COMMENT} from './types';

import axios from "axios";

const url = "http://localhost:3001/posts";

export const getPubs = id_user => dispatch => {
  return axios
    .get(url + "/getAll/" + id_user)
    .then(response => {
      dispatch({
        type: FETCH_POSTS,
        payload: response
      });
    })
    .catch(error => {
      console.log(error)
    });
};

export const getComments = id_pub => dispatch => {
    return axios
      .get(url + "/getComments/" + id_pub)
      .then(response => {
        dispatch({
          type: GET_COMMENTS,
          payload: response
        });
        return {comments: response};
      })
      .catch(error => {
        console.log(error)
      });
  };

  export const addlike = likedata => dispatch => {
    return axios
      .post(url + "/insertLike/", likedata)
      .then(response => {
        dispatch({
          type: ADD_LIKE,
          payload: response
        });
      })
      .catch(error => {
        return {
          valid: false
        };
      });
  };

  export const removelike = likedata => dispatch => {
    return axios
      .delete(url + "/deleteLike/", {data: {id_user: likedata.id_user, id_publicacao: likedata.id_publicacao}})
      .then(response => {
        dispatch({
          type: REMOVE_LIKE,
          payload: response
        });
      })
      .catch(error => {
        return {
          valid: false
        };
      });
  };

  export const newcomment = commentdata => dispatch => {
    return axios
      .post(url + "/insertComment/", commentdata)
      .then(response => {
        dispatch({
          type: NEW_COMMENT,
          payload: response
        });
      })
      .catch(error => {
        return {
          valid: false
        };
      });
  };

  export const newpost = postdata => dispatch => {
    return axios
      .post(url + "/insertPost/", postdata)
      .then(response => {
        dispatch({
          type: NEW_POST,
          payload: response
        });
      })
      .catch(error => {
        return {
          valid: false
        };
      });
  };