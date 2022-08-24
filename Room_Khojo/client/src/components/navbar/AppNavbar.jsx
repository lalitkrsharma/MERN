import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AppNavbar.css";

const AppNavbar = ({ authContext, setAuthContext }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    setAuthContext(null);
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        className="app__navbar"
        sticky="top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src="/images/logo.png" alt="Logo" className="brand-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-4">
              <Nav.Link as={Link} to="/about">
                About Us
              </Nav.Link>
              {/* <Nav.Link href="#pricing">Bookings</Nav.Link> */}
            </Nav>

            {!authContext && (
              <Nav className="auth-link">
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </Nav>
            )}
            {authContext && (
              <Nav>
                {/* <Nav.Link as={Link} to="/about">
                  About Us
                </Nav.Link> */}
                <Nav.Link style={{ cursor: "default" }}>
                  {authContext.name}
                </Nav.Link>
                <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;

