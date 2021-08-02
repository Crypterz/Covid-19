import React from 'react'
import FigureOne from '../../components/hospitalComponents/FigureOne'
import FigureTwo from '../../components/hospitalComponents/FigureTwo'
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
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

            <div className="vs-col vs-xs vs-sm-12 vs-lg-3" style={{margin:'0%', width:'100%'}}>
                <Card style={{margin:'1%'}}>
                    <BarChart></BarChart>
                </Card>
                
            </div>
         </div>
    )
}

export default Dashboard