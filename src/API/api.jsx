import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchData = () => {
  return api.get("/posts");
};

export const fetchIndividualPost = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);

    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
