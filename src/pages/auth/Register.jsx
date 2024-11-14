import React from 'react'
import "./auth.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { UserData } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Register=()=>{
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[name,setName]=useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    if (!email || !password) {
      toast.error("Both email and password are required!");
      return;
    }

    try {
      
      await registerUser(name,email, password, navigate);
    } catch (error) {
      
      toast.error("Login failed. Please try again.");
    }
  };
  return (
    <div className="auth-page">
    <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">User Name</label>
        <input   type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your Name"/>
            <label htmlFor="email">Email</label>
            <input   type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"/>

            <label htmlFor="password">password</label>
            <input   type="password"
            id="password"
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
            required
            placeholder="Enter your Password"
            />
            <button type='submit' disabled={btnLoading} className='common-btn'>
              {
                btnLoading?"Please Wait...":"Register"
              }
            </button>
        </form>
        <p>Already Have an Account?<Link to={"/login"}>Login</Link></p>
    </div>
</div>
  )
}

export default Register