import axios from "./axios";

const postCreateUserRole = (userId, roleId) => {
  return axios.post("/api/UserRole", {
    userId,
    roleId,
  });
};
export { postCreateUserRole };
