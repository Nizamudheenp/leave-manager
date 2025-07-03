import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../config/api';
import { toast } from 'sonner';

const AdminLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (statusFilter === "") {
      fetchAllLeaves();
    } else {
      fetchFilteredLeaves(statusFilter);
    }
  }, [statusFilter]);

  const fetchAllLeaves = async () => {
    try {
      const response = await api.get('/admin/leaves', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaveRequests(response.data.leaves || []);
    } catch (error) {
      console.log(error);
      alert('Failed to fetch all leave requests');
    }
  };

  const fetchFilteredLeaves = async (status) => {
    try {
      const response = await api.get(`/admin/filter?status=${status}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaveRequests(response.data || []);
    } catch (error) {
      alert("Failed to filter leaves");
      console.log(error);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await api.put(`/admin/${id}`, { status: action }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaveRequests((prev) =>
        prev.map((leave) =>
          leave._id === id ? { ...leave, status: action } : leave
        )
      );
      toast(`Leave ${action}`);
    } catch (error) {
      console.log(error);
      toast.error('Action failed');
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-purple-600">Leave Requests</h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {leaveRequests.length === 0 ? (
        <p>No leave requests available.</p>
      ) : (
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">From</th>
              <th className="p-2 border">To</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Reason</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave) => (
              <tr key={leave._id}>
                <td className="p-2 border">{leave.employeeId?.name || "N/A"}</td>
                <td className="p-2 border">{new Date(leave.fromDate).toDateString()}</td>
                <td className="p-2 border">{new Date(leave.toDate).toDateString()}</td>
                <td className="p-2 border capitalize">{leave.type}</td>
                <td className="p-2 border">{leave.reason}</td>
                <td className="p-2 border font-semibold text-center">
                  <span className={`px-2 py-1 rounded text-white ${
                    leave.status === 'Approved' ? 'bg-green-500' :
                    leave.status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}>
                    {leave.status}
                  </span>
                </td>
                <td className="p-2 border">
                  {leave.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(leave._id, 'Approved')}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(leave._id, 'Rejected')}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminLeaves;
