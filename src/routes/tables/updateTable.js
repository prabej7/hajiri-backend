const { Router } = require("express");
const Table = require("../../models/table.model");

const updateTable = Router();

updateTable.post("/", (req, res) => {
  (async () => {
    try {
      const { tableid, newName } = req.body;
      await Table.updateOne({ _id: tableid }, { $set: { name: newName } });
      return res
        .status(200)
        .json({ message: "Table name updated successfully!" });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = updateTable;
