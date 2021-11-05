import Container from 'react-bootstrap/Container';
import {Form, Button, Col} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
//import { toastAction } from '../../store/toastActions';
import { addUser, getUserAddedStatus } from '../../../store/entities/users';
import { toastAction } from '../../../store/toastActions';

export default function AddHospitalStaff(props){
    const dispatch = useDispatch();
    const userAddedStatus = useSelector(getUserAddedStatus);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        let user= {
            email: email,
          password: password,
          passwordConfirm: passwordConfirm,
          role: 'hospital user',
          name: {
            firstName: firstName,
            lastName: lastName
          },
         hospital_id: window.location.pathname.split('/')[3],
        }
  
        // TODO: sign in action
        dispatch(addUser(user))
        if(userAddedStatus.userAdded){
          dispatch(toastAction({ message: "Hospital Staff Added Successfully", type: 'info' }))
        }else{
          dispatch(toastAction({ message: "Hospital Staff Adding Failed", type: 'error' }))
        }
        //console.log(hospital)
      };

        return (
            <Container > 
                <Box sx={{ bgcolor: '#cfe8fc', height: '765px' }}>
                <br />
                      <div class="col-10 mx-auto banner text-center">
                          <h3 class="text-capitalize">
                              <strong class="banner-title">Want to Add Hospital Staff?</strong></h3>
                <Form className="form" onSubmit={submitHandler} >

                    <Form.Row>
                    <Form.Group as= {Col} controlId='first_name'>
                    <Form.Label class="float-left" className = 'form-label'>FIRST NAME:</Form.Label>
                    <Form.Control
                        type='text'
                        size='sm'
                        id='firstName' 
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='Enter Your First Name'
                        required
                    />
                    </Form.Group>

                    <Form.Group as= {Col} controlId='name'>
                    <Form.Label class="float-left" className = 'form-label'>LAST NAME:</Form.Label>
                    <Form.Control
                        type='text'
                        size='sm'
                        id='lastName' 
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder='Enter Your Last Name'
                        required
                    />
                    </Form.Group>

                    <Form.Group controlId='email'>
                    <Form.Label class="float-left" className = 'form-label'>EMAIL ADDRESS:</Form.Label>
                    <Form.Control 
                        type='email'
                        size='sm'
                        id='email' 
                        placeholder='example@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Form.Group controlId="password">
                                <Form.Label class="float-left" className = 'form-label'>PASSWORD:</Form.Label>
                                <Form.Control
                                size='sm'
                                type="password"
                                id="password"
                                required 
                                placeholder='Enter Password'
                                onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="passwordConfirm">
                                <Form.Label class="float-left" className = 'form-label'>RE-ENTER PASSWORD:</Form.Label>
                                <Form.Control
                                type="password"
                                size='sm'
                                id="passwordConfirm"
                                required 
                                placeholder='Re enter Password'
                                onChange={(e) => setPasswordConfirm(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId='role'>
                        <Form.Label class="float-left" className = 'form-label'>ROLE:</Form.Label>
                        <Form.Control 
                            type='text'
                            size='sm'
                            id='role' 
                            value='Hospital Staff'
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