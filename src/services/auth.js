const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const getToken = (payload) => {
  if (!payload) return console.log("Please provide the payload.");
  if (!secretKey) return console.log("Please provide the JWT secret key.");
  return jwt.sign(payload, secretKey);
};

const getData = (token) => {
  if (!token) return console.log("Please provide the token.");
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    return 1;
  }
};

module.exports = {
  getToken,
  getData,
};
