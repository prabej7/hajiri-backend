const { Router } = require("express");
const Attendee = require("../../models/attendee.model");
const Table = require("../../models/table.model");

const addAttendees = Router();

addAttendees.post("/", async (req, res) => {
  try {
    const { tableid, attendees } = req.body;
    
    const table = await Table.findById(tableid);

    if (!table) {
      return res.status(404).json({ message: "Table not found." });
    }

    const attendeePromises = attendees.map(async (attendee) => {
      const newAttendee = new Attendee({
        name: attendee.name,
        presence: false,
        table: table._id,
      });

      const savedAttendee = await newAttendee.save();
      table.attendees.push(savedAttendee._id);
      return savedAttendee;
    });

    await Promise.all(attendeePromises);
    await table.save();

    return res.status(200).json({ message: "Attendee(s) added successfully!" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = addAttendees;
