import React, { useState } from 'react';
import "./auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { CourseData } from '../../context/CourseContext';

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {fetchMyCourse}=CourseData()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic client-side validation (optional but good practice)
    if (!email || !password) {
      toast.error("Both email and password are required!");
      return;
    }

    try {
      // Attempt login
      await loginUser(email, password, navigate,fetchMyCourse);
    } catch (error) {
      // Handle login failure (if any)
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />

          <button disabled={btnLoading} className="common-btn" type="submit">
            {btnLoading ? "Please Wait..." : "Login"}
          </button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
