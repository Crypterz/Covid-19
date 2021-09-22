import React, {useEffect, useState} from 'react'
import {Container, Button, Card, Row, Col, Nav, Form,FormControl} from 'react-bootstrap'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
//import { listPatientDetails } from '../../actions/patientActions'
import patients, { loadPatients , getPatientById, getAllPatients, getPatientsLoadingStatus, updateTransferPatient} from '../../store/entities/patients';
import { Scrollbars } from 'react-custom-scrollbars';

const Profile =  ({value, history}) => {
    const dispatch = useDispatch()
    const patientId = (window.location.href.split('/')).pop()

    const auth = useSelector(state => state.auth);

    //const userType = 'admin'

    const patients = useSelector(getPatientById(patientId))

    const [ symptoms, setSymptoms ] = useState(['']);
    const [ drugs, setDrugs ] = useState(['']);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [tranferSt, transferState ] = useState('false');

    const hospitals = [{id:'1', name:'National Hospital of Sri Lanka'},{ id:'2', name:'Lady Ridgeway Hospital for Children'},
    {id:'3',name:'Castle Street Hospital for Women'}]

    const currentHospital_id = '4';
    const userHospital_id = '4'

    const [hospitalName, setTransferHospital] = useState(hospitals[0].name)

   const patientDetails = useSelector(getAllPatients);
   const patient = patientDetails.list
   const patientsLoading = useSelector(getPatientsLoadingStatus);
   const [filteredHistory, setFilteredHistory] = useState([])
   const [patientHistory, changeHistory ] = useState(filteredHistory) 

    const transferPatient = (TransferState) => {
        const transferUpdate = {
            patientId,
            transferDetails:{
                hospitalName : hospitalName,
                transferState : TransferState
            }
        }
        console.log(transferUpdate)
        dispatch(updateTransferPatient(transferUpdate));
        if(TransferState == 'pending'){
            transferState(TransferState)
        }else{
            transferState('false')
        }
    }

    const setDates = (date, type) =>{
        if(type === 'start'){
            setStartDate(date);
        }else{
            setEndDate(date)
        }
        //console.log(date)
    }

    const searchHistory =() =>{
        if(startDate <= endDate){
            let medicalHistories = getMedicalHistories(startDate, endDate, patient);
            changeHistory(medicalHistories)
            setFilteredHistory(medicalHistories);
        }

    }


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
            {auth.loggedIn ? 
            <div>
                <h4 style={{textAlign:'center', fontWeight:'700'}}>PATIENT PROFILE</h4>
                <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                    
                    <div className="vs-col vs-xs- vs-sm-12 vs-lg-3"style={{margin:'0%',width:'100%', position:'relative'}}>
                        <div className="set-animation from-left animate">
                                <Card  className="m-2" bg="#ffffff" text="black" style={{ width: '100%'}}>
                                    <ul className="profile-info-list mt-2">
                                    <li className="title">PERSONAL INFORMATION</li>
                                        <li>
                                            <div className="field">Name:</div>
                                            <div className="value">{patients.name}</div>
                                        </li>
                                        <li>
                                            <div className="field">Age:</div>
                                            <div className="value">{patients.age}</div>
                                        </li>
                                        <li>
                                            <div className="field">Birth of Date:</div>
                                            <div className="value">{patients.name}</div>
                                        </li>
                                        <li>
                                            <div className="field">Tel Number:</div>
                                            <div className="value">{patients.name}</div>
                                        </li>
                                        <li>
                                            <div className="field">Address:</div>
                                            <div className="value">
                                                <address className="m-b-0">
                                                    {patients.name}
                                                </address>
                                            </div>
                                        </li>

                                        {currentHospital_id === userHospital_id ? 
                                        <Button type='submit'  className='btn btn-primary' onClick={()=> window.location=`/hospital/editProfile/${patientId}`}>Edit Profile</Button>:''}
                                    </ul>
                                </Card>
                        </div>
                    </div>

                    <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                        <div className="set-animation from-left animate">
                            <Card className='m-2 con-vs-card'>
                            <h5 className="text-center mt-2 font-weight-bold">CURRENT DETAILS</h5>
                                <div style={{overflow:'auto',overflowX: 'hidden'}}>
                                    <ul className="profile-info-list">
                                        <li className='current' style={{width:'50%',float:'left',position:'relative'}}>
                                            <li>
                                                <div className="field">Hospital Name:</div>
                                                <div className="value">fwfwefw</div>
                                            </li>
                                            <li>
                                                <div className="field">Admitted Date:</div>
                                                <div className="value">55</div>
                                            </li>
                                            <li>
                                                <div className="field">Doctor:</div>
                                                <div className="value">grgrg</div>
                                            </li>
                                            <li>
                                                <div className="field">Ward No:</div>
                                                <div className="value">fwfwefw</div>
                                            </li>
                                            <li>
                                                <div className="field">Symptoms:</div>
                                                <div className="value">077123456</div>
                                            </li>
                                        </li>

                                        <li className='current' style={{width:'50%',float:'left',position:'relative'}}>
                                            <li>
                                                <div className="field">Discharged Date:</div>
                                                <div className="value">55</div>
                                            </li>
                                            <li>
                                                <div className="field">Transfer Date:</div>
                                                <div className="value m-2">Hospital Name: {hospitalName} </div>
                                                <div className="value m-2">Transfer State: </div>
                                                <div className="value m-2">Transfer Date</div>
                                            </li>
                                            <li>
                                                <div className="field">Drug Details:</div>
                                                <div className="value">077123456</div>
                                            </li>
                                        </li>
                                    </ul>
                                </div>
                                <div className='text-center m-2'>
                                {currentHospital_id === userHospital_id ? <Button 
                                        type='submit'  
                                        className='btn btn-primary m-2 text-center' 
                                        onClick = { () => history.push(`/hospital/editCurrentDetails/${patients._id}`)}
                                    >Update Details</Button> :
                                    <div>
                                        <Button className='btn btn-prymary m-2'>Accept</Button>
                                        <Button className='btn btn-danger m-2'>Decline</Button>
                                    </div> }
                                </div>
                            </Card>
                        </div>
                    </div>


                    
                    <div className="vs-col vs-xs- vs-sm-12 vs-lg-3" style={{margin:'0%',width:'100%', position:'relative'}}>
                            <div className="set-animation from-left animate">
                            {currentHospital_id === userHospital_id ? 
                                <Card className='m-2 con-vs-card text-center'>
                                    <br></br>
                                    <div className='text-center' >
                                    <Button 
                                        type='submit'  
                                        className=' w-50 text-center' 
                                        onClick = { () => history.push(`/hospital/editCurrentDetails/${patients._id}`)}
                                    >Discharge</Button></div>
                                    <hr style={{color: '#000000',backgroundColor: '#000000',height: .25,borderColor : '#000000'}}/>
                                        <Col>
                                            <h5>Change Ward</h5>
                                            <Form.Group>
                                                <Form.Control onChange = {(e) => {
                                                    if(e.target.value !== "Select Hospital"){
                                                        setTransferHospital(e.target.value);
                                                    }
                                                }} as="select">
                                                {hospitals.map((c,index) => <option selected={index === 0? 'slected': null}>{`${c.name}`}</option>)}
                                                </Form.Control>
                                            </Form.Group>
                                            <Button>Change Ward</Button>
                                        </Col>
                                    <hr style={{color: '#000000',backgroundColor: '#000000',height: .25,borderColor : '#000000'}}/>
                                    <div>
                                        <Col>
                                            <h5 >Transfer Patient</h5>
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

                                        <Button className='btn btn-primary m-2 text-center' disabled={tranferSt === 'pending' ? true : false} onClick={()=>transferPatient('pending')}>Transfer</Button>
                                        <Button className='btn btn-danger m-2 text-center' disabled={tranferSt === 'false'? true : false} onClick={()=>transferPatient('canceled')}>Cancel</Button>
                                        
                                    </div>
                                </Card> :''}
                            </div>
                    </div>
                </div>

                <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                    <div className="vs-col vs-xs vs-sm-12 vs-lg-3" style={{marginLeft:'0%',marginRight:'0%',width:'100%'}}>
                        <Card className='m-2'>
                            <h5 className="m-2 font-weight-bold" style={{textAlign:'center'}}>SEARCH MEDICAL HISTORY</h5>
                            <Form.Group as={Col} controlId='sd'>
                                <Form.Label class="float-left" className = 'form-label'>Start Date:</Form.Label>
                                <Form.Control 
                                    type='date'
                                    name='start_date' 
                                    min="1910-01-01"
                                    max= '2021-10-01'
                                    onChange={(e)=>{
                                        setDates(e.target.value, 'start')
                                    }}
                                    placeholder='Enter Date of Birth'
                                    required
                                />
                            <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId='ed'>
                                <Form.Label class="float-left" className = 'form-label'>End Date:</Form.Label>
                                <Form.Control 
                                    type='date'
                                    name='end_date' 
                                    min="1910-01-01"
                                    max= '2021-10-01'
                                   // value={value.start_date} 
                                    onChange={(e)=>{
                                        setDates(e.target.value, 'end')
                                    }}
                                    placeholder='Enter Date of Birth'
                                    required
                                />
                            <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                            </Form.Group>
                            { startDate !== '' && endDate !== '' && startDate > endDate ?
                            <Card 
                                style={{backgroundColor:'#fca8a4', color:'#b73333', opacity:'0.5', padding:'10px', margin:'5px'}}
                                className='m-2'
                            >Start date must be past to the end date</Card> : ''}
                            <Button 
                                className='btn btn-primary m-2'
                                disabled ={startDate === '' || endDate === ''}
                                onClick= {() => searchHistory()} 
                            >Search</Button>

                        </Card>
                    </div>


                    <div className="vs-col vs-xs vs-sm-12 vs-lg-6" style={{marginLeft:'0%',marginRight:'0%',width:'100%'}}>
                        <Card className='m-2'>
                        <div style={{overflow:'auto',overflowX: 'hidden'}}>
                                    <ul className="profile-info-list">
                                        <li className='current' style={{width:'50%',float:'left',position:'relative'}}>
                                            <li>
                                                <div className="field">Hospital Name:</div>
                                                {filteredHistory.length !== 0 ?
                                                <div className="value">{patientHistory.name}</div>:''}
                                            </li>
                                            <li>
                                                <div className="field">Admitted Date:</div>
                                                {filteredHistory.length !== 0 ?
                                                <div className="value">{patientHistory.age}</div>:''}
                                            </li>
                                            <li>
                                                <div className="field">Doctor:</div>
                                                {filteredHistory.length !== 0 ?
                                                <div className="value">{patientHistory.name}</div>:''}
                                            </li>
                                            <li>
                                                <div className="field">Ward No:</div>
                                                <div className="value">fwfwefw</div>
                                            </li>
                                            <li>
                                                <div className="field">Symptoms:</div>
                                                <div className="value">077123456</div>
                                            </li>
                                        </li>

                                        <li className='current' style={{width:'50%',float:'left',position:'relative'}}>
                                            <li>
                                                <div className="field">Discharged Date:</div>
                                                <div className="value">55</div>
                                            </li>
                                            <li>
                                                <div className="field">Transfer Date:</div>
                                                <div className="value m-2">Hospital Name: {hospitalName}</div>
                                                <div className="value m-2">Transfer State: </div>
                                                <div className="value m-2">Transfer Date</div>
                                            </li>
                                            <li>
                                                <div className="field">Drug Details:</div>
                                                <div className="value">077123456</div>
                                            </li>
                                        </li>
                                    </ul>
                                </div>
                        </Card>
                    </div>

                    <div className="vs-col vs-xs vs-sm-12 vs-lg-3" style={{marginLeft:'0%',marginRight:'0%',width:'100%'}}>
                    <Card className='m-2'>
                        {filteredHistory.length !== 0 ?
                        <div>
                            <h5 className='text-center m-2 font-weight-bold'>MEDICAL HISTORY LIST</h5>
                            <Scrollbars style={{ width: '100%',minHeight:'15rem', height:'auto', overflowX:'hidden', border:'1px black'}}>
                                <ul className="m-2">
                                {filteredHistory.map( p=> 
                                    <Button 
                                        className="btn btn-light"
                                        style={{width:'80%', borderRadius:'0px'}}
                                        onClick={()=>changeHistory(p)}
                                        >
                                        {p.name}
                                    </Button>)}
                                </ul>
                            </Scrollbars>
                        </div>:''}
                    </Card>
                    </div>

                </div>
            </div>: history.push('/')}
        </Container>    
    
    )
}


export default Profile


function getMedicalHistories(start_date, end_date, patient){
    console.log(start_date, end_date);
    return (patient.filter(p=> p.name.includes('OSCAR')))
}