const Joi = require("joi");
const { badResponse } = require("../helpers/response");

function validate(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            return badResponse(res, error.details[0].message);
        }
        req.body = value;
        next();
    };
}

module.exports = validate;
