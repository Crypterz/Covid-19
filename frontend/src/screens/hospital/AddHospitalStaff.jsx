import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import {Form, Button, FormControl} from 'react-bootstrap';

//validating empty fields for NHospital
function validate(first_name, last_name, hospital_name) {
    return {
        first_name: first_name.length ===0,
        last_name: last_name.length ===0,
        hospital_name: hospital_name.length ===0
    };
}

export default class AddHospitalStaff extends Component {
    constructor(props){
        super(props);
        this.state = {first_name: '',
                      last_name:'',
                      hospital_name:'',
    };

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeHospitalName = this.onChangeHospitalName.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    onChangeHospitalName(e) {
        const re = /^[A-Za-z\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ hospital_name: e.target.value })
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
  });
    }

    handleSubmit(e){
        e.preventDefault();
            alert('Submitted: ' + this.state);
            console.log(this.state)
        }   

    render() {
        //validating the fields in the nurse form whether filled or not
        const errors = validate(this.state.first_name, this.state.last_name, this.state.hospital_name);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        
        return (
            <Container > 
                <Form >
                    
                    <Form.Group controlId='first_name'>
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

                    <Form.Group controlId='last_name'>
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

                    <Form.Group controlId='hospital_name'>
                    <Form.Label class="float-left" className = 'form-label'>Working Hospital Name:</Form.Label>
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

                    <br/>
                    <Button variant="primary" disabled={isDisabled} onClick={this.handleSubmit} >Submit</Button>
                    
                </Form>
            </Container>
        );
    }
}