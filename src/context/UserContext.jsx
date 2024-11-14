import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [auth, setAuth] = useState(false); // Change `SetAuth` to `setAuth` for consistency.
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true); // Start with loading state true.

  // Login Function
  async function loginUser(email, password, navigate,fetchMyCourse) {
    setBtnLoading(true); // Button loading state set to true during login.
    try {
      const { data } = await axios.post(
        `${server}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.setItem("token",data.token);
      setUser(data.user); // Set user data after successful login.
      setAuth(true); // Set auth to true on successful login.
      setBtnLoading(false); // Disable button loading after login.
      navigate('/'); 
      fetchMyCourse()// Navigate to home after successful login.
    } catch (error) {
      setBtnLoading(false); // Disable button loading after error.
      setAuth(false); // Set auth to false on login failure.
      toast.error(error.response?.data?.message || "Login failed");
    }
  }
  async function registerUser(name,email, password, navigate) {
    setBtnLoading(true); // Button loading state set to true during login.
    try {
      const { data } = await axios.post(
        `${server}/api/user/register`,
        {name, email, password },
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.setItem("activationToken",data.activationToken);
      // Set auth to true on successful login.
      setBtnLoading(false); // Disable button loading after login.
      navigate('/verify'); // Navigate to home after successful login.
    } catch (error) {
      setBtnLoading(false); // Disable button loading after error.
      // Set auth to false on login failure.
      toast.error(error.response?.data?.message || "registered failed");
    }
  }
  async function verifyUser(otp,navigate) {
   
     setBtnLoading(true);
      const activationToken=localStorage.getItem("activationToken")
      try {
      const { data } = await axios.post(
        `${server}/api/user/verify`,
       {otp,activationToken},
        { withCredentials: true }
      );
      toast.success(data.message);
      navigate('/login')
      localStorage.clear()
      setBtnLoading(false);
    } catch (error) {
       // Disable button loading after error.
      // Set auth to false on login failure.
      toast.error(error.response?.data?.message || "Verify failed");
      setBtnLoading(false);
    }
    
  }

  // Fetch User Data (check for token in localStorage)
  async function fetchUser() {
    try {
      setLoading(true); 
      const Token=localStorage.getItem("token")
      console.log("token",Token);// Start loading before making the request.
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers:{
          token:localStorage.getItem("token"),
        },
      });
      setAuth(true);
      setUser(data.user);
       setLoading(false); // Set user data from response.
      // Set auth to true after fetching user.
    } catch (error) {
      console.log(error);
      
      setLoading(false) // Set auth to false on error (token expired, no user).
    } 
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, btnLoading, loginUser, auth, setAuth, loading ,registerUser,verifyUser}}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

// Custom hook to access user data from context
export const UserData = () => useContext(UserContext);
