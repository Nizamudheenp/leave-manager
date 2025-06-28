const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "no token provided" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.role = decoded.role;
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

exports.adminOnly = (req, res,next) => {
   if(req.role !== "admin"){
    return res.status(403).json({ message: 'access denied.admin only.'});
   }
   next()

}
