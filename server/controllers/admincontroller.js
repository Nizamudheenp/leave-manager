const Leave = require('../models/LeaveModel');

exports.getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find();
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
        const statusUpdate = await Leave.findByIdAndUpdate(
            leaveId,
            { status },
            { new: true }
        );
        res.json({ message: "status updated", leave: updatedLeave });
    } catch (error) {
        res.status(500).json({ message: "server error while updating leaves", error })
    }
}

exports.filteredLeaves = async (req, res) => {
    const { employeeId, status } = req.query;
    const filter = {};
    if (employeeId) filter.employeeId = employeeId;
    if (status) filter.status = status;

    try {
        const leaves = await Leave.find(filter).populate("employeeId", "name email");
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: "Error while fetching leaves", error });
    }
}

exports.leaveByEmployee = async (req, res) => {
    const { employeeId } = req.params;
    try {
        const leaves = await Leave.find({employeeId,status:"Approved"});
        res.status(200).json({ leaves });
    } catch (error) {
        res.status(500).json({ message: "Error while fetching leave", error });
    }
}