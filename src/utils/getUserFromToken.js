const User = require("../models/user.model");
const { getData } = require("../services/auth");

const getUserFromToken = async (token) => {
  try {
    return await User.findById(getData(token).id);
  } catch (e) {
    return e;
  }
};

module.exports = getUserFromToken;
