import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import {Form, Button, FormControl} from 'react-bootstrap';
//import './Login.css';

//validating empty fields for NHospital
function validate(email, password) {
    return {
        email: email.length ===0,
        password: password.length ===0,
    };
}

//email syntax
function validateEmail(email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
}

//validate password (minimum 6 characters, atleast one caps and one simple letter, one special character and one number)
// function validatePassword(password) {
//     const regpw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
//     return regpw.test(password);
// }

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {email: '',
                      password:'',

                      touched: {
                        Email: false,
                        Password: false
                    }
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    /** 
     * @desc: Validation of Email and handling blur
     */
    canBeSubmitted() {
        const errors = validate(this.state.email, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
  });
    }

    handleBlur = field => e => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    };

    handleSubmit(e){
        e.preventDefault();
        
        if (!this.canBeSubmitted()) {
            e.preventDefault();
            return;
        }

        //validates the email address syntax through the validateEmail function
        if (!validateEmail(this.state.email)){
            alert("Enter valid email address");
            this.setState({
                email: '',
                password: '',
                touched: {
                    email: false,
                    password: false
                }
            })
            return;
        }
        else{
            alert('Login Sucessfully: ' + this.state);
            console.log(this.state.email);
            console.log(this.state.password);
        }
        }   

    render() {
        //validating the fields in the nurse form whether filled or not
        const errors = validate(this.state.email, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        const shouldMarkError = field => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;
        };

        
        return (

            <Container > 

                <div class="container-fluid">
                <div class="row max-height justify-content-center align-items-center">
                    <div class="col-10 mx-auto banner text-center">
                        <h3 class="text-capitalize">
                            <strong class="banner-title">SIGN IN</strong></h3>
                            <div class="card-body register-card-body"></div>
                <Form >
                    
                    
                    <Form.Group controlId='email'>
                    <Form.Label class="float-left" className = 'form-label'>Email Address:</Form.Label>
                    <Form.Control 
                        className={shouldMarkError("Email") ? "error" : ""}
                        type='email'
                        name='email' 
                        value={this.state.email} 
                        onChange={this.onChangeEmail}
                        placeholder='janedoe@example.com'
                        onBlur={this.handleBlur("Email")}
                    />
                    <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                    </Form.Group>

                    <Form.Group controlId='password'>
                    <Form.Label class="float-left" className = 'form-label'>Password:</Form.Label>
                    <Form.Control 
                        className={shouldMarkError("Password") ? "error" : ""}
                        type='Password'
                        name='password' 
                        value={this.state.password} 
                        onChange={this.onChangePassword}
                        placeholder='Enter Your Password'
                        onBlur={this.handleBlur("Password")}
            
                    />
                    <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                    </Form.Group>

                    
                    <br/>
                    <Button class="btn btn-primary btn-sm" disabled={isDisabled} onClick={this.handleSubmit} type="submit"><span>Sign In</span></Button>
                    
                </Form></div></div></div>
            </Container>
        );
    }
}