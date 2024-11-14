import React from 'react'
import "./header.css"
import { Link } from 'react-router-dom'
// importing auth from app.jsx where ia passed as props
const Header=({auth})=>{
  return (
    <header>
        <div className='logo'>
          E-Learning
        </div>
        <div className="link">
            <Link to={'/'}>Home</Link>
            <Link to={'/courses'}>Courses</Link>
            <Link to={'/about'}>About</Link>
            {
              auth?(<Link to={'/account'}>Account</Link>):(
                <Link to={'/login'}>Login</Link>)
              
            }
        </div>
    </header>
  )
}

export default Header