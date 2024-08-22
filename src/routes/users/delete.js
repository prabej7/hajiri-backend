const { Router } = require("express");
const User = require("../../models/user.model");
const { getData } = require("../../services/auth");
const Table = require("../../models/table.model");
const DayTable = require("../../models/DayTable");
const Attendee = require("../../models/attendee.model");
const deleteUser = Router();

deleteUser.post("/", (req, res) => {
  (async () => {
    try {
      const { token } = req.body;

      const user = await User.findById(getData(token).id).populate({
        path: "tables",
        populate: {
          path: "attendees",
          model: "attendee",
        },
        populate: {
          path: "tables",
          model: "dayTable",
        },
      });

      user.tables.map(async (table) => {
        table.attendees.map(async (attendee) => {
          await Attendee.deleteOne(attendee);
        });
        table.tables.map(async (dayTable) => {
          await DayTable.deleteOne(dayTable);
        });
        await Table.deleteOne(table);
      });

      await User.deleteOne({ _id: getData(token).id });
      return res.status(200).json({message:"Successfully delete account!"})
    } catch (e) {
      return res.status(200).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = deleteUser;
