import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import {Form, Button, Col, FormControl} from 'react-bootstrap';

//validating empty fields for NHospital
function validate(hospital_name, contact_number, address, city, district, small_description) {
    return {
        hospital_name: hospital_name.length ===0,
        contact_number: contact_number.length ===0,
        address: address.length ===0,
        city: city.length ===0,
        district: district.length ===0,
        small_description: small_description.length ===0
    };
}

//validate tel
function validate_contactNo(tel) {
    const reg = /^(0)([0-9]{9})$/; 
    return reg.test(tel);
}



export default class AddHospital extends Component {
    constructor(props){
        super(props);
        this.state = {hospital_name: '',
                      contact_number:'',
                      address:'',
                      city:'',
                      district:'',
                      small_description:''

    };

        this.onChangeHospitalName = this.onChangeHospitalName.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeHospitalName(e) {
        const re = /^[A-Za-z\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ hospital_name: e.target.value })
        }
    }

    onChangeContactNumber(e) {
        const re = /^[0-9\b]+$/; 
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ contact_number: e.target.value })
        }
    }

    onChangeCity(e) {
        const re = /^[A-Za-z\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ city: e.target.value })
        }
    }



    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
  });
    }

    handleSubmit(e){
        e.preventDefault();

        if(!validate_contactNo(this.state.contact_number)){
            alert("ENTER VALID CONTACT NUMBER!!!")
        }
        else{
            alert('Submitted: ' + this.state);
            console.log(this.state)
        }
        
    }
    

    render() {
        //validating the fields in the nurse form whether filled or not
        const errors = validate(this.state.hospital_name, this.state.contact_number, this.state.address, this.state.city, this.state.district, this.state.small_description);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        
        return (
            <div class="container-fluid">
                <div class="row max-height justify-content-center align-items-center">
                    <div class="col-10 mx-auto banner text-center">
                        <h3 class="text-capitalize">
                            <strong class="banner-title">Want to Add new Hospital?</strong></h3>
                            <div class="card-body register-card-body"></div>
            <Container >
                
                <Form >
                    <Form.Group controlId='hospital_name'>
                    <Form.Label class="float-left" className = 'form-label'>Hospital Name:</Form.Label>
                    <Form.Control 
                        type='text'
                        name='hospital_name' 
                        value={this.state.hospital_name} 
                        onChange={this.onChangeHospitalName}
                        placeholder='Enter Hospital Name'
                        required
                    />
                    <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                    </Form.Group>

                    <Form.Group  controlId='contact_number'>
                    <Form.Label class="float-left" className = 'form-label' >Contact Number:</Form.Label>
                    <Form.Control 
                        type='text'
                        required
                        name='contact_number' 
                        value={this.state.contact_number} 
                        onChange={this.onChangeContactNumber}
                        placeholder='Enter Contact Number'
                        
                    />
                    <FormControl.Feedback type='invalid'>This field only takes text!</FormControl.Feedback>
                    </Form.Group>

                    <Form.Group  controlId="formAddress">
                            <Form.Label class="float-left" className = 'form-label'>Address:</Form.Label>
                            <Form.Control
                                type="textarea"
                                name="address"
                                required
                                value={this.state.address} 
                                onChange={this.handleChange}
                                placeholder='Enter Address'
                            />
                    <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                    </Form.Group>

                    <Form.Row>
                            <Form.Group as={Col} controlId="formCity">
                                <Form.Label class="float-left" className = 'form-label'>City:</Form.Label>
                                <Form.Control
                                type="text"
                                name="city"
                                required
                                value={this.state.city} 
                                placeholder='Enter City'
                                onChange={this.onChangeCity}
                    /></Form.Group>

<Form.Group  as={Col} controlId="formDistrict">
                                <Form.Label class="float-left" className = 'form-label'>District:</Form.Label>
                                <Form.Control 
                                as="select" 
                                name="district" 
                                value={this.state.district} 
                                onChange={this.handleChange}
                                aria-label="Default select example">
                                    <option>Select the District </option>
                                    <option value="CO">Colombo</option>
                                    <option value="AI">Kilinochchi</option>
                                    <option value="VA">Vavunia</option>
                                    <option value="JA">Jaffna</option>
                                    <option value="MU">Mullaitheevu</option>
                                    <option value="AN">Anuradhapura</option>
                                    <option value="KA">Kalutara</option>
                                    <option value="GA">Gampaha</option>
                                    <option value="HA">Hampantota</option>
                                    <option value="KU">Kurunagal</option>
                                    <option value="PU">Puttalam</option>
                                    <option value="MA">Matara</option>
                                    <option value="KA">Kandy</option>
                                    <option value="GA">Galle</option>
                                    <option value="PO">Polonaruwa</option>
                                    <option value="NU">Nuwaraeliya</option>
                                    
                                    </Form.Control>
                            </Form.Group>

                            
                        </Form.Row>
                        

                    <Form.Group  controlId='small_description'>
                    <Form.Label class="float-left" className = 'form-label'>Small Description:</Form.Label>
                    <Form.Control 
                        type='text area'
                        name='small_description' 
                        value={this.state.small_description} 
                        onChange={this.handleChange}
                        placeholder='Type Small Description:' 
                        cols={5}
                          
                    />
                    <FormControl.Feedback type='invalid'></FormControl.Feedback>
                    </Form.Group>

                    <br/>
                    <Button variant="primary" disabled={isDisabled} onClick={this.handleSubmit}>Submit</Button>
                    
                </Form>
            </Container>
            </div>
            </div>
            </div>
            
        );
    }
}