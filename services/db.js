const mongoose = require("mongoose");

const { MONGODB_DB_NAME, MONGODB_URI } = process.env;

async function connectToDatabase() {
    try {
        await mongoose.connect(`${MONGODB_URI}/${MONGODB_DB_NAME}`, {});
        console.log("Connected to MongoDB");
        return mongoose.connection.db;
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectToDatabase;
