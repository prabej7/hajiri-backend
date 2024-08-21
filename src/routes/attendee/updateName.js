const { Router } = require("express");
const Attendee = require("../../models/attendee.model");

const updateName = Router();

updateName.post("/", (req, res) => {
  (async () => {
    try {
      const { atndid, newName } = req.body;
      await Attendee.updateOne({ _id: atndid }, { $set: { name: newName } });
      return res.status(200).json({ message: "Attedee updated successfully!" });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = updateName;
