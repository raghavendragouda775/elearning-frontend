import React from 'react'
import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home/Home';
import Header from './components/header/header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Verify from './pages/auth/Verify';
import Footer from './components/Footer/Footer';
import About from './pages/about/About';
import Account from './pages/account/Account';
import { UserData } from './context/UserContext';
import Loading from './components/loading/Loading';
import Courses from './pages/courses/Courses';
import { CourseDescription } from './pages/coursedescription/CourseDescription';
import { Dashboard } from './pages/dashboard/Dashboard';
import { CourseStudy } from './pages/courseStudy/CourseStudy';
import { Lecture } from './pages/lectures/lecture';
import { AdminDashboard } from './admin/dashboard/AdminDashboard';
import { AdminCourses } from './admin/courses/AdminCourses';
import { AdminUsers } from './admin/users/AdminUser';
function App() {
  const {auth,user,loading}=UserData();
  return (
    <>
    {
      loading?(<Loading/>):(
        <BrowserRouter>
        <Header auth={auth}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={auth?<Home/>:<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/courses' element={<Courses/>}/>
      
          <Route path='/account' element={auth?<Account user={user}/>:<Login/>}/>
          <Route path='/course/:id' element={auth?<CourseDescription user={user}/>:<Login/>}/>
          <Route path='/:id/dashboard' element={auth?<Dashboard user={user}/>:<Login/>}/>
          <Route path='/course/study/:id' element={auth?<CourseStudy user={user}/>:<Login/>}/>
          <Route path='/lectures/:id' element={auth?<Lecture user={user}/>:<Login/>}/>
          <Route path='/admin/dashboard' element={auth?<AdminDashboard user={user}/>:<Login/>}/>
          <Route path='/admin/course' element={auth?<AdminCourses user={user}/>:<Login/>}/>
          <Route path='/admin/users' element={auth?<AdminUsers user={user}/>:<Login/>}/>
        </Routes>
        <Footer/>
        </BrowserRouter>
      )
    }
    </>
 
  )
}

export default App
