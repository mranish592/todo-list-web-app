const jwt = require("jsonwebtoken");
require('dotenv').config();
const jwtPassword = process.env.JWT_PASSWORD;
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const jwtToken = token.split(" ")[1];

    try {
        jwt.verify(jwtToken, jwtPassword);
        const payload = jwt.decode(jwtToken);
        const username = payload.username
        res.locals.username = username;
        next();
    } catch (error) {
        console.error("error while verifying jwt");
        return res.status(403).json({
            message: "invalid token",
        });
    }
}

module.exports = userMiddleware;
