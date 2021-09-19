import React, {useEffect, useState, Component} from 'react'
import { Table, Container, Button, InputGroup, FormControl} from 'react-bootstrap'
import CommonListGroup from '../../components/common/CommonListGroup'
import { paginate } from '../../utils/paginate';
import Loader from '../../components/Loader'
import Pagination from '../../components/Pagination';
//import { listPatients } from '../../actions/patientActions'
import { loadPatients, getAllPatients, getPatientsLoadingStatus } from '../../store/entities/patients';
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

const Patients = ({history}) => {
    const dispatch = useDispatch()

    const patients = useSelector(getAllPatients);
    const patientsLoading = useSelector(getPatientsLoadingStatus);

    const location = useLocation()
    let { category:passedCategory  } = location
    if(!passedCategory) passedCategory = 'All'

    const AllCategories = ['All','Active', 'Recovered', 'Transffered', 'Deaths']
    const categories = AllCategories.filter(c=> c!== passedCategory)

    const [selectedCategory, setSelectedCategory] = useState(passedCategory);
    const [filtered, setFiltered] = useState(patients);

    const pageSize = 3;
    const [currentPage, setCurrentPage] = useState(1);
    let [paginated, setPaginated] = useState(patients);

    const [searchKeyword, setSearchKeyword ] = useState('');


    useEffect(() => {
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
            {patientsLoading ? (<Loader></Loader>) :

            <Container>
                <h2 style={{textAlign:'center', marginBottom:'40px', fontWeight:'600'}}>PATIENTS DETAILS</h2>

                <Button 
                    style={{float:'right',padding:'10px'}}
                    onClick = { () => history.push('/hospital/addPatient')}
                >+ add new patient</Button>

                <InputGroup id = 'product-search-bar' style={{padding:'0px 200px 20px 200px', color:'blue'}}>
                            <FormControl
                                placeholder="Search Patient by Using Name Or NIC..."
                                aria-label="searchPatient"
                                aria-describedby="basic-addon2"
                                size = 'lg'
                                value = {searchKeyword}
                                onChange = { e => setSearchKeyword(e.target.value)}
                               //onChange ={ e => getFilteredSearchedPatients(patients, e.target.value)}
                            />
                            {/* <InputGroup.Append id = 'product-search-button'>
                                <Button 
                                    className = 'pl-2.5 pr-2.5' 
                                    variant="primary" 
                                    onClick = {() => {
                                        history.push(`/search?filterBy=${searchKeyword}`)
                                    }}
                                >
                                    Search
                                </Button>
                            </InputGroup.Append> */}
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
                    {/* {patients.map( p=> */}
                    {paginated.map( p =>
                        <tr>
                            {/* <td>{p._id}</td> */}
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
            }

        </>
    )
}

function getFilteredPatients(patients, categories, filter){
   // console.log(patients)
    if(filter === "All") return patients;
    const category = categories.find(c => c === filter);
   return patients;
}

function getFilteredSearchedPatients(patients, filterBy){
  //  console.log(patients)
   // console.log(filterBy)
    return patients.filter(p => 
        p.name.toLowerCase().includes(filterBy) //||
        //p.description.toLowerCase().includes(filterBy.toLowerCase())
       // console.log(p.name.toLowerCase())
    );
}

export default Patients

