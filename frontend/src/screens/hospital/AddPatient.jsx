import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import {Form, Button, Col, FormControl} from 'react-bootstrap';
import {registerPatients} from '../../store/entities/patients'
import { toastAction } from '../../store/toastActions';
import { connect } from 'react-redux'
import auth from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';

//validating empty fields for NHospital
function validate(first_name, last_name, dob, nic, contact_number, address, city, district) {
    return {
        first_name: first_name.length ===0,
        last_name: last_name.length ===0,
        dob: dob.length ===0,
        nic: nic.length ===0,
        contact_number: contact_number.length ===0,
        address: address.length ===0,
        city: city.length ===0,
        };
}

//validate tel
function validate_contactNo(tel) {
    const reg = /^(0)([0-9]{9})$/; 
    return reg.test(tel);
}

//NIC syntax
function validateNIC(nic) {
    const regex = /^([0-9]{9})(V|v)$/;
    const regex2 = /^([0-9]{12})$/;

    if (regex.test(nic)) {
        return regex.test(nic);
    }

    else if (regex2.test(nic)) {
        return regex2.test(nic);
    }
}

class AddPatient extends Component {
    constructor(props){
        super(props);
        this.state = {first_name: '',
                      last_name:'',
                      dob:'',
                      nic:'',
                      contact_number:'',
                      address:'',
                      city:'',
                      district:'',

        // this.state = {name: 'dvdvsv',
        //               slug: 'efdffve',
        //               age: 25,
    };

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        //this.onChangeDob = this.onChangeDob.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

       // const auth = useSelector(state => state.auth);
    }

    onChangeFirstName(e) {
        const re = /^[A-Za-z\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ first_name: e.target.value })
        }
    }

    onChangeLastName(e) {
        const re = /^[A-Za-z\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ last_name: e.target.value })
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
    
    onChangeNIC(e) {
        this.setState({
            nic: e.target.value
        });
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
        else if (!validateNIC(this.state.nic)) {
            alert("Enter valid NIC number");
        }
        else{
            this.props.registerPatients(this.state);
        }
        
    }

    componentDidUpdate() {
        if(this.props.patients.patientAdded){
             this.props.addSuccessful();
        }
         
     }
    

    render() {
        //validating the fields in the nurse form whether filled or not
        const errors = validate(this.state.first_name,this.state.last_name, this.state.dob, this.state.nic, this.state.contact_number, this.state.address, this.state.city, this.state.district, this.state.small_description);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        
        return (
            <>
            {/* {auth.loggedIn ?  */}
            <div class="container-fluid">
                <div class="row max-height justify-content-center align-items-center">
                    <div class="col-10 mx-auto banner text-center">
                        <h3 class="text-capitalize">
                            <strong class="banner-title">Want to Register new Patient?</strong></h3>
                            <div class="card-body register-card-body"></div>
            <Container >
                
                <Form >
                <Form.Row>
                <Form.Group as={Col} controlId='first_name'>
                    <Form.Label class="float-left" className = 'form-label'>First Name:</Form.Label>
                    <Form.Control 
                        type='text'
                        name='first_name' 
                        value={this.state.first_name} 
                        onChange={this.onChangeFirstName}
                        placeholder='Enter First Name'
                        required
                    />
                    <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId='last_name'>
                    <Form.Label class="float-left" className = 'form-label'>Last Name:</Form.Label>
                    <Form.Control 
                        type='text'
                        name='last_name' 
                        value={this.state.last_name} 
                        onChange={this.onChangeLastName}
                        placeholder='Enter Last Name'
                        required
                    />
                    <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId='dob'>
                    <Form.Label class="float-left" className = 'form-label'>Date of Birth:</Form.Label>
                    <Form.Control 
                        type='date'
                        name='dob' 
                        min="1910-01-01"
                        max="2021-10-01"
                        value={this.state.dob} 
                        onChange={this.handleChange}
                        placeholder='Enter Date of Birth'
                        required
                    />
                    <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col}  controlId="formNIC">
                            <Form.Label class="float-left" className = 'form-label'>NIC Number:</Form.Label>
                            <Form.Control
                                type="text"
                                name="nic"
                                required
                                value={this.state.nic} 
                                onChange={this.handleChange}
                                placeholder='Enter NIC Number'
                            />
                    <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId='contact_number'>
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
                    </Form.Row>

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
                                    <option value="Vauniya">Vauniya </option>
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

                            
                        </Form.Row>

                    <br/>
                    <Button variant="primary" disabled={isDisabled} onClick={this.handleSubmit}>Submit</Button>
                    
                </Form>
            </Container>
            </div>
            </div>
            </div>
             {/* : window.location('/')}  */}
            </>
        );
    }
}

const mapStateToProps = state => ({
    patients: state.entities.patients,
});


const mapDispatchToProps = dispatch => ({
    registerPatients: (data) => dispatch(registerPatients(data)),
   // addSuccessful: () => dispatch(toastAction({ message: "Patient Added Successfully...", type: 'info' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPatient);
