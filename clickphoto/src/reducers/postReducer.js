import { FETCH_POSTS, NEW_POST, GET_COMMENTS, ADD_LIKE, REMOVE_LIKE,  NEW_COMMENT} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  comments: [],
  addlike: {},
  removelike: {},
  newcomment: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case ADD_LIKE:
      return {
        ...state,
        addlike: action.payload
      }
    case REMOVE_LIKE:
        return {
          ...state,
          removelike: action.payload
        }
    case  NEW_COMMENT:
        return {
          ...state,
          newcomment: action.payload
        }
    case NEW_POST:
      return {
        ...state,
        post: action.payload
      }
    default:
      return state;
  }
}
