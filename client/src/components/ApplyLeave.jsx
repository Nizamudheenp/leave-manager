import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import api from '../config/api';
import { addLeave } from '../redux/slices/leaveSlice';
import { toast } from 'sonner';

const ApplyLeave = () => {
    const [formData, setFormData] = useState({
        fromDate: "",
        toDate: "",
        type: "sick",
        reason: ""
    });
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response =  await api.post('/user/leave', formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('leave applied successfully');
            dispatch(addLeave(response.data.leave));
            setFormData({
                fromDate: "",
                toDate: "",
                type: "sick",
                reason: ""
            })
        } catch (error) {
            toast.error('leave application failed');
            console.log(error);

        }
    }

    return (
        <form
      onSubmit={handleSubmit}
      className="space-y-5 text-sm md:text-base transition-all duration-300"
    >
      <div>
        <label className="block font-semibold text-gray-700 mb-1">From Date</label>
        <input
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-1">To Date (optional)</label>
        <input
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={handleChange}
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-1">Leave Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="sick">Sick</option>
          <option value="casual">Casual</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-1">Reason</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
      >
        Submit Leave
      </button>
    </form>
    )
}

export default ApplyLeave