import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user data to the request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
