const { Router } = require("express");
const Attendee = require("../../models/attendee.model");
const updatePresence = Router();

updatePresence.post("/", (req, res) => {
  (async () => {
    try {
      const { attendeeid, date } = req.body;
      console.log(req.body);
      // const attendee = await Attendee.findById(attendeeid);
      // attendee.presence = !attendee.presence;
      // await attendee.save();

      return res.status(200).json({ message: "Successfully saved the table." });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = updatePresence;
