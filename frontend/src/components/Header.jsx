import React, {useEffect} from 'react'
import { Navbar, Nav, Container, NavDropdown, Dropdown} from 'react-bootstrap'
import { LinkContainer,Link } from 'react-router-bootstrap';
import { Provider, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {getAuthDetails} from '../store/auth'

function Header() {
   // let history = useHistory();
    const auth = useSelector(state => state.auth);
   // const auth = useSelector(getAuthDetails);

    useEffect(() => {
       // console.log(auth);
    });

    return (
        <header>
            <Navbar className="back" >
                <Container>
                    <Navbar.Brand><h2 class="sitename">Covid-19 Patient Tracker</h2></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link> */}
                        {/* <Nav.Link href="/login"><i className='fas fa-user' style={{fontSize:'15px'}}><span className='m-1'>Sign In</span></i></Nav.Link>
                        <NavDropdown title="Actions" id="basic-nav-dropdown">
                            {}
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="/hospital/patients">Patients</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
                        </NavDropdown> */}
                        {!auth.loggedIn && <LinkContainer to = '/signin'>
                            <Nav.Link className = 'navbar-item'><span>Login</span></Nav.Link>
                        </LinkContainer>}

                        {auth.loggedIn && <LinkContainer to = '/logout'>
                            <Nav.Link className = 'navbar-item'><span>Log Out</span></Nav.Link>
                        </LinkContainer>}

                        
                        {auth.loggedIn && <Dropdown className="my-2 dropdown">
                        
                        <Dropdown.Toggle   className='dropdown-toogle'>Admin</Dropdown.Toggle>

                        <Dropdown.Menu  className='dropdown-menu'>
                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/patients'>
                                    <Nav.Link ><span>Patients</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>
                            
                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/acceptanceWaiting'>
                                    <Nav.Link ><span>Acceptance Waiting</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/addPcrResults'>
                                    <Nav.Link ><span>Add PCR Results</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/aprovePcrResults'>
                                    <Nav.Link ><span>Aprove PCR Results</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/wards'>
                                    <Nav.Link ><span>Wards</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/healthMinistry/hospital'>
                                    <Nav.Link ><span>Hospitals</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>

                            <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/hospital/staffs'>
                                    <Nav.Link ><span>Staffs</span></Nav.Link>
                            </LinkContainer></Dropdown.Item>


                        </Dropdown.Menu>
                    </Dropdown>}

                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        </header>
    )
}

export default Header
