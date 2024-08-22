const { Router } = require("express");
const Table = require("../../models/table.model");

const getTables = Router();

getTables.get("/:tableid", (req, res) => {
  (async () => {
    try {
      const table = await Table.findById(req.params.tableid).populate(
        "attendees"
      );
      return res.status(200).json(table);
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error." });
    }
  })();
});

module.exports = getTables;
