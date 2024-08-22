const { connect } = require("mongoose");

const DB_URL = process.env.DB_URL;

const connectToDatabase = async (url) => {
  try {
    await connect(DB_URL);
    console.log("Database connected successfully!");
  } catch (e) {
    await connect(url);
    console.log("Database connected successfully!");
  }
};

module.exports = connectToDatabase;
