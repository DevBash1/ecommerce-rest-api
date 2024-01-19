const mongoose = require("mongoose");
const populate = require("mongoose-autopopulate");
const { ObjectId } = require("mongoose");

const OrdersSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "Users",
        autopopulate: {
            select: ["name", "email", "picture"],
        },
    },
    items: {
        type: [ObjectId],
        ref: "Items",
        autopopulate: {
            select: ["name", "price"],
        },
    },
    approved: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

OrdersSchema.plugin(populate);

OrdersSchema.methods.approve = async function () {
    this.approved = true;
    await this.save();
};

const Order = mongoose.model("Orders", OrdersSchema);

module.exports = Order;
