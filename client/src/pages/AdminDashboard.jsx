import React from 'react'
import AdminLeaves from '../components/AdminLeaves';

function AdminDashboard() {

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-10">
          Admin Leave Dashboard
        </h1>
        <AdminLeaves />
      </div>
    </div>
  );

}

export default AdminDashboard