import axios from "./axios";

const token = localStorage.getItem("token");
const postCreateUserRole = (userId, roleId) => {
  return axios.post(
    "/api/UserRole",
    {
      userId,
      roleId,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
export { postCreateUserRole };
