import React from 'react'
import FigureOne from '../../components/healthMinistryComponents/FigureOne'
import FigureTwo from '../../components/healthMinistryComponents/FigureTwo'
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import HorizontalBarChart from '../../components/HorizontalBarChart'
import { Card } from 'react-bootstrap'

const Dashboard = () => {
    return (
        <div>
            <div style={{display:'flex', marginLeft:'0%', width:'100%', position:'relative'}}>
                <div className="vs-col vs-xs vs-sm-12 vs-lg-3" style={{margin:'1%',width:'50%'}}>
                    <Card>
                        <FigureOne></FigureOne>
                    </Card>
                </div>
                <Card className="vs-col chart-wrap vs-xs vs-sm-12 vs-lg-6" style={{margin:'1%',width:'100%'}}>
                    <div>
                        <h3 style={{textAlign:'center', margin:'2%'}}>Total vs Active Cases (SL)</h3>
                    </div>
                    <div style={{position:'relative' ,margin:'2%'}}>
                        <PieChart/>
                    </div> 
                </Card>

                <div className="vs-col vs-xs vs-sm-12 vs-lg-3" style={{margin:'1%',width:'50%'}}>
                    <Card>
                    <FigureTwo></FigureTwo>
                    </Card>
                </div>
            </div>

            <div style={{display:'flex', marginLeft:'0%', width:'100%', position:'relative'}}>
                <Card className="vs-col vs-xs vs-sm-12 vs-lg-3" style={{marginLeft:'1%',marginRight:'1%',width:'50%'}}>
                    <div style={{position:'relative' ,margin:'2%'}}>
                    <h3 style={{textAlign:'center', margin:'2%'}}>Most Covid Patient Admitted Hospitals</h3>
                    </div>
                    <div style={{position:'relative' ,margin:'2%'}}>
                        <HorizontalBarChart></HorizontalBarChart>
                    </div>
                </Card>
                <Card className="vs-col vs-xs vs-sm-12 vs-lg-3" style={{marginRight:'1%',width:'50%'}}>
                    <div style={{position:'relative' ,margin:'2%'}}>
                        <h3 style={{textAlign:'center', margin:'2%'}}>Most Covid Patient Recorded Districts</h3>
                    </div>
                    <div style={{position:'relative' ,margin:'2%'}}>
                        <HorizontalBarChart></HorizontalBarChart>
                    </div>
                </Card>

                
            </div>
         </div>
    )
}

export default Dashboard
