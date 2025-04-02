import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
    
export const verifyToken = (req, res, next) => {
    console.log("Headers received:", req.headers); // Log all headers

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("No Authorization header found!");
        return res.status(403).json({ message: "Token is missing" });
    }

    const token = authHeader.split(" ")[1];  // Extract token
    console.log("Extracted Token:", token);  // Log extracted token

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("JWT Verification Error:", err);
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        console.log("Decoded User:", decoded); // Log decoded user
        req.user = decoded;
        next();
    });
};


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
