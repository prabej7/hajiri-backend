const { Router } = require("express");
const User = require("../../models/user.model");
const { getData } = require("../../services/auth");
const updateUser = Router();

updateUser.post("/", (req, res) => {
  (async () => {
    try {
      const { token } = req.body;
      const user = await User.findById(getData(token).id);
      console.log(user);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = updateUser;
