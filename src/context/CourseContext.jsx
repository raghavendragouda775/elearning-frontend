import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext=createContext();



export const CourseContextProvider=({children})=>{
    const[courses,SetCourses]=useState([]);
    const[course,setCourse]=useState([]);
    const[mycourse,setMyCourse]=useState([]);
    async function fetchCourses() {
        try {
          const {data} =await axios.get(`${server}/api/course/all`);
          SetCourses(data.courses)
        } catch (error) {
            console.log(error);
        }
    }
    async function fetchCourse(id)
    {
        const{data}=await axios.get(`${server}/api/course/${id}`);
       setCourse(data.course);
    }
    async function fetchMyCourse(){
        try {
            const {data}=await axios.get(`${server}/api/mycourse`,{
               headers:{
                token:localStorage.getItem("token"),
               }
            });
            console.log(data.courses)
            setMyCourse(data.courses);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchCourses()
        fetchMyCourse()
    },[])
    return <CourseContext.Provider value={{courses,fetchCourses,fetchCourse,course,mycourse,fetchMyCourse}}>{children}</CourseContext.Provider>
}
export const CourseData=()=>
    useContext(CourseContext)
