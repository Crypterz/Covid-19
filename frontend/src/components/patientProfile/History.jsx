import React, {useEffect, useState} from 'react'
import {Card} from 'react-bootstrap'
import { loadPatients , getPatientById, getAllPatients, getPatientsLoadingStatus, updateTransferPatient, loadPatient} from '../../store/entities/patients';

const History = ({patientHistory, filteredHistory}) => {
   // console.log(patientHistory)
   // console.log(filteredHistory)
    // const dispatch = useDispatch()
    // const patientDetails = useSelector(getAllPatients);
    // const patient = patientDetails.list
    // const patientsLoading = useSelector(getPatientsLoadingStatus);
    // const [filteredHistory, setFilteredHistory] = useState([])
    // const [patientHistory, changeHistory ] = useState(filteredHistory) 

    return (
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
                            <div className="value">{patientHistory.admittedDate}</div>:''}
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
                            {objectDestructure(patientHistory, "symptoms").length > 0 ? 
                            <ul className="value">
                                {objectDestructure(patientHistory, "symptoms").map(p=> 
                                    <li>{p.date} - {p.description}</li>
                                )}
                            </ul> 
                            
                            : "No data"}
                        </li>
                    </li>

                    <li className='current' style={{width:'50%',float:'left',position:'relative'}}>
                        <li>
                            <div className="field">Discharged Date:</div>
                            <div className="value">55</div>
                        </li>
                        <li>
                            <div className="field">Transfer Date:</div>
                            <div className="value m-2">Hospital Name:</div>
                            <div className="value m-2">Transfer State: </div>
                            <div className="value m-2">Transfer Date</div>
                        </li>
                        <li>
                            <div className="field">Drug Details:</div>
                            {objectDestructure(patientHistory, "drugs").length > 0 ? 
                            <ul className="value">
                                {objectDestructure(patientHistory, "drugs").map(p=> 
                                    <li>{p.date} - {p.description}</li>
                                )}
                            </ul> 
                            
                            : "No data"}
                        </li>
                    </li>
                </ul>
            </div>
        </Card>
    )
}

export default History

function objectDestructure ( histories, type){
    let newList = ""
    if(typeof(histories) === 'undefined' || histories.length === 0){
         return newList
    } 
 
    const {drugDetails, symptoms } = histories
    if(drugDetails){
         if(type === "drugs"){
            // console.log(drugDetails.length)
            return drugDetails
         }
    }

    if(symptoms){
        if(type === "symptoms"){
            //console.log(medicalHistory)
           return symptoms
        }
    }

    return newList
 }
