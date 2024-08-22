const { Router } = require("express");
const DayTable = require("../../models/DayTable");

const getRecentTable = Router();

getRecentTable.get("/", (req, res) => {
  (async () => {
    try {
      const mostRecentTable = await DayTable.findOne().sort({ updatedAt: -1 });

      return res.status(200).json(mostRecentTable);
    } catch (e) {
      return res.status(500).json({ error: "Internal Server error" });
    }
  })();
});

module.exports = getRecentTable;
