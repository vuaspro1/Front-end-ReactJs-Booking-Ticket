import axios from "./axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/User?page=${page}&pageSize=10`);
};

const postCreateUser = (
  name,
  phone,
  password,
  dateOfBirth,
  address,
  userName
) => {
  return axios.post("/api/User", {
    name,
    phone,
    password,
    dateOfBirth,
    address,
    userName,
  });
};

const findUserById = (id) => {
  return axios.get(`/api/User/${id}`);
};

const putUpdateUser = (id, name, phone, password, dateOfBirth, address) => {
  return axios.put(`/api/User/${id}`, {
    name,
    phone,
    password,
    dateOfBirth,
    address,
  });
};

const deleteUser = (id) => {
  return axios.delete(`/api/User/${id}`);
};

export {
  fetchAllUser,
  postCreateUser,
  putUpdateUser,
  findUserById,
  deleteUser,
};
