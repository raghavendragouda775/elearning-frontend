import React, { useEffect } from 'react'
import "./courseStudy.css"
import { useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import { server } from '../../main'
import { Link } from 'react-router-dom'

export const CourseStudy = ({user}) => {
    const params=useParams()

    const {fetchCourse,course}=CourseData()
    const navigate=useNavigate()
    if(user&&user.role!=="admin")
    {
        return navigate("/");
    }
    useEffect(()=>{
      fetchCourse(params.id)  
    },[])
  return (
   <>
   {
    course&& <div className='course-study-page'>
        <img src={`${server}/${course.image}`} alt="" width={350}/>
        <h2>{course.title}</h2>
        <h4>{course.description}</h4>
        <h5>By-{course.createdBy}</h5>
        <h5>Duration-{course.duration}</h5>
        <Link to={`/lectures/${course._id}`}>
        <h2>Lectures</h2></Link>
    </div>

   }
   </>)
  
}
