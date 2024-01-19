const { badResponse, sendResponse } = require("../helpers/response");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

function admin() {
    return (req, res, next) => {
        let authHeader = req.headers["authorization"];

        if (!authHeader) {
            return sendResponse(res, 403, false, "Please login to continue");
        }

        try {
            const bearer = authHeader.split(" ")[1];
            const decoded = jwt.verify(bearer, JWT_SECRET);

            if (!decoded.isAdmin) {
                return sendResponse(
                    res,
                    403,
                    false,
                    "Only admins can access this route, sorry!"
                );
            }

            res.user = decoded;
            req.user = decoded;

            next();
        } catch (err) {
            console.error(err);
            return sendResponse(res, 403, false, "Please login to continue");
        }
    };
}

module.exports = admin;
