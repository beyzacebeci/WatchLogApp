import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">WatchLogApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="mx-3">
              Home
            </Nav.Link>
            <Nav.Link href="/my-movies" className="mx-3">
              My Movies
            </Nav.Link>
            <Nav.Link href="/my-tvseries" className="mx-3">
              My TV Series
            </Nav.Link>
            <Nav.Link href="/admin-panel" className="mx-3">
              Admin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
