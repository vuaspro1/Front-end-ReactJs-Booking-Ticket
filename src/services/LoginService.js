import axios from "./axios";

const loginApi = (userName, password) => {
  return axios.post("/api/Login/Login", { userName, password });
};
export default loginApi;
