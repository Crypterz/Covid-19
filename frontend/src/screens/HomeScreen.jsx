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

    },[dispatch])

    return(
        <>

        { loading ? (<Loader></Loader>) : 
            <div style={{display:'flex', marginLeft:'0%', width:'100%', position:'relative'}}>
                     <div className="vs-col vs-xs vs-sm-12 vs-lg-3" style={{margin:'1%',width:'50%'}}>
                         <Card>
                             <FigureOne details={overall}></FigureOne>
                         </Card>
                     </div>
                     <Card className="vs-col chart-wrap vs-xs vs-sm-12 vs-lg-6" style={{margin:'1%',width:'100%'}}>
                         <div>
                             <h3 style={{textAlign:'center', margin:'2%'}}>Total, Recovered and Deaths (SL)</h3>
                         </div>
                         <div style={{position:'relative' ,margin:'2%'}}>
                              <LineGraph myProp1={dates} myProp2={cases} myProp3={deaths} myProp4={recovered}></LineGraph> 
                         </div> 
                     </Card>
        
                     <div className="vs-col vs-xs vs-sm-12 vs-lg-3" style={{margin:'1%',width:'50%'}}>
                         <Card>
                           <FigureTwo details={overall}></FigureTwo>
                         </Card>
                     </div>
            </div>}
        </>
        
        )
}

export default HomeScreen
