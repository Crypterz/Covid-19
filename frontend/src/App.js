import React from 'react'
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
 import { ToastContainer } from 'react-toastify';
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import Dashboard from './screens/hospital/Dashboard'
import Patient from './screens/hospital/Patients'
import PatientProfile from './screens/hospital/PatientProfile'
import AdminDashboard from './screens/healthMinistry/AdminDashBoard'
import AddHospital from './screens/healthMinistry/AddHospital'
import AddPatient from './screens/hospital/AddPatient'
import AddHospitalStaff from './screens/hospital/staffs/AddHospitalStaff'
import EditCurrentDetails from './screens/hospital/EditCurrentDetails';
import AcceptanceWaiting from './screens/hospital/AcceptanceWaiting';
import AddPcrResults from './screens/hospital/AddPcrResults';
import EditProfile from './screens/hospital/EditProfile';
import Profile from './screens/hospital/Profile';
import AprovePcrResults from './screens/hospital/AprovePcrResults';
import './bootstrap.min.css';
import './App.css';
import AddWard from './screens/hospital/wards/AddWard'
import Ward from './screens/hospital/wards/Ward'
import WardsList from './screens/hospital/wards/WardsList'
import SigninScreen from './screens/SigninScreen';
import Logout from './components/Logout';
import Hospitals from './screens/healthMinistry/Hospitals';
import StaffList from './screens/hospital/staffs/StaffsList';
//import Login from './screens/Login'



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
          <switch>
           <Route path='/signin' component={SigninScreen}/>
            <Route path='/hospital/dashboard' component={Dashboard}/>
            <Route path='/hospital/patients' component={Patient}/>
            <Route path='/hospital/patientProfile/:id' component={PatientProfile}/>
            <Route path='/healthMinistry/dashboard' component={AdminDashboard}/>
            <Route path='/healthMinistry/addHospital' component={AddHospital}/>
            <Route path='/hospital/addHospitalStaff' component={AddHospitalStaff}/>
            <Route path='/hospital/addPatient' component={AddPatient}/>
            <Route path='/hospital/editCurrentDetails/:id' component={EditCurrentDetails}/>
            <Route path='/hospital/acceptanceWaiting' component={AcceptanceWaiting}/>
            <Route path='/hospital/addPcrResults' component={AddPcrResults}/>
            <Route path='/hospital/editProfile/:id' component={EditProfile}/>
            <Route path='/hospital/profile' component={Profile}/>
            <Route path='/hospital/aprovePcrResults' component={AprovePcrResults}/>
            <Route path='/hospitals/editProfile' component={EditProfile}/>
          {/* <Route path='/login' component={Login}/> */}
            <Route path='/logout' component={Logout}/>
            <Route path='/' component={HomeScreen} exact/>
            {/* <Route path='/' exact component={HomeScreen} /> */}

          {/* <Route path='/hospital/dashboard' component={Dashboard}/>
          <Route path='/healthMinistry/dashboard' component={AdminDashboard}/> */}
          {/* <Route path='/healthMinistry/addHospital' component={AddHospital}/> */}
          {/* <Route path='/hospital/addHospitalStaff' component={AddHospitalStaff}/> */}
          {/* <Route path='/hospital/addPatient' component={AddPatient}/> */}
          {/* <Route path='/' component={HomeScreen} exact/> */}
          {/* <Route path='/login' component={Login}/> */}
           <Route path='/hospital/wards/:id' component={Ward}/>
            <Route path='/hospital/addWard' component={AddWard}/>
           <Route path='/hospital/wards' component={WardsList}/>
           <Route path= '/healthMinistry/hospital' component={Hospitals}/>
           <Route path='/hospital/staffs' component={StaffList}/>
           <Route path='/hospital/addHospitalStaff' component={AddHospitalStaff}/>

        {/* </Container> */}
          </switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
