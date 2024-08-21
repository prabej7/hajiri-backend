const { Router } = require("express");
const Table = require("../../models/table.model");
const getUserFromToken = require("../../utils/getUserFromToken");
const createTable = Router();

createTable.post("/", (req, res) => {
  (async () => {
    const { token, tableName } = req.body;

    const user = await getUserFromToken(token);
    if (user) {
      const newTable = new Table({
        name: tableName,
        tables: [],
      });
      user.tables.push(await newTable.save());
      await user.save();
      return res.status(200).json({ message: "Table created successfully!" });
    }
    try {
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  })();
});

module.exports = createTable;
