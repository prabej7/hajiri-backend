const { Router } = require("express");
const User = require("../../models/user.model");
const { getData } = require("../../services/auth");

const deleteUser = Router();

deleteUser.post("/", (req, res) => {
  (async () => {
    try {
      const { token } = req.body;
      await User.deleteOne({ _id: getData(token).id });
    } catch (e) {
      return res.status(200).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = deleteUser;
