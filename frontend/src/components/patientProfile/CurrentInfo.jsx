import React from 'react'
import { useSelector } from 'react-redux';
import {Card, Button} from 'react-bootstrap';

const CurrentInfo = ({patients, currentHospital, userHospital, hospitalName}) => {
    const auth = useSelector(state => state.auth);

    return (
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
                    {auth.data.user.role !== 'patient' &&
                    <div className='text-center m-2'>
                        {currentHospital === userHospital ?<Button 
                            type='submit'  
                            className='btn btn-primary m-2 text-center' 
                            onClick = { () => window.location=`/hospital/editCurrentDetails/${patients._id}`}
                        >Update Details</Button> :
                    <div>
                        <Button className='btn btn-prymary m-2'>Accept</Button>
                        <Button className='btn btn-danger m-2'>Decline</Button>
                    </div> }
                </div> }
            </Card>
    )
}

export default CurrentInfo
