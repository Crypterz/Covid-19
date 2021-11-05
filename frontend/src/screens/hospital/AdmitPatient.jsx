import React, {useEffect, useState, Component} from 'react'
import { Container, Button, FormControl, InputGroup, Row, Card, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { loadPatients, getAllPatients, getPatientsLoadingStatus, admitPatient } from '../../store/entities/patients';

const AdmitPatient = ({history}) => {
    const dispatch = useDispatch()

    const patientsDetails = useSelector(getAllPatients);
    const patients = patientsDetails.list;
   // console.log(patients)

    const auth = useSelector(state => state.auth);
    const { admin, user } = auth.data.user
    const {wards } = admin.hospital
   // console.log(wards)
    //console.log(admin)

    const [searchKeyword, setSearchKeyword ] = useState('');
    const [patientName, setPatientName] = useState();
    const [ward, setWard] = useState(wards[0].name);
    console.log(ward)

    const serachPatient =() =>{
        const filteredPatient = getFilteredSearchedPatients(patients, searchKeyword)
        setPatientName(filteredPatient)
    }

    const AdmitPatient =() =>{
        dispatch(admitPatient(patientName[0]._id, ward))
    }

    useEffect(() => {
        if(!auth.loggedIn){
           history.push('/')
        }
        dispatch(loadPatients())
    },[dispatch, searchKeyword])


    return (
        <Container>
            <p className='m-3'>Check Whether Patient is Already Registered in the system</p>
            <Row>
                <div style={{width:'80%'}}>
                    <InputGroup id = 'search-bar' style={{padding:'0 0 10px 0', color:'blue'}}>
                    <FormControl
                        className='textBox'
                        placeholder="search patient by using name or NIC..."
                        aria-label="searchPatient"
                        aria-describedby="basic-addon2"
                        size = 'lg'
                     value = {searchKeyword}
                     onChange = { e => setSearchKeyword(e.target.value)}
                    />
                    </InputGroup>
                </div>

                <div style={{width: '15%',padding:'5px 10px'}}>
                    <Button 
                        className='text-center'
                        onClick= { ()=> serachPatient()}
                    >Search</Button>
                </div>
            </Row>
            {patientName && patientName.length !==0 &&
            <div>
                <Card style={{backgroundColor:'#0cce39', color:'#000f05', opacity:'0.5', padding:'10px', width:'80%'}}>
                    {patientName[0].name} is already registered patient
                </Card>

                <Form.Group className='mt-2 w-25'>
                    <Form.Control onChange = {(e) => {
                        if(e.target.value !== "Select ward"){
                            setWard(e.target.value);
                        }
                    }} as="select">
                    {wards.map((c,index) => <option selected={index === 0? 'slected': null}>{`${c.name}`}</option>)}
                    </Form.Control>
                </Form.Group>

                <p>{ward} is selected</p>

                <Button 
                    className='text-center my-2'
                    onClick= { ()=> AdmitPatient()}
                >Admit Patient</Button>

            </div>}

            {patientName && patientName.length ===0 &&
            <div>
                <Card style={{backgroundColor:'#fca8a4', color:'#b73333', opacity:'0.5', padding:'10px', width:'80%'}}>
                    Not Found please register patient
                </Card>
                <Button 
                    className='text-center my-2'
                    onClick= { ()=> history.push('/hospital/addPatient')}
                >Register New Patient</Button>
            </div>}


           
        </Container>

    )
}

export default AdmitPatient

function getFilteredSearchedPatients(patients, filterBy){
    let name;
    name =  patients.filter(p => 
       objectDestructure(p, "nic") === filterBy.toString()
    );
    return name
}

function objectDestructure(patient, type){
    let newList = ""
    if(typeof(patient) === 'undefined' || patient.length === 0){
        return newList
    } 

    const { nic } = patient
    if(nic){
        if(type === "nic"){
            const { nicno } = nic;
            //console.log(nicno)
            return nicno.toString()
        }
    }else{
        return newList
    }
}