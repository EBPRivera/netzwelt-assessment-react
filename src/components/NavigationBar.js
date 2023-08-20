import { Nav, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import useAuthorized from "../hooks/useAuthorized";
import { logout } from "../features/user";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthorized = useAuthorized();

  const handleAuthAction = () => {
    if (isAuthorized) {
      dispatch(logout());
    }
    navigate("/account/login");
  };

  const renderAuthLinks = () => {
    return (
      <Nav.Link onClick={handleAuthAction}>
        {isAuthorized ? "Logout" : "Login"}
      </Nav.Link>
    );
  };

  return (
    <Navbar expand="lg" className="bg-body-secondary">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
          </Nav>
          <Navbar.Collapse />
          <Nav>{renderAuthLinks()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
