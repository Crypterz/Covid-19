import React, {useState, useEffect} from 'react'
import axios from 'axios';
import LineGraph from '../components/LineGraph'
import FigureOne from '../components/common/FigureOne'
import FigureTwo from '../components/common/FigureTwo';
import { Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import { loadPatients} from '../store/entities/patients';
import { useDispatch, useSelector } from 'react-redux';


const HomeScreen = () => {
    const dispatch = useDispatch()
    const [overall, setOverall] = useState([])
    const [dates, setDates] =useState([])
    const [cases, setCases] =useState([])
    const [deaths, setDeaths] =useState([])
    const [recovered, setRecovered] =useState([])
    var [loading, setLoading ]= useState(true)

    useEffect(() => {
       // dispatch(loadPatients())
        const fetchOverall = async () => {
            const {data} = await axios.get('https://www.hpb.health.gov.lk/api/get-current-statistical')
            setOverall(data.data)
        }

        const fetchGraph = async () => {
            const {data} = await axios.get('https://disease.sh/v3/covid-19/historical/Sri%20Lanka?lastdays=365')
            const data2 = data
            setDates(Object.keys(data2['timeline']['cases']))
            setCases(Object.values(data2['timeline']['cases']))
            setDeaths(Object.values(data2['timeline']['deaths']))
            setRecovered(Object.values(data2['timeline']['recovered']))
            setLoading(false)
        }

        fetchOverall()
        fetchGraph()

       // console.log(overall)


    },[dispatch])

    return(
        <>

        { loading ? (<Loader></Loader>) : 
            <div className="vs-row top-content" style={{display:'flex', width:'100%'}}>
                     <div className="vs-col vs-xs- vs-sm-12 vs-lg-3"style={{margin:'0%',width:'100%', position:'relative'}}>
                         <div className="set-animation from-left animate">
                            <Card className='m-2 con-vs-card text-center'>
                                <FigureOne details={overall}></FigureOne>
                            </Card>
                         </div>

                     </div>

                     {/* <div className="vs-col chart-wrap vs-xs- vs-sm-12 vs-lg-6 " style={{margin:'0%',width:'100%', position:'relative'}}>
                        <div className="set-animation from-left animate">
                            <Card className='m-2 con-vs-card text-center' style={{height:'100%'}}>
                                <div >
                                    <h3 style={{textAlign:'center', margin:'2%'}}>Total, Recovered and Deaths (SL)</h3>
                                </div>
                                <div  style={{position:'relative' ,margin:'2%'}}>
                                    <LineGraph myProp1={dates} myProp2={cases} myProp3={deaths} myProp4={recovered}></LineGraph> 
                                </div> 
                            </Card>
                        </div>
                     </div> */}
                    <Card className="vs-col vs-xs vs-sm-12 vs-lg-6 mt-2 mb-2" style={{margin:'0%',width:'100%'}}>
                         <div>
                             <h3 style={{textAlign:'center', margin:'2%'}}>Total, Recovered and Deaths (SL)</h3>
                         </div>
                         <div style={{position:'relative' ,margin:'2%'}}>
                              <LineGraph myProp1={dates} myProp2={cases} myProp3={deaths} myProp4={recovered}></LineGraph> 
                         </div> 
                    </Card>
        
                     <div className="vs-col vs-xs- vs-sm-12 vs-lg-3" style={{margin:'0%',width:'100%', position:'relative'}}>
                        <div className="set-animation from-left animate">
                            <Card className='m-2 con-vs-card text-center'>
                                <FigureTwo details={overall}></FigureTwo>
                            </Card>
                         </div>
                     </div>
            </div>}
        </>
        
        )
}

export default HomeScreen
