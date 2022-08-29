import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3900" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getPost = (id) => API.get(`/posts/${id}`);
export const getPosts = (page) => API.get(`/posts?page=${page}`);
export const getPostBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatedPost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

// export const getPosts = (page) => API.get(`/posts?page=${page}`);
// export const getPost = (id) => API.get(`/posts/${id}`);
// export const getPostBySearch = (searchQuery) =>
//   API.get(
//     `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
//       searchQuery.tags
//     }`
//   );

// export const createPost = (newPost) => API.post("/posts", newPost);
// export const updatedPost = (id, updatePost) =>
//   API.patch(`/posts /${id}`, updatePost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// export const signIn = (formData) => API.post("/user/signin", formData);
// export const signUp = (formData) => API.post("/user/signup", formData);
