const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { createLeave, myLeave, cancelLeave } = require('../controllers/usercontroller');
const router = express.Router();

router.post('/leave', authMiddleware,createLeave );
router.get('/leave', authMiddleware, myLeave);
router.delete('/leave/:leaveId', authMiddleware,cancelLeave);


module.exports = router;