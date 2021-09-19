import React from 'react'
import FigureOne from '../../components/healthMinistryComponents/FigureOne'
import FigureTwo from '../../components/healthMinistryComponents/FigureTwo'
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import HorizontalBarChart from '../../components/HorizontalBarChart'
import { Card } from 'react-bootstrap'

const Dashboard = () => {

    const hospitals = [ 'National Hospital of Sri Lanka', 'Lady Ridgeway Hospital for Children',
                        'Castle Street Hospital for Women', 'Base Hospital Mulleriyawa',
                        'North Colombo Teaching Hospital','District General Hospital Negombo',
                        'District General Hospital Gampaha','National Hospital Kandy',
                        'Teaching Hospital Karapitiya','District General Hospital Hambantota']
    const districts = ['Colombo','Gampaha','Kalutara','Galle','Kandy','Matara','Kurunegala','Jaffna','Anuradhapura','Puttalam']

    return (
        <div>
            <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                    <div className="vs-col vs-xs- vs-sm-12 vs-lg-3"style={{margin:'0%',width:'100%', position:'relative'}}>
                         <div className="set-animation from-left animate">
                            <Card className='m-2 con-vs-card text-center'>
                                <FigureOne></FigureOne>
                            </Card>
                         </div>

                     </div>

                    <Card className="vs-col vs-xs vs-sm-12 vs-lg-6 mt-2 mb-2" style={{margin:'0%',width:'100%'}}>
                         <div>
                             <h3 style={{textAlign:'center', margin:'2%'}}>Total vs Active Cases (SL)</h3>
                         </div>
                         <div style={{position:'relative' ,margin:'2%'}}>
                            <PieChart/>
                         </div> 
                    </Card>
        
                     <div className="vs-col vs-xs- vs-sm-12 vs-lg-3" style={{margin:'0%',width:'100%', position:'relative'}}>
                        <div className="set-animation from-left animate">
                            <Card className='m-2 con-vs-card text-center'>
                                <FigureTwo></FigureTwo>
                            </Card>
                         </div>
                     </div>
            </div>

            <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                <div className="vs-col vs-xs vs-sm-12 vs-lg-6" style={{marginLeft:'0%',marginRight:'0%',width:'100%'}}>
                    <Card className='m-2'>
                        <div style={{position:'relative' ,margin:'2%'}}>
                        <h3 style={{textAlign:'center', margin:'2%'}}>Most Covid Patient Admitted Hospitals</h3>
                        </div>
                        <div style={{position:'relative' ,margin:'2%'}}>
                            <HorizontalBarChart myProp1={hospitals}></HorizontalBarChart>
                        </div>
                    </Card>
                </div>


                <div className="vs-col vs-xs vs-sm-12 vs-lg-6" style={{marginLeft:'0%',marginRight:'0%',width:'100%'}}>
                    <Card className='m-2'>
                        <div style={{position:'relative' ,margin:'2%'}}>
                        <h3 style={{textAlign:'center', margin:'2%'}}>Most Covid Patient Recorded Districts</h3>
                        </div>
                        <div style={{position:'relative' ,margin:'2%'}}>
                            <HorizontalBarChart myProp1={hospitals}></HorizontalBarChart>
                        </div>
                    </Card>
                </div>
            </div>

         </div>
    )
}

export default Dashboard
