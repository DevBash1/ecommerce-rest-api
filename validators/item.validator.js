const Joi = require("joi");

const createItemSchema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    price: Joi.number().required(),
    picture: Joi.string().required(),
});

module.exports = {
    createItemSchema,
};
