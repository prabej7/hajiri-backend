const { Router } = require("express");
const Table = require("../../models/table.model");
const Attendee = require("../../models/attendee.model");
const User = require("../../models/user.model");
const { getData } = require("../../services/auth");

const deleteTable = Router();

deleteTable.post("/", (req, res) => {
  (async () => {
    try {
      const { tableid, token } = req.body;
      const table = await Table.findById(tableid);
      Promise.all(
        table.attendees.map(async (attendee) => {
          await Attendee.deleteOne({ _id: attendee._id });
        })
      );
      await Table.deleteOne({ _id: tableid });
      const result = await User.updateOne(
        { _id: getData(token).id },
        { $pull: { tables: tableid } }
      );

      return res.status(200).json({ message: "Table deleted successfully!" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = deleteTable;
