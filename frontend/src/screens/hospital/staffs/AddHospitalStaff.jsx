import Container from 'react-bootstrap/Container';
import {Form, Button, Col} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';


export default function AddHospitalStaff(props){
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [hospital_name, setHospitalName] = useState('');
    const [email, setEmail] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: sign in action
    };

        return (
            <Container > 
                <Box sx={{ bgcolor: '#cfe8fc', height: '620px' }}>
                <br />
                      <div class="col-10 mx-auto banner text-center">
                          <h3 class="text-capitalize">
                              <strong class="banner-title">Want to Add Hospital Staff?</strong></h3>
                <Form className="form" onSubmit={submitHandler} >

                    <Form.Row>
                    <Form.Group as= {Col} controlId='first_name'>
                    <Form.Label class="float-left" className = 'form-label'>FIRST NAME:</Form.Label>
                    <Form.Control
                        size="sm" 
                        type='text'
                        id='first_name' 
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='Enter First Name'
                        required
                    />
                    </Form.Group>
                    <Form.Group as={Col} controlId='last_name'>
                    <Form.Label class="float-left" className = 'form-label'>LAST NAME:</Form.Label>
                    <Form.Control 
                        size="sm"
                        type='text'
                        id='last_name' 
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder='Enter Last Name'
                        required
                    />
                    </Form.Group>
                    </Form.Row>
                    
                    <Form.Row>
                    <Form.Group controlId='hospital_name'>
                    <Form.Label class="float-left" className = 'form-label'>WORKING HOSPITAL NAME:</Form.Label>
                    <Form.Control 
                        size="sm" 
                        type='text'
                        id='hospital_name' 
                        onChange={(e) => setHospitalName(e.target.value)}
                        placeholder='Enter Hospital Name'
                        required
                    />
                    </Form.Group>
                    </Form.Row>

                    <Form.Row>
                    <Form.Group controlId='email'>
                    <Form.Label class="float-left" className = 'form-label'>EMAIL:</Form.Label>
                    <Form.Control
                        size="sm"
                        type='email'
                        id='email' 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter Email'
                        required
                    />
                    </Form.Group>
                    </Form.Row>             
            
                    <div>
                        <Button variant="primary" type="submit" >Submit</Button>
                    </div>                    
                </Form>
                </div>
                </Box>
            </Container>
        );
}