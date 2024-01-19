const mongoose = require("mongoose");
const populate = require("mongoose-autopopulate");
const { ObjectId } = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    picture: {
        type: String,
    },
    price: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

ItemSchema.plugin(populate);

const Item = mongoose.model("Items", ItemSchema);

module.exports = Item;
