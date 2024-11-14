import React, { useEffect, useState } from 'react'
import  "./adminUser.css" 
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Layout } from '../utils/Layout';
import { server } from '../../main';
import toast from 'react-hot-toast';
export const AdminUsers= ({user}) => {
    const navigate=useNavigate();
    if(user&&user.role!=="admin")return navigate("/")
        const[users,setUsers]=useState([]);
      console.log("users",users);
        async function fetchUsers()
        {  try {
            const {data}=await axios.get(`${server}/api/users`,{
                headers:
                {
                    token:localStorage.getItem("token"),
                }
            })
            setUsers(data.users)
        } catch (error) {
           console.log(error) 
        }
            
        }
        useEffect(()=>{
            fetchUsers()
        },[])
        console.log(users)
        const updateRole = async (id) => {
            if (confirm("are you sure you want to update this user role")) {
              try {
                const { data } = await axios.put(
                  `${server}/api/user/${id}`,
                  {},
                  {
                    headers: {
                      token:localStorage.getItem("token"),
                    },
                  }
                );
        
                toast.success(data.message);
                fetchUsers();
              } catch (error) {
                toast.error(error.response.data.message);
              }
            }
          };

  return (
    <Layout>
    <div className="users">
      <h1>All Users</h1>
  
      {users && users.length > 0 ? (
        <table border="black">
          <thead>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Update Role</td>
            </tr>
          </thead>
          <tbody>
            {users.map((e, i) => (
              <tr key={e._id}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td>
                  <button
                    onClick={() => updateRole(e._id)}
                    className="common-btn"
                  >
                    Update Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users present except the admin.</p>
      )}
    </div>
  </Layout>
  
  )
}
