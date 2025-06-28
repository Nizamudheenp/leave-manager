import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../config/api';
import { removeLeave, setLeaves } from '../redux/slices/leaveSlice';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MyLeave = () => {
  const { token } = useSelector((state) => state.auth);
  const leaves = useSelector((state) => state.leave.leaves);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await api.get('/user/leave', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setLeaves(response.data.myLeave || []));
      } catch (error) {
        console.log(error);
        alert('Failed to fetch leave history');
      }
    };
    fetchLeaves();
  }, [token, dispatch]);

  const cancelLeave = async (leaveId) => {
    const confirm = window.confirm('Are you sure you want to cancel this leave?');
    if (!confirm) return;

    try {
      await api.delete(`/user/leave/${leaveId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(removeLeave(leaveId));
      alert('Leave request cancelled');
    } catch (error) {
      alert('Failed to cancel leave.');
      console.log(error);
    }
  };

  const downloadLeavePDF = (leave) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Leave Summary', 14, 20);

    doc.setFontSize(12);
    doc.text(`Employee: ${leave.employeeId?.name || 'You'}`, 14, 35);

    const rows = [
      ['From', new Date(leave.fromDate).toDateString()],
      ['To', new Date(leave.toDate).toDateString()],
      ['Type', leave.type],
      ['Reason', leave.reason],
      ['Status', leave.status],
    ];

    doc.autoTable({
      startY: 45,
      head: [['Field', 'Value']],
      body: rows,
    });

    const dateStr = new Date(leave.fromDate).toISOString().split('T')[0];
    doc.save(`Leave_${leave.type}_${dateStr}.pdf`);
  };

  return (
    <div className="overflow-auto rounded-md border border-gray-200">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3">From</th>
            <th className="p-3">To</th>
            <th className="p-3">Type</th>
            <th className="p-3">Reason</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-5 text-gray-500">
                No leaves applied yet.
              </td>
            </tr>
          ) : (
            leaves.map((leave) => (
              <tr key={leave._id} className="border-t hover:bg-gray-50 transition duration-200">
                <td className="p-3">{new Date(leave.fromDate).toDateString()}</td>
                <td className="p-3">{new Date(leave.toDate).toDateString()}</td>
                <td className="p-3 capitalize">{leave.type}</td>
                <td className="p-3">{leave.reason}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                      leave.status === 'Approved'
                        ? 'bg-green-500'
                        : leave.status === 'Rejected'
                        ? 'bg-red-500'
                        : 'bg-yellow-500'
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  {leave.status === 'Pending' && (
                    <button
                      onClick={() => cancelLeave(leave._id)}
                      className="text-red-600 hover:underline text-xs"
                    >
                      Cancel
                    </button>
                  )}
                  {leave.status === 'Approved' && (
                    <button
                      onClick={() => downloadLeavePDF(leave)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                    >
                      Download PDF
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyLeave;
