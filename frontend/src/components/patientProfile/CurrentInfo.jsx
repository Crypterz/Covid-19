import React from 'react'
import { useSelector } from 'react-redux';
import {Card, Button} from 'react-bootstrap';

const CurrentInfo = ({patients, currentHospital, userHospital, hospitalName}) => {
    const auth = useSelector(state => state.auth);
    console.log(patients)
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
                            <div className="value">{patients.admittedDate}</div>
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
                            {objectDestructure(patients, "symptoms").length > 0 ? 
                            <ul className="value">
                                {objectDestructure(patients, "symptoms").map(p=> 
                                    <li>{p.date} - {p.description}</li>
                                )}
                            </ul> : "No data"}
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
                            {objectDestructure(patients, "drugs").length > 0 ? 
                            <ul className="value">
                                {objectDestructure(patients, "drugs").map(p=> 
                                    <li>{p.date} - {p.description}</li>
                                )}
                            </ul> 
                            
                            : "No data"}
                        </li>
                    </li>
                </ul>
                </div>
                    {auth.data.user.role !== 'patient' && objectDestructure(patients, "discharge") === false &&
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

function objectDestructure ( histories, type){
    let newList = ""
    if(typeof(histories) === 'undefined' || histories.length === 0){
         return newList
    } 
 
    const {dischargeDate, drugDetails, symptoms } = histories
    if(dischargeDate){
        if(type === "discharge"){
           // console.log(drugDetails.length)
           return dischargeDate.changed
        }
   }
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
