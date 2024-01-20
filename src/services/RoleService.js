import axios from "./axios";

const token = localStorage.getItem("token");
const fetchAllRole = (page) => {
  return axios.get(`/api/Role?page=0&pageSize=10`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export { fetchAllRole };
