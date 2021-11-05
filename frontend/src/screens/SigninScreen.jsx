import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
import {Form, Button} from 'react-bootstrap';
import { login, getLoggedInStatus } from './../store/auth';
import { toastAction } from './../store/toastActions';
//import User from '../../../backend/models/userModel';
//import { signin } from '../actions/userAction';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


//   const redirect = props.location.search
//     ? props.location.search.split('=')[1]
//     : '/';

//   const userSignin = useSelector((state) => state.userSignin);
    //  const { data, loading, error } = userSignin;


  const dispatch = useDispatch();

  const submitHandler = (e) => {

    const data ={
        email: email,
        password: password
    }
    e.preventDefault();
    // TODO: sign in action

    dispatch(login(data));
  };

    const loggedIn = useSelector(getLoggedInStatus)

    const userDetails = useSelector(state => state.auth.data);
    const auth = userDetails

    //console.log(auth.user.role)
    //console.log(admin)

    
    useEffect(() => {
        if (loggedIn === true) {
           //props.history.push(redirect);
           // console.log('logged in suceessfully');
            dispatch(toastAction({ message: "Logged in Success...", type: 'info' }));
            if(auth.user.role === 'hospitalAdmin' || 'hospital user'){
               window.location ='/hospital/dashboard'
            }
            else if(auth.user.role === 'patient'){
               window.location =`/hospital/profile/${auth.user._id}`
            }
            else if(auth.user.role === 'admin'){
              window.location ='/healthMinistry/dashboard'
            }
           /// ;
        }else{
           // console.log('not logged in suceessfully');
        }
   },);

  return (
    <div>
      <Form className="form" onSubmit={submitHandler}>
        <div>
          <h1><strong class="banner-title" >SIGN IN</strong></h1>
        </div>
        {/* {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>} */}
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <Button className="primary" type="submit">
            Sign In
          </Button>
        </div>

      </Form>
    </div>
  );
}