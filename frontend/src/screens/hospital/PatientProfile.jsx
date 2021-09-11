import React, {useEffect, useState} from 'react'
import {Container, Button, Card, Row, Col} from 'react-bootstrap'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
//import { listPatientDetails } from '../../actions/patientActions'
import { loadPatients , getPatientById} from '../../store/entities/patients';

const PatientProfile = ({value}) => {
    const dispatch = useDispatch()
    const patientId = (window.location.href.split('/')).pop()


    const patients = useSelector(getPatientById(patientId))

    useEffect(() => {
        dispatch(loadPatients())
        
    }, [dispatch])

    return (

        <Container>
            <h1>Patient Profile</h1>
            <Col className='mt-3'>
                <Row>
                    <Card bg="#ffffff" text="black" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Name</Card.Title>
                        <Card.Text>{patients.name}</Card.Text>
                        <Card.Title>Age</Card.Title>
                        <Card.Text>{patients.age}</Card.Text>
                        <Card.Title>Address</Card.Title>
                        <Card.Text>{patients.name}</Card.Text>
                        <Card.Title>Phone number</Card.Title>
                        <Card.Text>{patients.name}</Card.Text>
                        {/* {auth.loggedIn &&  !(auth.data.usertype==='Administrator' || auth.data.usertype==='Operator') && */}
                        <Button type='submit'  className='btn btn-light' onClick={()=> window.location='/editProfile'}>Edit Profile</Button><br/><br/>
                    </Card.Body>
                    </Card>

                    <Card bg="#ffffff" text="black" style={{ width: '25rem' , marginLeft:'40px'}}>
                            <Card.Body>
                            <h3 className='mb-3'>Active Details</h3>
                            <Card.Title>Hospital Name</Card.Title>
                            <Card.Text>{}</Card.Text>
                            <Card.Title>Admitted Date</Card.Title>
                            <Card.Text>{}</Card.Text>
                            <Card.Title>Reason</Card.Title>
                            <Card.Text>{}</Card.Text>
                            <Card.Title>PCR Results</Card.Title>
                            <Card.Text>{}</Card.Text>
                            {/* {auth.loggedIn &&  !(auth.data.usertype==='Administrator' || auth.data.usertype==='Operator') && */}
                            <Button type='submit'  className='btn btn-light' onClick={()=> window.location='/editDetails'}>Edit Details</Button><br/><br/>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
        </Container>    
    
    )
}

export default PatientProfile
