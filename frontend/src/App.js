import React from 'react'
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import Dashboard from './screens/hospital/Dashboard'
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
        {/* <Container> */}
          <Route path='/hospital/dashboard' component={Dashboard}/>
          <Route path='/healthMinistry/dashboard' component={AdminDashboard}/>
          <Route path='/healthMinistry/addHospital' component={AddHospital}/>
          <Route path='/hospital/addHospitalStaff' component={AddHospitalStaff}/>
          <Route path='/hospital/addPatient' component={AddPatient}/>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/login' component={Login}/>
        {/* </Container> */}
      </main>
      <Footer />
    </Router>
  );
}

export default App;
