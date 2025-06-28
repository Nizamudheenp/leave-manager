const express = require('express');
const { adminOnly, authMiddleware } = require('../middleware/authMiddleware');
const { getAllLeaves, updateStatus, filteredLeaves, leaveByEmployee } = require('../controllers/admincontroller');
const router = express.Router();

router.get('/leaves', authMiddleware,adminOnly , getAllLeaves );
router.put('/:leaveId', authMiddleware, adminOnly,updateStatus);
router.get('/filter', authMiddleware,adminOnly,filteredLeaves);


module.exports = router;