const { Router } = require("express");
const DayTable = require("../../models/DayTable");
const getDayTable = Router();

getDayTable.post("/", (req, res) => {
  (async () => {
    try {
      const { tableid, date } = req.body;
      const table = await DayTable.findOne({ table: tableid, date: date });
      if (table) return res.status(200).json(table);
      return res.status(404).json({ message: "Table not found!" });
    } catch (e) {
      return res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = getDayTable;
