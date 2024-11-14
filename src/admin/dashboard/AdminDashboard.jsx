import React from 'react'
import { Layout } from '../utils/Layout'
import "./dashboard.css"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { server } from '../../main'
import axios from 'axios'
import { useEffect } from 'react'


  
export const AdminDashboard = ({user}) => {
    const navigate=useNavigate()
    if(user&&user.role!=="admin") return navigate('/')
        const [stats, setStats] = useState([]);

    async function fetchStats() {
      try {
        const { data } = await axios.get(`${server}/api/stats`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
  
        setStats(data.stats);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      fetchStats();
    }, []);
    return (
      <div>
        <Layout>
          <div className="main-content">
            <div className="box">
              <p>Total Courses</p>
              <p>{stats.totalCoures}</p>
            </div>
            <div className="box">
              <p>Total Lectures</p>
              <p>{stats.totalLectures}</p>
            </div>
            <div className="box">
              <p>Total Users</p>
              <p>{stats.totalUsers}</p>
            </div>
          </div>
        </Layout>
      </div>
    );
}
