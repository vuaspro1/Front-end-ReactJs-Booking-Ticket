import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:81",
});

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
