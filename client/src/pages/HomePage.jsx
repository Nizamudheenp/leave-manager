import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 px-6 py-16">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-6 leading-tight">
          Welcome to Leave Manager
        </h1>
        <p className="text-gray-700 text-xl max-w-2xl mb-10">
          A smart way to manage employee leave requests. Automate your leave approval workflow,
          get real-time tracking, and empower both employees and HR teams with a simple dashboard.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg rounded-lg shadow-md transition"
        >
          Get Started
        </button>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left w-full">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <ClipboardDocumentListIcon className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Leave Requests</h3>
            <p className="text-gray-600">
              Employees can submit and track their leave requests with just a few clicks.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <ShieldCheckIcon className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Admin Control</h3>
            <p className="text-gray-600">
              Admins can view, approve, or reject requests and receive instant notifications.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <DocumentArrowDownIcon className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Download Reports</h3>
            <p className="text-gray-600">
              Users can download approved leave summaries as PDFs for their records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
