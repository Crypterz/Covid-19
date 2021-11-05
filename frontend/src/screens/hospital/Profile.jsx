import React, {useEffect, useState} from 'react'
import {Container, Button, Card, Row, Col, Nav, Form,FormControl} from 'react-bootstrap'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import patients, { loadPatients , getPatientById, getAllPatients, getPatientsLoadingStatus, updateTransferPatient, loadPatient} from '../../store/entities/patients';
import {getAllHospitals, loadHospitals} from '../../store/entities/hospitals'
import { Scrollbars } from 'react-custom-scrollbars';
import PersonalInfo from '../../components/patientProfile/PersonalInfo'
import CurrentInfo from '../../components/patientProfile/CurrentInfo'
import Actions from '../../components/patientProfile/Actions'
import History from '../../components/patientProfile/History'
import AlertDialog from '../../components/dialog/Dialog';

const Profile =  ({match, history}) => {
    const dispatch = useDispatch()
    const patientId = match.params.id
    const auth = useSelector(state => state.auth);
    const patients = useSelector(getPatientById(patientId))
    console.log(patients)
    const hospitals = useSelector(getAllHospitals)
  //  console.log(hospitals)
    //const wardDetails = getWard(hospitals, auth.data.user.hospital_id)


    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [popup, setPopUp] = useState(false);
  //  console.log(popup)

    const currentHospital_id = '4';
    const userHospital_id = '4'

   const [filteredHistory, setFilteredHistory] = useState([])
   const [patientHistory, changeHistory ] = useState(filteredHistory) 
   const [findHistory, setfindHistory] = useState(false)


   const setDischargeHandler = () =>{
       console.log('efewfwef')
   }

    const setDates = (date, type) =>{
        if(type === 'start'){
            setStartDate(date);
        }else{
            setEndDate(date)
        }
    }

    const searchHistory =() =>{
        if(startDate <= endDate){
            let medicalHistories = getMedicalHistories(startDate, endDate, patients);
           // console.log(medicalHistories)
            changeHistory(medicalHistories)
            setFilteredHistory(medicalHistories);
            setfindHistory(true)
        }

    }


    useEffect(() => {
        if(auth.data.user.role === 'patient'){
            dispatch(loadPatient(patientId))
        }else{
          //  dispatch(loadPatients())
            dispatch(loadHospitals())
        }
        
    }, [patients ])

    return (
        <Container>
            {auth.loggedIn ? 
            <div>
                <h4 style={{textAlign:'center', fontWeight:'700'}}>PATIENT PROFILE</h4>
                <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                    
                    <div className="vs-col vs-xs- vs-sm-12 vs-lg-3"style={{margin:'0%',width:'100%', position:'relative'}}>
                        <div className="set-animation from-left animate">
                            <PersonalInfo patients={objectDestructure(patients, "user")} currentHospital={currentHospital_id}
                                userHospital={userHospital_id} id={patients ._id}>
                            </PersonalInfo>
                        </div>
                    </div>

                    <div className="vs-col vs-xs- vs-sm-12 vs-lg-6"style={{margin:'0%',width:'100%', position:'relative'}}>
                        <div className="set-animation from-left animate">
                            {objectDestructure(patients, "history").length > 0 ?
                                <CurrentInfo patients={objectDestructure(patients, "history").slice(-1)[0]} currentHospital={currentHospital_id}
                                    userHospital={userHospital_id} hospitals={hospitals}
                                ></CurrentInfo> : 

                                <CurrentInfo patients={[]} currentHospital={""}
                                    userHospital={""}
                                ></CurrentInfo>}
                        </div>
                    </div>


                    {auth.data.user.role !== 'patient' &&
                    <div className="vs-col vs-xs- vs-sm-12 vs-lg-3" style={{margin:'0%',width:'100%', position:'relative'}}>
                            <div className="set-animation from-left animate">
                            {currentHospital_id === userHospital_id ? 
                                <Actions patients={patients} hospitals={hospitals} popUpHandler={setPopUp}></Actions> :''}
                            </div>
                    </div> }
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
                                    onChange={(e)=>{
                                        setDates(e.target.value, 'start')
                                    }}
                                    required
                                />
                            <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId='ed'>
                                <Form.Label class="float-left" className = 'form-label'>End Date:</Form.Label>
                                <Form.Control 
                                    type='date'
                                    name='end_date' 
                                    onChange={(e)=>{
                                        setDates(e.target.value, 'end')
                                    }}
                                    required
                                />
                            <FormControl.Feedback type='invalid'>This field is required!</FormControl.Feedback>
                            </Form.Group>
                            
                            { startDate !== '' && endDate !== '' && startDate > endDate ?
                            <Card 
                                style={{backgroundColor:'#fca8a4', color:'#b73333', opacity:'0.5', padding:'10px', margin:'5px'}}
                                className='m-2'
                            >Start date must be past to the end date</Card> : ''}
                            { startDate !== '' && endDate !== '' && filteredHistory.length === 0 && findHistory?
                            <Card 
                                style={{backgroundColor:'#fca8a4', color:'#b73333', opacity:'0.5', padding:'10px', margin:'5px'}}
                                className='m-2'
                            >No Medical History Data</Card> : ''}
                            <Button 
                                className='btn btn-primary m-2'
                                disabled ={startDate === '' || endDate === ''}
                                onClick= {() => searchHistory()} 
                            >Search</Button>

                        </Card>
                    </div>


                    <div className="vs-col vs-xs vs-sm-12 vs-lg-6" style={{marginLeft:'0%',marginRight:'0%',width:'100%'}}>
                        <History patientHistory={patientHistory} filteredHistory={filteredHistory} hospital={getHospitalName(filteredHistory, hospitals)}></History>
                    </div>
                    
                    {filteredHistory.length !== 0 &&
                    <div className="vs-col vs-xs vs-sm-12 vs-lg-3" style={{marginLeft:'0%',marginRight:'0%',width:'100%'}}>
                    <Card className='m-2'>
                       
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
                                        {p.admittedDate}
                                    </Button>)}
                                </ul>
                            </Scrollbars>
                        </div>
                    </Card>
                    </div>}

                    

                </div>
            </div>: history.push('/')}

             <AlertDialog dialogSet={popup} closePopUp={setPopUp}  dischargeHandler={setDischargeHandler}/>
            
        </Container>    
    
    )
}


export default Profile


export function getMedicalHistories(start_date, end_date, patients){
    const histories = objectDestructure(patients, "history")
    if(histories !== ""){
        //console.log(histories)
        return histories.filter ( p=> p.admittedDate >= start_date && p.admittedDate <= end_date)
    }
    return ""
}

export function objectDestructure ( patients, type){
    let newList = ""
    if(typeof(patients) === 'undefined' || patients.length === 0){
         return newList
    } 
 
    const {medicalHistory, user } = patients
    if(user){
         if(type === "user"){
            return user
         }
    }

    if(medicalHistory){
        if(type === "history"){
           return medicalHistory
        }
    }

    return newList
}

function getHospitalName(filteredhistory, hospitals){
   // console.log(filteredhistory)
    if(filteredhistory.length === 0){
        return ""
    }
    const hospitalName = hospitals.filter(p=> p._id === filteredhistory[0].hospital)
    return hospitalName[0].name
}
