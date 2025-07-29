const mongoose = require("mongoose");
require ("dotenv").config();

const mongoUri = process.env.MONGODB
console.log(mongoUri)

const initializeDB = async () => {
  await mongoose.connect(mongoUri).then(() => {
    console.log("Connected to database.")
  }).catch((error) => console.log("Error connecting to database", error))
};
       

module.exports = { initializeDB }