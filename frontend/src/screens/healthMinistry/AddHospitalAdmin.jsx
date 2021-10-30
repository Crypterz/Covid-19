import Container from 'react-bootstrap/Container';
import {Form, Button, Col, FormControl, Row} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getUserAddedStatus} from '../../store/entities/users';
import { toastAction } from '../../store/toastActions';

export default function AddHospitalAdmin(props) {
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
          role: 'hospitalAdmin',
          name: {
            firstName: firstName,
            lastName: lastName
          },
          hospital_id: window.location.pathname.split('/')[3],
      }


      // TODO: sign in action
      dispatch(addUser(user))
      if(userAddedStatus.userAdded){
        dispatch(toastAction({ message: "Hospital Admin Added Successfully", type: 'info' }))
      }else{
        dispatch(toastAction({ message: "Hospital Admin Adding Failed", type: 'error' }))
      }
    console.log("HIII")
    };

    return (
            <div className="container-fluid">
                    <div className="col-10 mx-auto banner text-center">
                    <h3 className="text-capitalize">
                            <strong className="banner-title">Want to Add HOSPITAL ADMIN?</strong></h3></div>
            <Container >
                <Form className="form" onSubmit={submitHandler}>
                    <Form.Row>
                    <Form.Group controlId='firstName'>
                    <Form.Label class="float-left" className = 'form-label'>FIRST NAME:</Form.Label>
                    <Form.Control 
                        type='text'
                        id='firstName' 
                        placeholder='Enter your First Name'
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Form.Group controlId='lastName'>
                    <Form.Label class="float-left" className = 'form-label'>LAST NAME:</Form.Label>
                    <Form.Control 
                        type='text'
                        id='lastName' 
                        placeholder='Enter your Last Name'
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Form.Group controlId='email'>
                    <Form.Label class="float-left" className = 'form-label'>EMAIL ADDRESS:</Form.Label>
                    <Form.Control 
                        type='email'
                        id='email' 
                        placeholder='example@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Form.Group controlId="password">
                                <Form.Label class="float-left" className = 'form-label'>PASSWORD:</Form.Label>
                                <Form.Control
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
                                id="passwordConfirm"
                                required 
                                placeholder='Re enter Password'
                                onChange={(e) => setPasswordConfirm(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId='role'>
                        <Form.Label class="float-left" className = 'form-label'>ROLE:</Form.Label>
                        <Form.Control 
                            type='text'
                            id='role' 
                            value='Hospital Admin'
                        />
                    </Form.Group>
                            </Form.Row>
                        <div>
                        <label />
                        <Button variant="primary" type="submit">ADD HOSPITAL ADMIN</Button>
                        </div>
                </Form>
            </Container>
            
            </div>
        );
    }