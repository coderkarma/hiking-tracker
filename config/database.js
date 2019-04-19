const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/Hiking-Tracker-backEnd", {
        useNewUrlParser: true
    }
);

// module.exports = {
//     User: require("./User"),
//     Comment: require("./Comment")

// };