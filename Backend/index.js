// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/ArtisanDB', {
//     useUnifiedTopology: true
// });

// // Event listeners for MongoDB connection events
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log("DB connected"); // Database connected
// });

// // Routes
// app.get("/", (req, res) => {
//     res.send("My API");
// });

// app.listen(9002, () => {
//     console.log("Be Started at port 9002");
// });
