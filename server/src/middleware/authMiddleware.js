const jwt = require('jsonwebtoken');
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Unauthorized: No token provided."
        });
    }    

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "Unauthorized: Invalid token format."
        });   
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

    } catch (error) {

    return res.status(401).json({
        message: "Invalid or expired token."
    });

    }

    const user = await User.findById(decoded.id).populate("business");

    if (!user) {
        return res.status(401).json({
            message: "User no longer exists."
        });
    }

    req.user = user;
    next();

};

module.exports = authMiddleware;
