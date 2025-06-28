const Leave = require('../models/LeaveModel');
const sendEmail = require('../utils/email');
require('dotenv').config();

exports.getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate("employeeId", "name email");;
        res.status(200).json({ leaves });
    } catch (error) {
        res.status(500).json({ message: "server error while getting leaves", error })
    }
}

exports.updateStatus = async (req, res) => {
    const { leaveId } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ message: "invalid status" });
    }
    try {
        const updatedLeave = await Leave.findByIdAndUpdate(
            leaveId,
            { status },
            { new: true }
        ).populate("employeeId", "name email");
        if (!updatedLeave) {
            return res.status(404).json({ message: "Leave not found" });
        }
        try {

            await sendEmail({
                to: process.env.EMAIL_TO,
                subject: `Your Leave Request has been ${status}`,
                text: `Your leave from ${new Date(updatedLeave.fromDate).toDateString()} to ${new Date(updatedLeave.toDate).toDateString()} has been ${status}.`,
                html: `
    <h2>Leave ${status}</h2>
    <p>Hello ${updatedLeave.employeeId.name},</p>
    <p>Your leave request from <strong>${new Date(updatedLeave.fromDate).toDateString()}</strong> 
    to <strong>${new Date(updatedLeave.toDate).toDateString()}</strong> has been 
    <strong>${status}</strong>.</p>
    <p><strong>Type:</strong> ${updatedLeave.type}</p>
    <p><strong>Reason:</strong> ${updatedLeave.reason}</p>
  `
            });

        } catch (emailErr) {
            console.error("Email failed:", emailErr.message);
        }



        res.json({ message: "status updated", leave: updatedLeave });
    } catch (error) {
        res.status(500).json({ message: "server error while updating leaves", error })
    }
}

exports.filteredLeaves = async (req, res) => {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    try {
        const leaves = await Leave.find(filter).populate("employeeId", "name email");
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: "Error while fetching leaves", error });
    }
}

