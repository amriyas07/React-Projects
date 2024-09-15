import {Nav,Navbar,Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
function NavBar() {
  const userLogout = ()=>{
    localStorage.setItem('authToken', '');
    window.location.reload();
  }
  return (
    <>
        <Navbar bg="dark" data-bs-theme="dark" className='py-3'>
        <Container>
          <Navbar.Brand as={Link} to="/">DEENBRO</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/list">Listuser</Nav.Link>
            <Nav.Link onClick={userLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
        </Navbar>
    </>
  )
}

export default NavBar