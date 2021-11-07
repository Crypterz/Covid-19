import Container from 'react-bootstrap/Container';
import {Form, Button, Col, FormControl, Row} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHospital, getHospitalAddedStatus} from '../../store/entities/hospitals';
import { toastAction } from '../../store/toastActions';

export default function AddHospital(props) {
    const dispatch = useDispatch();
    const hospitalAddedStatus = useSelector(getHospitalAddedStatus);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [userState, setUserState] = useState(false)


    const submitHandler = (e) => {
      e.preventDefault();
      let hospital= {
          name: name,
          Contact: [contact],
          address: {
              district : district,
              city : city,
              province : province
          },
      }
      dispatch(addHospital(hospital))
      setUserState(true)
    };

    useEffect(() => {
        if(hospitalAddedStatus.hospitalAdded && userState){
          setUserState(false)
          dispatch(toastAction({ message: "Hospital Added Successfully", type: 'info' }))
        }
     },[dispatch, hospitalAddedStatus])
        
    return (
            <div class="container-fluid">
                    <div class="col-10 mx-auto banner text-center">
                    <h3 class="text-capitalize">
                            <strong class="banner-title">Want to Add new Hospital?</strong></h3></div>
            <Container >
                <Form className="form" onSubmit={submitHandler}>
                    <Form.Row>
                    <Form.Group controlId='name'>
                    <Form.Label class="float-left" className = 'form-label'>Hospital Name:</Form.Label>
                    <Form.Control 
                        type='text'
                        id='name' 
                        placeholder='Enter Hospital Name'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    </Form.Group>

                    <Form.Group  controlId='contact'>
                    <Form.Label class="float-left" className = 'form-label' >Contact Number:</Form.Label>
                    <Form.Control 
                        type='number'
                        id='contact'
                        placeholder="123-45-678"  
                        //pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" 
                        required
                        onChange={(e) => setContact(e.target.value)} 
                    />
                    
                    <small>Format: 123-45-678</small> 

                    <FormControl.Feedback type='invalid'>This field only takes text!</FormControl.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formCity">
                                <Form.Label class="float-left" className = 'form-label'>City:</Form.Label>
                                <Form.Control
                                type="text"
                                id="city"
                                required 
                                placeholder='Enter City'
                                onChange={(e) => setCity(e.target.value)}/>
                                </Form.Group>
                    
                    <Form.Group  as={Col} controlId="formDistrict">
                                <Form.Label class="float-left" className = 'form-label'>District:</Form.Label>
                                <Form.Control 
                                as="select" 
                                id="district" 
                                onChange={(e) => setDistrict(e.target.value)}
                                aria-label="Default select example">
                                    <option>Select Here </option>
                                    <option value="Colombo">Colombo</option>
                                    <option value="Gampaha">Gampaha</option>
                                    <option value="Kalutara">Kalutara</option>
                                    <option value="Kandy">Kandy </option>
                                    <option value="Matale">Matale </option>
                                    <option value="Nuwera-Eliya">Nuwera-Eliya</option>
                                    <option value="Galle">Galle </option>
                                    <option value="Matara">Matara</option>
                                    <option value="Hambantota">Hambantota </option>
                                    <option value="Jaffna">Jaffna </option>
                                    <option value="Mannar">Mannar</option>
                                    <option value="Vavuniya">Vauniya </option>
                                    <option value="Mulathivu">Mulathivu </option>
                                    <option value="Kilinochchi">Kilinochchi </option>
                                    <option value="Batticaloa">Batticaloa</option>
                                    <option value="Trincomalee">Trincomalee  </option>
                                    <option value="Kurunegala">Kurunegala   </option>
                                    <option value="Puttalam">Puttalam  </option>
                                    <option value="Anuradhapura">Anuradhapura   </option>
                                    <option value="Polonnaruwa">Polonnaruwa   </option>
                                    <option value="Badulla">Badulla  </option>
                                    <option value="Monaragala">Monaragala   </option>
                                    <option value="Rathnapura">Rathnapura   </option>
                                    <option value="Kegalle">Kegalle </option>
                                    </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}  controlId="formProvince">
                                <Form.Label class="float-left" className = 'form-label' >Province:</Form.Label>
                                <Form.Control 
                                as="select" 
                                id="province" 
                                onChange={(e) => setProvince(e.target.value)}
                                aria-label="Default select example">
                                    <option>Select Here </option>
                                    <option value="Central">Central Province</option>
                                    <option value="Eastern">Eastern Province</option>
                                    <option value="Northern">Northern Province</option>
                                    <option value="Southern">Southern Province </option>
                                    <option value="Western">Western Province </option>
                                    <option value="North Western">North Western Province </option>
                                    <option value="North Central">North Central Province </option>
                                    <option value="Uva">Uva Province </option>
                                    <option value="Sabaragamuwa">Sabaragamuwa Province </option>
                                    
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        <div>
                        <label />
                        <Button variant="primary" type="submit">Submit</Button>
                        </div>
                </Form>
            </Container>
            
            </div>
            
            
        );
    }
