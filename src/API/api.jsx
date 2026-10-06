import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const fetchData = (skip) => {
  return api.get(`/posts?limit=3&skip=${skip}`);
};

export const fetchIndividualPost = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);

    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
