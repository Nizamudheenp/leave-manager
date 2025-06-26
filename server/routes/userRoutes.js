const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { createLeave, myLeave, cancelLeave } = require('../controllers/usercontroller');
const router = express.Router();

router.post('/', authMiddleware,createLeave );
router.get('/', authMiddleware, myLeave);
router.put('/:id', authMiddleware,cancelLeave);


module.exports = router;