import React from 'react'
import { Button, Card} from 'react-bootstrap'

const PersonalInfo = ({patients, currentHospital, userHospital}) => {
    return (
            <Card  className="m-2" bg="#ffffff" text="black" style={{ width: '100%'}}>
                <ul className="profile-info-list mt-2">
                    <li className="title ">PERSONAL INFORMATION</li>
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
                        {currentHospital === userHospital ? 
                        <div>
                            <Button 
                                type='submit'  
                                className='btn btn-primary' 
                                onClick={()=> window.location=`/hospital/editProfile/${patients._id}`}
                            >Edit Profile</Button>
                        </div>:''}
                </ul>
            </Card>
    )
}

export default PersonalInfo
