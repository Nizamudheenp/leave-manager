import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import api from '../config/api';
import { toast } from 'sonner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "", password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', formData);
      const { user, token } = response.data;
      dispatch(setUser({ user, token }));
      toast.success("Login successful!");

      if (user.role === 'admin') {
        navigate('/admin-Dashboard');
      }
      if (user.role === 'user') {
        navigate('/employee-Dashboard');
      }
    } catch (error) {
      toast.error("Login failed");
      console.log(error);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-300'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow'>
        <h2 className='text-xl font-bold mb-4'>Login</h2>
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
          type="password"
          name="password"
          placeholder='Password'
          onChange={handleChange}
          value={formData.password}
          required
          className="mb-3 w-full p-2 border rounded"
        />
        <button className='bg-green-500 text-white px-4 py-2 rounded'>Login</button>
        <p className='py-3'>Dont have an account?<Link to="/register" className='font-bold hover:underline px-4'>Register</Link></p>
      </form>

    </div>
  )
}

export default Login  