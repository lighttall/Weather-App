import * as api from "../api/service";
import {
  CREATE_POST,
  GET_All,
  UPDATE_POST,
  DELETE_POST,
  GET_BY_SEARCH,
  GET_SiNGLE_POST,
} from "../constants/actionsTypes";

// actions creator//
export const getPosts = (page) => async (dispatch) => {
  try {
    const {
      data: { data, currentPages, numberOfPages },
    } = await api.getPosts(page);
    dispatch({ type: GET_All, payload: { data, currentPages, numberOfPages } });
  } catch (error) {
    console.log(error);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.getPost(id);
    dispatch({ type: GET_SiNGLE_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.getPostBySearch(searchQuery);

    dispatch({ type: GET_BY_SEARCH, payload: { data } });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const { data } = await api.createPost(newPost);

    dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatedPost(id, post);
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {}
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: "UPDATE_POST", payload: data });
  } catch (error) {
    console.log(error);
  }
};
