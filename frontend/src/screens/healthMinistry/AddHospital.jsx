import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import {Form, Button, Col, FormControl} from 'react-bootstrap';

//validating empty fields for NHospital
function validate(name, contact, city) {
    return {
        name: name.length ===0,
        contact: contact.length ===0,
        city: city.length ===0,        
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
        this.state = {name: '',
                      contact:'',
                        district:'',
                        city:'',
                        province:'',
                      
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
            this.setState({ name: e.target.value })
        }
    }

    onChangeContactNumber(e) {
        const re = /^[0-9\b]+$/; 
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ contact: e.target.value })
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

        if(!validate_contactNo(this.state.contact)){
            alert("ENTER VALID CONTACT NUMBER!!!")
        }
        else{
            alert('Submitted: ' + this.state);
            console.log(this.state)
        }
        
    }
    

    render() {
        //validating the fields in the nurse form whether filled or not
        const errors = validate(this.state.name, this.state.contact, this.state.city);
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
                    <Form.Group controlId='name'>
                    <Form.Label class="float-left" className = 'form-label'>Hospital Name:</Form.Label>
                    <Form.Control 
                        type='text'
                        name='name' 
                        value={this.state.name} 
                        onChange={this.onChangeHospitalName}
                        placeholder='Enter Hospital Name'
                        required
                    />
                    <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                    </Form.Group>

                    <Form.Group  controlId='contact'>
                    <Form.Label class="float-left" className = 'form-label' >Contact Number:</Form.Label>
                    <Form.Control 
                        type='text'
                        required
                        name='contact' 
                        value={this.state.contact} 
                        onChange={this.onChangeContactNumber}
                        placeholder='Enter Contact Number'
                        
                    />
                    <FormControl.Feedback type='invalid'>This field only takes text!</FormControl.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formCity">
                                <Form.Label class="float-left" className = 'form-label'>City:</Form.Label>
                                <Form.Control
                                type="text"
                                name="city"
                                required
                                value={this.state.city} 
                                placeholder='Enter City'
                                onChange={this.onChangeCity}/>
                                </Form.Group>

                    <Form.Row>
                            <Form.Group  as={Col} controlId="formDistrict">
                                <Form.Label class="float-left" className = 'form-label'>District:</Form.Label>
                                <Form.Control 
                                as="select" 
                                name="district" 
                                value={this.state.district} 
                                onChange={this.handleChange}
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

                            <Form.Group as = {Col} controlId="formProvince">
                                <Form.Label class="float-left" className = 'form-label' >Province:</Form.Label>
                                <Form.Control 
                                as="select" 
                                name="province" 
                                value={this.state.province} 
                                onChange={this.handleChange}
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
