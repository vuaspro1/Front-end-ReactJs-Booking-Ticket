import { Route, Routes } from "react-router-dom";
import Home from "../Page/Home/Home";
import ManagerUser from "../Page/ManagerUser/ManagerUser";
import Login from "../Page/Login/Login";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<ManagerUser />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
