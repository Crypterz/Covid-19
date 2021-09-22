import React, {useEffect, useState} from 'react'
//import { Alert } from 'react-alert'
import {  Formik, yupToFormErrors } from 'formik';
import {Container, Button, Card, Row, Col, Nav, Form, FormControl} from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toastAction } from '../../store/toastActions';
import { addPcr, getPcrAddedStatus } from '../../store/entities/pcr';

const AddPcrResults = ({history}) => {
    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth);

    const [nic, setnic] = useState(Yup.string().max(10, "'Invalid NIC Number. Ex:- 1234567V'")
             .matches(/[3-9]+[0-9]{8,8}(v|x)$/, 'Invalid NIC Number. Ex:- 1234567V').required('NIC number is required...'))


    const [ selectedResult, setSelectedResult ] = useState('');

    const [ schema, setSchema ] = useState({ 
        first_name : Yup.string().required('First Name is required...'),
        last_name : Yup.string().required("Last Name is required..."),
        Tel_number : Yup.string().matches(/^(?:7|0|(?:\+94))[0-9]{9,9}$/, 'Invalid Phone Number. Ex:- 0123458907')
                        .required('Phone number is required...'),
        // NIC_number : Yup.string().max(12, "'Invalid NIC Number. Ex:- 199812345678 or 1234567V'")
        //     .matches(/[3-9]+[0-9]{8,8}(v|x)$|19[3-9][0-9]{9,9}$|200[0-3][0-9]{8,8}$/, 'Invalid NIC Number. Ex:- 199812345678 or 1234567V').required('NIC number is required...'),
        NIC_number : nic,
        age : Yup.number("Age should be a number").positive().required("Age is required"),

    });

    const [initialValues, setInitialValues ] = useState({
        first_name: '',
        last_name: '',
        Tel_number:'',
        NIC_number:'',
        age:''
    });

    const submitForm = (values) => {
        const {first_name, last_name, Tel_number, NIC_number, age } = values;
        if(selectedResult !== ""){
            const Result = {
                name: first_name,
                age
                // first_name,
                // last_name,
                // Tel_number,
                // NIC_number,
                // age,
                // selectedResult
        }

        dispatch(addPcr(Result));
           // console.log(Result)
        }else{
            alert('Please select correct PCR result')
        }
       // console.log(values);
    
    }


    const [NIClength, SetNIClength] = useState(10);

    const handleSelected =(check) =>{
        if(check === true){
            schema.NIC_number = Yup.string().max(12, "'Invalid NIC Number. Ex:- 199812345678'")
             .matches(/19[3-9][0-9]{9,9}$|200[0-3][0-9]{8,8}$/, 'Invalid NIC Number. Ex:- 199812345678').required('NIC number is required...')
            SetNIClength(12)
        }if(check === false){
            schema.NIC_number = Yup.string().max(10, "'Invalid NIC Number. Ex:- 1234567V'")
             .matches(/[3-9]+[0-9]{8,8}(v|x)$/, 'Invalid NIC Number. Ex:- 1234567V').required('NIC number is required...')
            SetNIClength(10)
        }
    }

    const pcrAdded = useSelector(getPcrAddedStatus);
    useEffect(() => {
       if(pcrAdded.pcrAdded){
           console.log(pcrAdded);
           dispatch(toastAction({ message: "PCR added successfully..." , type: 'info'}))
       }else{
           console.log(pcrAdded)
       }


    }/*,[nic]*/)

    return (
        <>
        {auth.loggedIn ? 
        <Container className=' formContainer mt-3'>
        <Formik
            validationSchema = {Yup.object().shape(schema)}
            onSubmit = {submitForm}
            initialValues = {initialValues}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                dirty,
                errors
            }) => (
            <Form noValidate onSubmit={handleSubmit}>
            <h2 style={{textAlign:'center', fontWeight:'700'}}>UPDATE PCR RESULTS</h2>

            {/* <Col>
                <Row> */}
   
        <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
            <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                <div className="set-animation from-left animate">
                    <Form.Group controlId = 'firstName' className='m-2' style={{width:'100%'}}>
                        <Form.Label className = 'form-label m-2'>First Name</Form.Label>
                            <Form.Control 
                                className='textBox'
                                type='text'
                                name='first_name'
                                value={values.first_name}
                                onChange={handleChange}
                                placeholder='First Name'
                                isValid={touched.first_name && !errors.first_name}
                                isInvalid={!!errors.first_name}
                                size = {'lg'} 
                                autoComplete='disabled'
                            />
                            <FormControl.Feedback type='invalid'>{errors.first_name}</FormControl.Feedback>
                    </Form.Group>
                </div>
            </div>

            <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                <div className="set-animation from-left animate">

                    <Form.Group controlId = 'lastName' className='m-2 float-right' style={{width:'100%', float:'right'}}>
                    <Form.Label className = 'form-label m-2'>Last Name</Form.Label>
                        <Form.Control 
                            className='textBox'
                            type='text'
                            name='last_name'
                            value={values.last_name}
                            onChange={handleChange}
                            placeholder='Last Name'
                            isValid={touched.last_name && !errors.last_name}
                            isInvalid={!!errors.last_name}
                            size = {'lg'} 
                            autoComplete = 'disabled'
                        />
                        <FormControl.Feedback type='invalid'>{errors.last_name}</FormControl.Feedback>
                    </Form.Group>
                </div>
            </div>
        </div>
                {/* </Row>

                <Row> */}
        <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
            <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                <div className="set-animation from-left animate">

                    <Form.Group controlId = 'telNumber' className='m-2 float-right' style={{width:'100%', float:'right'}}>
                        <Form.Label className = 'form-label'>Telephone Number</Form.Label>
                            <Form.Control 
                                className='textBox'
                                type='text'
                                name='Tel_number'
                                value={values.Tel_number}
                                onChange={handleChange}
                                placeholder='Telephone Number'
                                isValid={touched.Tel_number && !errors.Tel_number}
                                isInvalid={!!errors.Tel_number}
                                size = {'lg'} 
                                autoComplete = 'off'
                            />
                        <FormControl.Feedback type='invalid'>{errors.Tel_number}</FormControl.Feedback>
                    </Form.Group>
                </div>
            </div>

            <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                <div className="set-animation from-left animate">

                    <Form.Group controlId = 'NicNumber' className='m-2 float-right' style={{width:'100%', float:'right'}}>
                            <Row>
                                <input 
                                    type='checkbox'
                                    style={{width:'5%', marginTop:'5px', marginLeft:'50px'}}
                                    onChange={(e) =>{
                                        let checked = e.target.checked;
                                        handleSelected(checked)
                                    }}
                                />
                                <Form.Label className = 'form-label w-75'>Please select here if new NIC Number</Form.Label> 
                            </Row>

                            <div>
                                <Form.Control 
                                    className='textBox'
                                    type='text'
                                    maxLength={NIClength}
                                    name='NIC_number'
                                    value={values.NIC_number}
                                    onChange={handleChange}
                                    placeholder='NIC Number'
                                    isValid={touched.NIC_number && !errors.NIC_number}
                                    isInvalid={!!errors.NIC_number}
                                    size = {'lg'} 
                                    autoComplete = 'disabled'
                                />
                                <FormControl.Feedback type='invalid'>{errors.NIC_number}</FormControl.Feedback>
                            </div>

                    </Form.Group>
                </div>
            </div>
        </div>
       

                {/* </Row>

                <Row> */}
        <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
            <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                <div className="set-animation from-left animate">
                   <Form.Group controlId = 'PcrResult' className='m-2 float-right' style={{width:'100%', float:'right'}}>
                        <Form.Label className = 'form-label'>PCR test result</Form.Label>
                        <Form.Control 
                                style={{height:'48px'}}
                                name='Test_result' 
                                onChange = {(e) => {
                                    setSelectedResult(e.target.value)
                                }} as="select">
                                    <option  value="">Select the PCR result </option>
                                    <option  value="positive">Positive</option>
                                    <option  value="negative">Negative</option>
                            </Form.Control>
                    </Form.Group>
                </div>
            </div>

            <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                <div className="set-animation from-left animate">

                    <Form.Group controlId = 'lastName' className='m-2 float-right' style={{width:'100%', float:'right'}}>
                    <Form.Label className = 'form-label'>Age</Form.Label>
                        <Form.Control 
                            className='textBox'
                            type='text'
                            name='age'
                            value={values.age}
                            onChange={handleChange}
                            placeholder='Age'
                            isValid={touched.age && !errors.age}
                            isInvalid={!!errors.age}
                            size = {'lg'} 
                            autoComplete = 'disabled'
                        />
                        <FormControl.Feedback type='invalid'>{errors.age}</FormControl.Feedback>
                    </Form.Group>
                </div>
            </div>
        </div>
                {/* </Row> */}

            {/* </Col> */}
            <br/><br/>
            <div class="col-md-12 text-center">
                <Button 
                    type='submit'
                    className='mb-3'
                    style={{float:'center'}}
                >
                Add PCR Results
                </Button>
            </div>
            </Form>
            )}
        </Formik>
        </Container> : history.push('/')}
        </>
    )
}

export default AddPcrResults
