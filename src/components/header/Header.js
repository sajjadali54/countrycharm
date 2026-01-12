import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'

function Header({ setAddPost, setShowSearch, onCatClick }) {

  return (
    <Navbar className="nav-styling navbar navbar-expand-lg bg-primary" expand="lg">
      <Container fluid className="container-fluid nav_container ">
        <Navbar.Brand className="nav_band" href="#">Country Charm</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
            <Nav.Link className="nav_link" onClick={onCatClick} name='All' href="#action1">Home</Nav.Link>
            <Nav.Link className="nav_link" onClick={onCatClick} name='Food' href="#action2">Food</Nav.Link>

            <Nav.Link className="nav_link" onClick={onCatClick} name='Hotel' href="#action3" >Hotel</Nav.Link>
            <Nav.Link className="nav_link" onClick={onCatClick} name='Place' style={{ marginRight: '220px' }} href="#action4" >Places</Nav.Link>

            <Nav.Link className="features_link" onClick={setAddPost} >Add a Post</Nav.Link>
            <Nav.Link className="features_link" onClick={setShowSearch}>Search a Post</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>
  );
}

export default Header;
