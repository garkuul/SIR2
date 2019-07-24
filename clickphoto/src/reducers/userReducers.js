import {
  LOGIN_USER,
  NEW_USER,
  GET_USERS,
  GET_FOLLOWING,
  CREATE_FOLLOWER
} from "../actions/types";

const initialState = {
  user: {},
  searchUsers: [],
  usersFollowing: [],
  follower: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload
      };
    case NEW_USER:
      return {
        ...state,
        user: action.payload
      };
    case GET_USERS:
      return {
        ...state,
        searchUsers: action.payload
      };
    case GET_FOLLOWING:
      return {
        ...state,
        usersFollowing: action.payload
      };
    case CREATE_FOLLOWER:
      return {
        ...state,
        follower: action.payload
      };
    default:
      return state;
  }
}
