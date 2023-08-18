import { Nav, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-secondary">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/account/login")}>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
