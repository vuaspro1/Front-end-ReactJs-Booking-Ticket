import axios from "./axios";

const fetchAllRole = (page) => {
  return axios.get(`/api/Role?page=0&pageSize=10`);
};

export { fetchAllRole };
