const jwt = require("jsonwebtoken");

function getToken(req) {
    if (req.cookies?.token) {
        return req.cookies.token;
    }
    if (req.headers.authorization) {
        if (req.headers.authorization.startsWith("Bearer ")) {
            return req.headers.authorization.split(" ")[1];
        }
        return req.headers.authorization;
    }
    if (req.headers["x-auth-token"]) {
        return req.headers["x-auth-token"];
    }
    return null;
}

function attachUser(req, decoded) {
    const userId = decoded.id || decoded._id;
    req.user = {
        ...decoded,
        _id: userId,
        id: userId,
    };
}

async function userAuthMiddleware(req, res, next) {
    const token = getToken(req);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key");
        attachUser(req, decoded);
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

async function artistAuthMiddleware(req, res, next) {
    const token = getToken(req);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key");
        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "Forbidden: Only artists can perform this action" });
        }
        attachUser(req, decoded);
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

async function userOrArtistAuthMiddleware(req, res, next) {
    const token = getToken(req);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key");
        attachUser(req, decoded);
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = { userAuthMiddleware, artistAuthMiddleware, userOrArtistAuthMiddleware };

