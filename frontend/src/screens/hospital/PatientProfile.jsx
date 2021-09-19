import React, {useEffect, useState} from 'react'
import {Container, Button, Card, Row, Col, Nav, Form} from 'react-bootstrap'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
//import { listPatientDetails } from '../../actions/patientActions'
import { loadPatients , getPatientById, getAllPatients, getPatientsLoadingStatus, updateTransferPatient} from '../../store/entities/patients';
import { Scrollbars } from 'react-custom-scrollbars';

const PatientProfile = ({value, history}) => {
    const dispatch = useDispatch()
    const patientId = (window.location.href.split('/')).pop()


    const patients = useSelector(getPatientById(patientId))

    const [ symptoms, setSymptoms ] = useState(['']);
    const [ drugs, setDrugs ] = useState(['']);

    const [tranferSt, transferState ] = useState('false');
    console.log(tranferSt);

    const hospitals = [{id:'1', name:'National Hospital of Sri Lanka'},{ id:'2', name:'Lady Ridgeway Hospital for Children'},
    {id:'3',name:'Castle Street Hospital for Women'}]

    const [hospitalName, setTransferHospital] = useState(hospitals[0].name)
    console.log(hospitalName)


   const patient = useSelector(getAllPatients);
  // console.log(patient)
   const patientsLoading = useSelector(getPatientsLoadingStatus);
   const [patientHistory, changeHistory ] = useState(patient[0]) 

    const transferPatient = (TransferState) => {
        const transferUpdate = {
            patientId,
            transferDetails:{
                hospitalName : hospitalName,
                transferState : TransferState
            }
        }
        dispatch(updateTransferPatient(transferUpdate));
        if(TransferState == 'pending'){
            transferState(TransferState)
        }else{
            transferState('false')
        }
        console.log(hospitalName);
    }

    // const changeHistory = (patientDetails) =>{
    //     console.log(patientDetails);
    // }

    useEffect(() => {
        dispatch(loadPatients())

        if(symptoms.length ===1 && symptoms[0] ===''){
            if(patient.length !==0){
                const selected = [patients.name];
                setSymptoms(selected);
            }
        }

        if(drugs.length ===1 && drugs[0] ===''){
            if(patient.length !==0){
                const selected = [patients.name];
                setDrugs(selected);
            }
        }
        
    }, [dispatch])

    return (

        <Container>
            <h1 style={{textAlign:'center'}}>Patient Profile</h1>
            <Col>
                <div style={{width:'100%'}}>
                    <Row>
                        <div /*className="vs-col vs-xs- vs-sm-12"*/style={{margin:'0%',width:'30%', position:'relative'}}>
                            <div className="set-animation from-left animate">
                            <Card  className="m-2" bg="#ffffff" text="black" style={{ width: '100%'}}>
                                <h3 className="m-2" style={{textAlign:'center'}}>Personal Details</h3>
                                <Card.Body>
                                    <Card.Title>Name</Card.Title>
                                    <Card.Text>{patients.name}</Card.Text>
                                    <Card.Title>Date of Birth</Card.Title>
                                    <Card.Text>{patients.name}</Card.Text>
                                    <Card.Title>Age</Card.Title>
                                    <Card.Text>{patients.age}</Card.Text>
                                    <Card.Title>Address</Card.Title>
                                    <Card.Text>{patients.name}</Card.Text>
                                    <Card.Title>Phone number</Card.Title>
                                    <Card.Text>{patients.name}</Card.Text>
                                    <Button type='submit'  className='btn btn-primary' onClick={()=> window.location=`/hospital/editProfile/${patientId}`}>Edit Profile</Button><br/><br/>
                                </Card.Body>
                            </Card>
                            </div>
                        </div>

                        <div /*className="vs-col vs-xs- vs-sm-12"*/style={{margin:'0%',width:'70%', position:'relative'}}>
                            <div className="set-animation from-left animate">
                            <Card className="m-2" bg="#ffffff" text="black" style={{ width: '100%'}}>
                                <h3 className="m-2" style={{textAlign:'center'}}>Current Details</h3>
                                <Card.Body>
                                    <Row>
                                        <div style={{width:'50%',float:'left'}}>
                                            <div className='ml-2 mb-2'>
                                                <Card.Title>Hospital Name</Card.Title>
                                                <Card.Text>{patients.name}</Card.Text>
                                                <Card.Title>Admitted Date</Card.Title>
                                                <Card.Text>{patients.name}</Card.Text>
                                                <Card.Title>Doctor</Card.Title>
                                                <Card.Text>{patients.name}</Card.Text>
                                                <Card.Title>Symptoms</Card.Title>
                                                <Card.Text>{patients.name}</Card.Text>
                                            </div>
                                        </div>

                                        <div style={{width:'50%',float:'left'}}>
                                            <div className='ml-2 mb-2'>
                                                <Card.Title>Ward No</Card.Title>
                                                <Card.Text>{patients.age}</Card.Text>
                                                <Card.Title>Discharged Date</Card.Title>
                                                <Card.Text>{patients.name}</Card.Text>
                                                <Card.Title>Transfer Details</Card.Title>
                                                <Card.Text>Hospital Name: {hospitalName} </Card.Text>
                                                <Card.Text>Transfer Status: {tranferSt} </Card.Text>
                                                <Card.Text>Transfer Date:  </Card.Text>
                                                <Card.Title>Drug Details</Card.Title>
                                                <Card.Text>{patients.name}</Card.Text>
                                            </div>
                                        </div>
                                    </Row>
                                    <Row>
                                    <br></br><Button 
                                        type='submit'  
                                        className='btn btn-primary m-2' 
                                        onClick = { () => history.push(`/hospital/editCurrentDetails/${patients._id}`)}
                                    >Update Details</Button>

                                    <br></br><Button 
                                        type='submit'  
                                        className='btn btn-primary m-2' 
                                        onClick = { () => history.push(`/hospital/editCurrentDetails/${patients._id}`)}
                                    >Discharge</Button>
                                
                                    <br></br><Col style={{marginLeft:'10%'}}>
                                        <Form.Group>
                                                <Form.Control onChange = {(e) => {
                                                    if(e.target.value !== "Select Hospital"){
                                                        setTransferHospital(e.target.value);
                                                    }
                                                }} as="select">
                                                     {hospitals.map((c,index) => <option selected={index === 0? 'slected': null}>{`${c.name}`}</option>)}
                                                </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <br></br><Row style={{float:'right', marginRight:'5px'}}>
                                        <Button className='btn btn-primary m-2' disabled={tranferSt === 'pending' ? true : false} onClick={()=>transferPatient('pending')}>Transfer</Button>
                                        <Button className='btn btn-danger m-2' disabled={tranferSt === 'false'? true : false} onClick={()=>transferPatient('canceled')}>Cancel</Button>
                                    </Row>
                                
                                    </Row>
                                </Card.Body>
                            </Card>
                            </div>
                        </div>
                       
                    </Row>
                </div>

                <div style={{width:'100%'}}>
                                            
                    <Row>
                        <div /*className="vs-col vs-xs- vs-sm-12"*/style={{margin:'0%',width:'30%', position:'relative'}}>
                            <div className="set-animation from-left animate">
                            <Card className="m-2" bg="#ffffff" text="black" style={{ width: '100%'}}>
                                <h3 className="m-2" style={{textAlign:'center'}}>Patient History</h3>
                                <Scrollbars style={{ width: '100%', height: '26rem' , border:'1px black'}}>
                                    <ul className="m-2">
                                    {patient.map( p=> 
                                        <Button 
                                            className="btn btn-light"
                                            style={{width:'80%', borderRadius:'0px'}}
                                            onClick={()=>changeHistory(p)}
                                            >{p.name}</Button>)}
                                    </ul>
                                </Scrollbars>
                            </Card>
                            </div>
                        </div>


                        <div /*className="vs-col vs-xs- vs-sm-12"*/style={{margin:'0%',width:'70%', position:'relative'}}>
                            <div className="set-animation from-left animate">
                            <Card className="m-2" bg="#ffffff" text="black" style={{ width: '100%'}}>
                                <h3 className="m-2" style={{textAlign:'center'}}>Patient History</h3>
                                <Card.Body>
                                    <Row>
                                        <div style={{width:'50%',float:'left'}}>
                                            <div className='ml-2 mb-2 details'>
                                                <Card.Title>Hospital Name</Card.Title>
                                                <Card.Text>{patientHistory.name}</Card.Text>
                                                <Card.Title>Admitted Date</Card.Title>
                                                <Card.Text>{patientHistory.name}</Card.Text>
                                                <Card.Title>Doctor</Card.Title>
                                                <Card.Text>{patientHistory.name}</Card.Text>
                                                <Card.Title>Symptomes</Card.Title>
                                                <Card.Text>{patientHistory.name}</Card.Text>
                                            </div>
                                        </div>

                                        <div style={{width:'50%',float:'left'}}>
                                            <div className='ml-2 mb-2'>
                                                <Card.Title>Ward No</Card.Title>
                                                <Card.Text>{patientHistory.age}</Card.Text>
                                                <Card.Title>Discharged Date</Card.Title>
                                                <Card.Text>{patientHistory.name}</Card.Text>
                                                <Card.Title>Transfer Details</Card.Title>
                                                <Card.Text>Hospital Name:  </Card.Text>
                                                <Card.Text>Transfer Status: </Card.Text>
                                                <Card.Text>Transfer Date:  </Card.Text>
                                                <Card.Title>Drug Details</Card.Title>
                                                <Card.Text>{patientHistory.name}</Card.Text>
                                            </div>
                                        </div>
                                    </Row>
                                </Card.Body>
                            </Card>
                            </div>
                        </div>

                    </Row>
                </div>
        </Col>
        </Container>    
    
    )
}

export default PatientProfile
