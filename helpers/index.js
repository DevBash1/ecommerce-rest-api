const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");

const JWT_SECRET = process.env.JWT_SECRET;

const genUnique = () => {
    try {
        return randomBytes(5).toString("hex");
    } catch (error) {
        console.log(error);
    }
};

const genHash = (string) => {
    return bcryptjs.hashSync(string, 10);
};

const compareHash = (string, hash) => {
    return bcryptjs.compareSync(string, hash);
};

const genAccessToken = (payload, secret) => {
    return jwt.sign(payload, JWT_SECRET || secret, {
        expiresIn: "31d",
    });
};

module.exports = {
    genHash,
    compareHash,
    genAccessToken,
    genUnique,
};
