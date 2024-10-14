import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "./styles.css"
import { auth,firestore } from './firebase';
import { doc, setDoc } from 'firebase/firestore';


function Signup() {

  const [state, setState] = useState({
    email: "",
    userName: "",
    password: "",
    repeatPassword: ""
  })

  const [isSignedIn,setIsSignedIn] = useState(false)

  const handleChange = (e) => {
    setState({
      ...state, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    if (state.password.length < 8) {
      alert("Password should contain more than 8 characters");
      return;
    }
    if (state.password !== state.repeatPassword) {
      alert("Passwords are not match")
      return;
    }

    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then(async(userCredential) => {
        // Signed in
        const user = userCredential.user;

        try{
        await setDoc(doc(firestore,"users",user.uid),{
          uid: user.uid,
          username: state.userName,
          email: user.email
        });
         setIsSignedIn(true);
        console.log("User registered: ", user);
        // Redirect to another page or show success message
      }catch(error){
        console.error("Error adding document: ", error);
      }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error: ", errorCode, errorMessage);
        alert(errorMessage);
      });

  }
  if(isSignedIn){
    return <Navigate to = '/chathome'/>
  }





  return (
    <div className="App">
      <div className="main-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={state.email}
              required />
          </div>
          <div className="form-group">
            <label>User Name:</label>
            <input
              type="text"
              name="userName"
              onChange={handleChange}
              value={state.userName}
              required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={state.password}
              required />
          </div>
          <div className="form-group">
            <label>Repeat Password:</label>
            <input type="password"
              name="repeatPassword"
              onChange={handleChange}
              value={state.repeatPassword}
              required />
          </div>
          <button type="submit" className="btn">Signup</button>
        </form>
        <p>Already have an account? <Link to="/" className="link">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
