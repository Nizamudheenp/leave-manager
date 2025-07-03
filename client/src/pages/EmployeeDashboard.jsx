import React from 'react';
import MyLeave from '../components/MyLeave';
import ApplyLeave from '../components/ApplyLeave';

const EmployeeDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-7 px-3">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Employee Dashboard
        </h1>

        <div className="grid grid-cols-1  lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Apply for Leave</h2>
            <ApplyLeave />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500">
            <h2 className="text-2xl font-semibold text-green-600 mb-6">Leave History</h2>
            <MyLeave />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
