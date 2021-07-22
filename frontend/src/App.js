import React from 'react'
import { Container } from 'react-bootstrap'
 import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import Dashboard from './screens/hospital/Dashboard'
import AdminDashboard from './screens/healthMinistry/AdminDashBoard'

const App = () =>{
  return (
    <Router>
      <Header />
      <main className='py-3'>
        {/* <Container> */}
          <Route path='/hospital/dashboard' component={Dashboard}/>
          <Route path='/healthMinistry/dashboard' component={AdminDashboard}/>
          <Route path='/' component={HomeScreen} exact/>
        {/* </Container> */}
      </main>
      <Footer />
    </Router>
  );
}

export default App;
