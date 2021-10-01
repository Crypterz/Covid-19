import React, {useEffect, useState} from 'react'
import { Table, Container, Button, Row, Card} from 'react-bootstrap'
import { loadPatients, getAllPatients, getPatientsLoadingStatus, updateTransferPatient,
    updateSelectedTransferPatient} from '../../store/entities/patients';
import Loader from '../../components/Loader'
//import { paginate } from '../../utils/paginate';
//import Pagination from '../../components/Pagination';
import {getAllPcrs, loadPcrs, updatePcrAproval, getPcrLoadingStatus} from '../../store/entities/pcr';
import { useDispatch, useSelector } from 'react-redux';



const AprovePcrResults = ({history}) => {
    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth);
    console.log(auth)
    //const patientsList = useSelector(getAllPatients);
    const pcrDetails = useSelector(getAllPcrs);
    const patientsList = pcrDetails.list;

    //console.log(patientsList)
    const [patientState, setPatientState] = useState(getOnlyIds(patientsList));
   // console.log(patientState)

   // console.log(patientState)
   // const [patientState, setPatientState] = useState([...patientsList]);
    const [selected, setSelected] = useState([]);
   // console.log(selected.length, patientsList.length)
   // console.log(selected)
   // console.log(patientsList)
    const [allSelected, setAllSelected] = useState(false);
    //const patientsLoading = useSelector(getPatientsLoadingStatus);
    const patientsLoading = useSelector(getPcrLoadingStatus);


    useEffect(() => {
       // dispatch(loadPatients())
       if(!auth.loggedIn){
           window.location='/'
       }
       dispatch(loadPcrs(auth.token));

        setPatientState(
            patientsList.map( p=>{
                return {
                     select: false,
                    _id: p._id,
                    name: p.name,
                    age: p.age,
                    'tel':p.name,
                    'address':p.name
                }
            })
        )

    },[dispatch])

    const Aproval = (decision, patientId)=>{
        const updateAprove = {
            // patientId,
            // details:{
            //     aproveState : decision
            // }
            ids: [
                patientId
            ]
        }
        console.log(updateAprove)
        dispatch(updatePcrAproval(updateAprove));
        setPatientState(patientState.filter(p=>p._id !== patientId))
    }

    const AproveSelected =(dicision) =>{
        const updateAprove = {
            // dicision:dicision,
            // selectedPatients: selected
             ids : selected
        }
        console.log(updateAprove)
        dispatch(updatePcrAproval(updateAprove));
       // dispatch(updateTransferPatient(transferUpdate))
        setSelected([]);
        setPatientState(patientState.filter(p=>p.select === false))

        //console.log(selected)
    }

    const handleSelected =(value, data)=>{
        if(value === false && selected.length === patientsList.length){
            setAllSelected(false);
        }
        if(value === true && selected.length === patientsList.length-1){
            setAllSelected(true);
        }
        if(value === true){
            let selectedList = [...selected]
            let patient = patientsList.filter(p => p._id === data._id );
            selectedList.push(patient[0]._id);
            setSelected(selectedList);
        }else{
           // setSelected(selected.filter(p=>p._id !== data._id));
           setSelected(selected.filter(p=>p !== data._id));
        }
    }

    const handleSelectAll =(check)=>{
        if(check === true){
            setAllSelected(check);
            //setSelected(patientsList)
            setSelected(getOnlyIds(patientsList))
        }else{
            setAllSelected(check);
            setSelected([]);
        }
    }

    return (
        <>
        {/* {auth.loggedIn && patientsLoading && (<Loader></Loader>)}
        {auth.loggedIn ?  */}
         { patientsLoading && (<Loader></Loader>)}
        <Container>
           
            <h2 style={{textAlign:'center', marginBottom:'40px', fontWeight:'700'}}>APROVE PCR RESULTS</h2>
        {patientState.length === 0 ? <Card style={{backgroundColor:'#fca8a4', color:'#b73333', opacity:'0.5', padding:'10px'}}>No data</Card>:
        <div>
            <Row className='ml-3 mb-2'>
                <Button
                    value = {selected}
                    disabled={selected.length === 0}
                    onClick = { () => AproveSelected('accept')}
                    className="btn btn-primary w-25 mr-2"
                >Confirm Selected</Button>
                {/* <Button
                    value = {selected}
                    disabled={selected.length === 0}
                    onClick = { () => AproveSelected('declined')}
                    className="btn btn-danger w-25"
                    style={{opacity:'0.7'}}
                >Decline Selected</Button> */}
            </Row>

            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                    <th><input 
                        type='checkBox'
                        onChange ={(e) =>{
                            let checked = e.target.checked
                            setPatientState(patientState.map(p=>{
                                p.select = checked;
                                return p;
                            }))
                            handleSelectAll(checked)
                        }}
                        checked={allSelected}
                    /></th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Telephone</th>
                    <th>PCR Result</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patientState.map( p =>
                    
                        <tr>
                            {/* <td>{p._id}</td> */}
                            <td><input 
                                type='checkBox' 
                                onChange={(e) =>{
                                    let checked = e.target.checked;
                                    handleSelected(checked, p)
                                    setPatientState(patientState.map( data=>{
                                        if(data._id == p._id){
                                            data.select = checked;
                                        }
                                        return data;
                                    }))
                                }}
                                checked ={p.select}
                            /></td>
                            <td>{p.name}</td>
                            <td>{p.age}</td>
                            <td>{p.name}</td>
                            <td>{p.name}</td>
                            <td>
                                <Row>
                                    <Button 
                                        value = {p._id}
                                        onClick = { () => Aproval('accept', p._id)}
                                        className="btn btn-primary mr-2 ml-2 text-center"
                                        style={{width:'80%'}}>Confirm</Button>
                                    {/* <Button 
                                        value = {p._id}
                                        style={{opacity:'0.8'}}
                                        onClick = { () => Aproval('declined',p._id)}
                                        className="btn btn-danger text-center"
                                        style={{width:'40%',opacity:'0.7'}}>Decline</Button> */}
                                </Row>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
        }
      

        {/* <Pagination
            itemsCount = {filtered.length} 
            pageSize = {pageSize} 
            currentPage = {currentPage}
            onPageChange = {(page) => {
                setCurrentPage(page);
                setPaginated(paginate(filtered, page, pageSize));
            }}
        /> */}
        
        </Container>
        {/* : history.push('/')} */}
       

    </>
    )
}

export default AprovePcrResults

function getOnlyIds(patientsList){
    let list =[]
    for ( let i =0; i<= patientsList.length-1 ; i++){
        list.push(patientsList[i]._id)
    }
    //console.log(list)
    return list;
}
