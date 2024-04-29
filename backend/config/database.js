const mongoose = require('mongoose');
const config = require("config")
const database = config.get("mongoURL")

const connectDB = async () => {
    try{
        await mongoose.connect(database, {
            useNewURLParser:true
        });
        console.log("mongoDb connected");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB