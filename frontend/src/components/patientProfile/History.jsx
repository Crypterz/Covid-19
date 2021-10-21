import React, {useEffect, useState} from 'react'
import {Card} from 'react-bootstrap'
import { loadPatients , getPatientById, getAllPatients, getPatientsLoadingStatus, updateTransferPatient, loadPatient} from '../../store/entities/patients';

const History = ({patientHistory, filteredHistory}) => {
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
                            <div className="value m-2">Hospital Name:</div>
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
    )
}

export default History
