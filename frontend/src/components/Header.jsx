import React from 'react'
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
//import { LinkContainer,Link } from 'react-router-bootstrap';

function Header() {
    return (
        <header>
            <Navbar className="back" >
                <Container>
                    <Navbar.Brand><h2 class="sitename">Covid-19 Patient Tracker</h2></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link> */}
                        <Nav.Link href="/login"><i className='fas fa-user' style={{fontSize:'20px'}}>Sign In</i></Nav.Link>
                        <NavDropdown title="Actions" id="basic-nav-dropdown">
                            {}
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        </header>
    )
}

export default Header
