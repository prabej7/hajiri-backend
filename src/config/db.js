const { connect } = require("mongoose");

const DB_URL = process.env.DB_URL;

const connectToDatabase = async () => {
  if (!DB_URL) return console.log("Plese provide a DB Url.");
  try {
    await connect(DB_URL);
    console.log("Database connected successfully!");
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectToDatabase;
