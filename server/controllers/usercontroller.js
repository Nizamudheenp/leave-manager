const Leave = require('../models/LeaveModel');
const sendEmail = require('../utils/email');
require('dotenv').config();

exports.createLeave = async (req, res) => {
    const { fromDate, toDate, type, reason } = req.body;
    if (!fromDate || !type || !reason) {
        return res.status(400).json({ message: "fields are missing" });
    }
    const from = new Date(fromDate);
    const to = toDate ? new Date(toDate) : new Date(fromDate);

    const leaveDays = Math.floor((to - from) / (1000 * 60 * 60 * 24)) + 1;

   try {
  const newLeave = await Leave.create({
    employeeId: req.userId,
    fromDate: from,
    toDate: to,
    type,
    reason,
    status: "Pending"
  });

  try {
    await sendEmail({
      to: process.env.EMAIL_TO,
      subject: "New Leave Request Submitted",
      text: `A new leave request has been submitted.`,
      html: `
        <h2>New Leave Request</h2>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>From:</strong> ${from.toDateString()}</p>
        <p><strong>To:</strong> ${to.toDateString()}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p><strong>Days:</strong> ${leaveDays}</p>
      `
    });
  } catch (emailErr) {
    console.error("Email failed:", emailErr.message);
  }

  return res.status(201).json({
    message: "Leave applied successfully",
    leave: {
      fromDate: from.toDateString(),
      toDate: to.toDateString(),
      leaveDays,
      type,
      reason,
      status: "Pending"
    }
  });
} catch (error) {
  console.error("Create Leave Error:", error.message);
  res.status(500).json({ message: "Server error while creating leave", error });
}
}

exports.myLeave = async (req, res) => {
    try {
        const myLeave = await Leave.find({ employeeId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json({ myLeave })
    } catch (error) {
        res.status(500).json({ message: 'server error while getting leave', error })
    }
}

exports.cancelLeave = async (req, res) => {
    const { leaveId } = req.params;
    const userId = req.userId;
    try {
        const leave = await Leave.findOne({ _id: leaveId, employeeId: userId });
        if (!leave) {
            return res.status(404).json({ message: "Leave not found" });
        }
        if (leave.status !== "Pending") {
            return res.status(400).json({ message: "only pending leaves can be cancelled" });
        }
        await Leave.findByIdAndDelete(leaveId);
        res.json({ message: "leave cancelled successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error cancelling leave", error: err.message });
    }
}