const { Router } = require("express");
const Attendee = require("../../models/attendee.model");
const Table = require("../../models/table.model");

const deleteAttendees = Router();

deleteAttendees.post("/", (req, res) => {
  (async () => {
    try {
      const { atndid } = req.body;
      const attendee = await Attendee.findById(atndid);
      await Table.updateOne(
        { _id: attendee.table },
        { $pull: { attendees: atndid } }
      );
      await Attendee.deleteOne({ _id: atndid });
      return res
        .status(200)
        .json({ message: "Attendee deleted successfully!" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = deleteAttendees;
