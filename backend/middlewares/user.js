const jwt = require("jsonwebtoken");
require('dotenv').config();
const jwtPassword = process.env.JWT_PASSWORD;
const statusCode = require("http-status")

async function userMiddleware(req, res, next) {
    const token = req.headers.authorization;

    try {
        const jwtToken = token.split(" ")[1];
        jwt.verify(jwtToken, jwtPassword);
        const payload = jwt.decode(jwtToken);
        const username = payload.username
        res.locals.username = username;
        next();
    } catch (error) {
        console.error("error while verifying jwt");
        return res.status(statusCode.UNAUTHORIZED).json({
            message: "invalid token",
        });
    }
}

module.exports = userMiddleware;
