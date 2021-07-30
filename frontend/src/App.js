import React from 'react'
import { Container } from 'react-bootstrap'
 import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
 import { ToastContainer } from 'react-toastify';
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import Dashboard from './screens/hospital/Dashboard'
import Patient from './screens/hospital/Patients'
import PatientProfile from './screens/hospital/PatientProfile'
import AdminDashboard from './screens/healthMinistry/AdminDashBoard'

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
            <Route path='/hospital/dashboard' component={Dashboard}/>
            <Route path='/hospital/patients' component={Patient}/>
            <Route path='/hospital/patientProfile/:id' component={PatientProfile}/>
            <Route path='/healthMinistry/dashboard' component={AdminDashboard}/>
            <Route path='/' component={HomeScreen} exact/>
            {/* <Route path='/' exact component={HomeScreen} /> */}
        {/* </Container> */}
          </switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
