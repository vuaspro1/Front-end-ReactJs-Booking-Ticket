import "./App.scss";
import Header from "./components/Header/Header";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import Home from "./Page/Home/Home";
import { Route, Routes } from "react-router-dom";
import ManagerUser from "./Page/ManagerUser/ManagerUser";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<ManagerUser />} />
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
