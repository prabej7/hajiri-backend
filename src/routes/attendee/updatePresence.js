const { Router } = require("express");
const DayTable = require("../../models/DayTable");
const Attendee = require("../../models/attendee.model");

const updatePresence = Router();

updatePresence.post("/", async (req, res) => {
  try {
    const { attendeeid, tableid } = req.body;

    // Toggle the presence field directly in a single query
    let dayTable = await DayTable.findOne({
      _id: tableid,
      "attendees._id": attendeeid,
    });

    const attendee = dayTable.attendees.find(
      (attendee) => attendee._id == attendeeid
    );

    const a = await Attendee.findById(attendeeid);
    let present = a.present;

    console.log(attendee.presence);

    if (attendee.presence) {
      present--;
    } else {
      present++;
    }

    await Attendee.updateOne(
      { _id: attendeeid },
      { $set: { present: present } }
    );
    await DayTable.updateOne(
      { _id: tableid, "attendees._id": attendeeid },
      { $set: { "attendees.$.presence": !attendee.presence } }
    );

    return res.status(200).json({ message: "Successfully updated presence." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = updatePresence;
