import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { handleLogoutRedux } from "../../redux/actions/userAction";

const Header = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(handleLogoutRedux());
    navigate("/login");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user && user.auth !== null) {
        navigate("/");
      } else {
        navigate("/login");
      }
    }
  }, [user]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {user?.auth ? (
            <Navbar.Brand href="/">Booking Ticket</Navbar.Brand>
          ) : (
            <Navbar.Brand href="/login">Booking Ticket</Navbar.Brand>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {user?.auth != null && (
              <>
                <Nav className="me-auto">
                  <NavLink
                    className="nav-link"
                    to="/"
                    activeClassName="fw-bold"
                  >
                    Home
                  </NavLink>
                  {user && user?.auth === "Manager" && (
                    <NavLink className="nav-link" to="/users">
                      Manager Users
                    </NavLink>
                  )}
                </Nav>
              </>
            )}
            <Nav>
              {user && user.auth && (
                <span className="nav-link">Welcome {user.userName}</span>
              )}
              <NavDropdown title="Setting">
                {user && user.auth != null ? (
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </NavDropdown.Item>
                ) : (
                  <NavLink to="/login" className="dropdown-item">
                    Login
                  </NavLink>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
