import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];  // Get token from Authorization header

    if (!token) {
        return res.status(403).json({ message: "Token is missing" });
    }

    jwt.verify(token, 'WS98HG3SDFVK', (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user;  // Attach the user info to req.user (containing the user._id)
        next();
    });
};
