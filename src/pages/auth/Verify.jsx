import React, { useState } from 'react'
import "./auth.css"
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../context/UserContext'

const Verify=()=>{
  const[otp,setOtp]=useState("")
  const {btnLoading,verifyUser}=UserData()
  const navigate=useNavigate()
  const handleOtpSubmit=async(e)=>{
    e.preventDefault();
    await verifyUser(Number(otp),navigate)
  }

  return (
    <div className="auth-page">
    <div className="auth-form">
        <h2>Verify Account</h2>
        <form onSubmit={handleOtpSubmit}>
            <label htmlFor="otp">Otp</label>
            <input type='number' value={otp} onChange={(e)=>setOtp(e.target.value)}required/>
            <button disabled={btnLoading}className='common-btn'>
              {
                btnLoading?"please wait...":"Verify"
              }
            </button>
            
        </form>
        <p>Go to <Link to={"/login"}>Login</Link> Page</p>
    </div>
</div>
  )
}

export default Verify