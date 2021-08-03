import React from 'react'
<<<<<<< HEAD
import { Container } from 'react-bootstrap'
 import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
 import { ToastContainer } from 'react-toastify';
=======
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
>>>>>>> ab9469549ab2db697facb8a91c100aaa0d40d181
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import Dashboard from './screens/hospital/Dashboard'
import Patient from './screens/hospital/Patients'
import PatientProfile from './screens/hospital/PatientProfile'
import AdminDashboard from './screens/healthMinistry/AdminDashBoard'
import Login from './screens/Login'
import AddHospital from './screens/healthMinistry/AddHospital'
import AddPatient from './screens/hospital/AddPatient'
import AddHospitalStaff from './screens/hospital/AddHospitalStaff'
import './bootstrap.min.css';
import './App.css';


const App = () =>{
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover            
          ></ToastContainer>
        {/* <Container> */}
<<<<<<< HEAD
          <switch>
            <Route path='/hospital/dashboard' component={Dashboard}/>
            <Route path='/hospital/patients' component={Patient}/>
            <Route path='/hospital/patientProfile/:id' component={PatientProfile}/>
            <Route path='/healthMinistry/dashboard' component={AdminDashboard}/>
            <Route path='/' component={HomeScreen} exact/>
            {/* <Route path='/' exact component={HomeScreen} /> */}
=======
          <Route path='/hospital/dashboard' component={Dashboard}/>
          <Route path='/healthMinistry/dashboard' component={AdminDashboard}/>
          <Route path='/healthMinistry/addHospital' component={AddHospital}/>
          <Route path='/hospital/addHospitalStaff' component={AddHospitalStaff}/>
          <Route path='/hospital/addPatient' component={AddPatient}/>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/login' component={Login}/>
>>>>>>> ab9469549ab2db697facb8a91c100aaa0d40d181
        {/* </Container> */}
          </switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
