const jwt = require('jsonwebtoken');

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.Id).populate("business");

    if (!user) {
        return res.status(401).json({
            message: "User no longer exists."
        });
    }

    req.User = user;
    next();

};

module.exports = authMiddleware;
