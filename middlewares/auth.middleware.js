const { badResponse, sendResponse } = require("../helpers/response");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

function auth() {
    return (req, res, next) => {
        let authHeader = req.headers["authorization"];

        if (!authHeader) {
            return sendResponse(res, 403, false, "Please login to continue");
        }

        try {
            const bearer = authHeader.split(" ")[1];
            const decoded = jwt.verify(bearer, JWT_SECRET);

            res.user = decoded;
            req.user = decoded;

            next();
        } catch (err) {
            console.error(err);
            return sendResponse(res, 403, false, "Please login to continue");
        }
    };
}

module.exports = auth;
