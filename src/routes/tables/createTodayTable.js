const { Router } = require("express");
const Table = require("../../models/table.model");
const DayTable = require("../../models/DayTable");
const createTodayTable = Router();

createTodayTable.post("/", async (req, res) => {
  try {
    const { tableid, date } = req.body;

    const table = await Table.findById(tableid).populate("attendees");

    const existingDayTable = await DayTable.findOne({
      date: date,
      table: tableid,
    });

    if (!existingDayTable) {
      const attendeesWithPresence = table.attendees.map((attendee) => ({
        _id: attendee._id,
        name: attendee.name,
        presence: false,
      }));

      const newDayTable = new DayTable({
        date: date,
        attendees: attendeesWithPresence,
        table: table._id,
      });

      await newDayTable.save();

      table.tables.push(newDayTable);
      await table.save();

      return res.status(201).json({
        message: "DayTable created successfully.",
        dayTable: newDayTable,
      });
    } else {
      return res
        .status(400)
        .json({ error: "DayTable for this date already exists." });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error." });
  }
});

module.exports = createTodayTable;
