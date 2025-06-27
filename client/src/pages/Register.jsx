import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import API from '../config/api';
import {useDispatch} from 'react-redux';
import { setUser } from '../redux/slices/authSlice';

const Register = () => {
  const [formData,setFormData]=useState({
    name:"",email:"",password:"",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]: e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const response = await API.post('/auth/register',formData);
      dispatch(setUser({user:response.data.user,token: res.data.token}));
      navigate('/userDashboard');
    } catch (error) {
      alert("Registration failed");
      console.log(error);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-300'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow ' >
        <h2 className='text-xl font-bold mb-4'>Register</h2>
        <input
         type="text"
         name="name" 
         placeholder='Name'
         onChange={handleChange}
         value={formData.name}
         required
         className='mb-3 w-full p-2 border rounded'  
         />
         <input
         type="text"
         name="email" 
         placeholder='Email'
         onChange={handleChange}
         value={formData.email}
         required
         className="mb-3 w-full p-2 border rounded"  
         />
         <input
         type="text"
         name="password" 
         placeholder='Password'
         onChange={handleChange}
         value={formData.password}
         required 
         className="mb-3 w-full p-2 border rounded" 
         />
         <button className='bg-green-500 text-white px-4 py-2 rounded'>register</button>
         <p className='py-3'>Already have an account?<Link to="/login" className='font-bold hover:underline px-4'>Login</Link></p>
      </form>
      
    </div>
  )
}

export default Register