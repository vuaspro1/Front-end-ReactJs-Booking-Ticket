import axios from "./axios";

const token = localStorage.getItem("token");
const fetchAllUser = (page) => {
  return axios.get(`/api/User?page=${page}&pageSize=6`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

const postCreateUser = (
  name,
  phone,
  password,
  dateOfBirth,
  address,
  userName
) => {
  return axios.post(
    "/api/User",
    {
      name,
      phone,
      password,
      dateOfBirth,
      address,
      userName,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

// const findUserById = (id) => {
//   return axios.get(`/api/User/${id}`);
// };

const findUsersBySearch = (search, page, token) => {
  return axios.get(`/api/User/${search}/users?page=${page}&pageSize=7`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

const putUpdateUser = (id, name, phone, password, dateOfBirth, address) => {
  return axios.put(
    `/api/User/${id}`,
    {
      name,
      phone,
      password,
      dateOfBirth,
      address,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

const deleteUser = (id) => {
  return axios.delete(`/api/User/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export {
  fetchAllUser,
  postCreateUser,
  putUpdateUser,
  // findUserById,
  deleteUser,
  findUsersBySearch,
};
