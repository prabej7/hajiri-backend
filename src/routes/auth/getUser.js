const { Router } = require("express");
const { getData } = require("../../services/auth");
const User = require("../../models/user.model");

const getUser = Router();

getUser.post("/", (req, res) => {
  (async () => {
    try {
      const { token } = req.body;
      const isData = getData(token);
      if (isData == 1)
        return res.status(401).json({ message: "Unauthorized user." });
      const user = await User.findById(isData.id).populate({
        path: "tables",
        populate: [
          { path: "attendees", model: "attendee" },
          {
            path: "tables",
            model: "table",
          },
        ],
      });

      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = getUser;
