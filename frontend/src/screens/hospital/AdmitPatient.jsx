import React, {useEffect, useState, Component} from 'react'
import { Container, Button, FormControl, InputGroup, Row, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { loadPatients, getAllPatients, getPatientsLoadingStatus } from '../../store/entities/patients';

const AdmitPatient = ({history}) => {
    const dispatch = useDispatch()

    const patientsDetails = useSelector(getAllPatients);
    const patients = patientsDetails.list;
    console.log(patients)

    const auth = useSelector(state => state.auth);

    const [searchKeyword, setSearchKeyword ] = useState('');
    const [patientName, setPatientName] = useState();

    const serachPatient =() =>{
        setPatientName(getFilteredSearchedPatients(patients, searchKeyword))
    }

    const admitPatient =() =>{
        console.log('rgggegege')
    }

    useEffect(() => {
        if(!auth.loggedIn){
           // window.location('/')
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

                <Button 
                    className='text-center my-2'
                    onClick= { ()=> admitPatient()}
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
        p.name.toLowerCase() === (filterBy) //||
        //p.description.toLowerCase().includes(filterBy.toLowerCase())
       // console.log(p.name.toLowerCase())
    );
    console.log(name)
    return name
  }