import {
  CREATE_POST,
  GET_All,
  UPDATE_POST,
  DELETE_POST,
  GET_BY_SEARCH,
  GET_SiNGLE_POST,
} from "../constants/actionsTypes";

export default (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_All:
      return {
        ...state,
        posts: action.payload.data,
        currentPages: action.payload.currentPages,
        numberOfPages: action.payload.numberOfPages,
      };
    case GET_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case GET_SiNGLE_POST:
      return { ...state, post: action.payload.post };

    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

// export default (state = { posts: [] }, action) => {
//   switch (action.type) {
//     case GET_All:
//       return {
//         ...state,
//         posts: action.payload.data,
//         currentPages: action.payload.currentPages,
//         numberOfPages: action.payload.numberOfPages,
//       };
//     case GET_BY_SEARCH:
//       return { ...state, posts: action.payload };
//     case GET_SiNGLE_POST:
//       return { ...state, post: action.payload };
//     case CREATE_POST:
//       return { ...state.posts, posts: [...state.posts, action.payload] };

//     case UPDATE_POST:
//       return {
//         ...state,
//         posts: state.posts.map((post) =>
//           post._id === action.payload._id ? action.payload : post
//         ),
//       };
//     case DELETE_POST:
//       return {
//         ...state,
//         posts: state.posts.filter((post) => post._id !== action.payload),
//       };

//     default:
//       return state;
//   }
// };
