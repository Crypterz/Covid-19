import React, {useEffect, useState, Component} from 'react'
import { Table, Container, Button, InputGroup, FormControl, Card} from 'react-bootstrap'
import CommonListGroup from '../../components/common/CommonListGroup'
import { paginate } from '../../utils/paginate';
import Loader from '../../components/Loader'
import Pagination from '../../components/Pagination';
//import { listPatients } from '../../actions/patientActions'
import { loadPatients, getAllPatients, getPatientsLoadingStatus } from '../../store/entities/patients';
import { useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

const Patients = ({history}) => {
    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth);

    const patientsDetails = useSelector(getAllPatients);
    const patients = patientsDetails.list;
   // console.log(patients)
    const patientsLoading = useSelector(getPatientsLoadingStatus);

    const location = useLocation()
    let { category:passedCategory  } = location
    if(!passedCategory) passedCategory = 'All'

    const AllCategories = ['All','Active', 'Recovered', 'Transffered', 'Deaths']
    const categories = AllCategories.filter(c=> c!== passedCategory)

    const [selectedCategory, setSelectedCategory] = useState(passedCategory);
    const [filtered, setFiltered] = useState(patients);

    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    let [paginated, setPaginated] = useState(patients);

    const [searchKeyword, setSearchKeyword ] = useState('');


    useEffect(() => {
        if(!auth.loggedIn){
           // window.location('/')
           history.push('/')
        }
        dispatch(loadPatients())

        const updatedSearchFiltered = getFilteredSearchedPatients(patients, searchKeyword)
        const updatedFiltered = getFilteredPatients(updatedSearchFiltered, categories, selectedCategory);
        setFiltered(updatedFiltered);
        setPaginated(paginate(updatedFiltered, currentPage, pageSize));
       // getFilteredSearchedPatients(patients, searchKeyword)
       // console.log(searchKeyword)
    },[dispatch, searchKeyword])

    return (
        <>
            {/* {auth.loggedIn && patientsLoading && (<Loader></Loader>)}
            {auth.loggedIn ?  */}
            { patientsLoading && (<Loader></Loader>)}
            <Container>
                <h3 style={{textAlign:'center', marginBottom:'40px', fontWeight:'700'}}>PATIENTS DETAILS</h3>

                <Button 
                    className="btn btn-success"
                    style={{float:'right',padding:'10px'}}
                    onClick = { () => history.push('/hospital/admitPatient')}
                >+ admit patient</Button>

                <InputGroup id = 'search-bar' style={{padding:'0px 200px 20px 200px', color:'blue'}}>
                            <FormControl
                                className='textBox'
                                placeholder="search patient by using name or NIC..."
                                aria-label="searchPatient"
                                aria-describedby="basic-addon2"
                                size = 'lg'
                                value = {searchKeyword}
                                onChange = { e => setSearchKeyword(e.target.value)}
                            />
                </InputGroup>

                <CommonListGroup 
                onSelect = {(category) => {
                    setSelectedCategory(category);
                    const updatedFiltered = getFilteredPatients(patients, AllCategories, category);
                    setFiltered(updatedFiltered);
                    setPaginated(paginate(updatedFiltered, 1, pageSize));
                }} 
                defaultSelected ={passedCategory} selected={selectedCategory} 
                list={categories.map(c => c)}
                />

            {patients.length === 0 ? <h1>No data</h1>:

            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Tel</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.map( p =>
                        <tr>
                            <td>{p.name}</td>
                            <td>{p.age}</td>
                            <td>{p.name}</td>
                            <td>{p.name}</td>
                            <td>{p.name}</td>
                            <td>
                                <Button 
                                    value = {p._id}
                                    onClick = { () => history.push(`/hospital/Profile/${p._id}`)}
                                    className="btn btn-primary">Profile</Button>
                            </td>
                        </tr>
                     )}
                </tbody>
            </Table>

            }

            <Pagination
                itemsCount = {filtered.length} 
                pageSize = {pageSize} 
                currentPage = {currentPage}
                onPageChange = {(page) => {
                    setCurrentPage(page);
                    setPaginated(paginate(filtered, page, pageSize));
                }}
            />

            </Container>
            {/* : history.push('/')} */}

        </>
    )
}

function getFilteredPatients(patients, categories, filter){
   // console.log(patients)
    if(filter === "All") return patients;
    const category = categories.find(c => c === filter);
   return patients;
}

export function getFilteredSearchedPatients(patients, filterBy){
  //  console.log(patients)
   // console.log(filterBy)
    if(/*typeof(patients) === 'undefined' || */patients.length === 0){
       return {}
    }
    return patients.filter(p => p.name.toLowerCase().includes(filterBy) //||
        //p.description.toLowerCase().includes(filterBy.toLowerCase())
       // console.log(p.name.toLowerCase())
    );
}

export default Patients

