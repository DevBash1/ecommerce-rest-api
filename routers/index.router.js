const { Router } = require("express");
const authRouter = require("./auth.route");
const itemRouter = require("./item.route");

const v1 = new Router();

v1.use("/auth", authRouter);
v1.use("/items", itemRouter);

module.exports = v1;
