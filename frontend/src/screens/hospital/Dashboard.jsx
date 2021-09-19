import React, {useEffect, useState, Component} from 'react'
import FigureOne from '../../components/hospitalComponents/FigureOne'
import FigureTwo from '../../components/hospitalComponents/FigureTwo'
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { loadPatients, getAllPatients, getPatientsLoadingStatus } from '../../store/entities/patients';

const Dashboard = () => {
    const dispatch = useDispatch()

    //const {patients} = useSelector(getAllPatients);

    useEffect(() => {
        //dispatch(listPatients())
       // dispatch(loadPatients())

        //  const updatedFiltered = getFilteredPatients(patients, categories, selectedCategory);
        //  setFiltered(updatedFiltered);
        //   //console.log(patients)
        //  setPaginated(paginate(updatedFiltered, currentPage, pageSize));
    },[dispatch])

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
                             <h3 style={{textAlign:'center', margin:'2%'}}>Total vs Active Cases</h3>
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

            <div style={{margin:'0%',width:'100%', position:'relative'}}>
                <Card className="m-2" style={{margin:'0%'}}>
                    <BarChart></BarChart>
                </Card>
            </div>

        </div>
    )
}

export default Dashboard
