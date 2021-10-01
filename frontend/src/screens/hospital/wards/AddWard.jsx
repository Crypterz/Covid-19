
import {Form, Button, Col, Row} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function AddWard(props){
    const [ward_name, setWardName] = useState('');
    const [total_beds, setTotalBeds] = useState('');
    const [admitted_patients, setAdmittedPatients] = useState('');
    const [empty_beds, setEmptyBeds] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: sign in action
    };

return (
              <Container maxWidth="sm" >
                  <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
                  <br />
                      <div class="col-10 mx-auto banner text-center">
                          <h3 class="text-capitalize">
                              <strong class="banner-title">Want to Add new Ward?</strong></h3>
                  
                  <Form className="form" onSubmit={submitHandler}>
                      <Form.Row>
                      <Form.Group as={Col} controlId='ward_name'>
                      <Form.Label class="float-left" className = 'form-label'><strong>WARD NAME:</strong></Form.Label>
                      <Form.Control 
                          type='text'
                          id='ward_name' 
                          onChange={(e) => setWardName(e.target.value)}
                          placeholder='Enter Ward Name'
                          required
                      />
                      </Form.Group>

                      <Form.Group as={Col} controlId='total_beds'>
                      <Form.Label class="float-left" className = 'form-label'><strong>TOTAL BEDS:</strong></Form.Label>
                      <Form.Control 
                          type='number'
                          id='total_beds' 
                          onChange={(e) => setTotalBeds(e.target.value)}
                          placeholder='Enter Total Number of Beds'
                          required
                      />
                      </Form.Group>
                     
                      <Form.Group as={Col} controlId='admitted_patients'>
                      <Form.Label class="float-left" className = 'form-label'><strong>TOTAL ADMITTED PATIENTS:</strong></Form.Label>
                      <Form.Control 
                          type='number'
                          id='total_beds' 
                          onChange={(e) => setAdmittedPatients(e.target.value)}
                          placeholder='Enter Total Number of Beds'
                          required
                      />
                      </Form.Group>

                      <Form.Group as={Col} controlId='empty_beds'>
                      <Form.Label class="float-left" className = 'form-label'><strong>EMPTY BEDS:</strong></Form.Label>
                      <Form.Control 
                          type='number'
                          id='empty_beds'  
                          onChange={(e) => setEmptyBeds(e.target.value)}
                          placeholder='Enter Number of Empty Beds'
                          required
                      />
                      </Form.Group>
                      </Form.Row>
                      <br/>
                      <Button variant="primary" type="submit">Submit</Button>
                      
                  </Form>
                  </div>
                  </Box>
              </Container>
                        
  );
}
