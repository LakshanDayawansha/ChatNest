
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from './firebase';
import "./styles.css"


function Login() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const [isLoggedIn,setIsLoggedIn] = useState(false);

  const handleChange = (e) =>{
    setState({
      ...state,[e.target.name]: e.target.value
    });

    console.log(state.email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    try{
        await signInWithEmailAndPassword(auth,state.email,state.password);
        console.log("logged in succsessfully")
        setIsLoggedIn(true)
        
    }catch(error){
       console.log("Error")
    }
  }

  if(isLoggedIn){
    return <Navigate to='/chathome'/>
  }

  return (
    <div className='App'>
    <div className="main-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email"
            name='email'
            value={state.email}
            onChange={handleChange}
            required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name='password'
            value={state.password}
            onChange={handleChange}
            required />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <p>You don't have an account? <Link to="/signup" className="link">Signup</Link></p>
    </div>
    </div>
  );
}

export default Login;
