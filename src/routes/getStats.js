const { Router } = require("express");
const Table = require("../models/table.model");

const getStats = Router();

getStats.post("/", async (req, res) => {
  try {
    const { tableid } = req.body;
    const table = await Table.findById(tableid).populate("tables");

    // Initialize the data array with all 12 months set to 0 for both present and absent
    const chartData = [
      { month: "January", present: 0, absent: 0 },
      { month: "February", present: 0, absent: 0 },
      { month: "March", present: 0, absent: 0 },
      { month: "April", present: 0, absent: 0 },
      { month: "May", present: 0, absent: 0 },
      { month: "June", present: 0, absent: 0 },
      { month: "July", present: 0, absent: 0 },
      { month: "August", present: 0, absent: 0 },
      { month: "September", present: 0, absent: 0 },
      { month: "October", present: 0, absent: 0 },
      { month: "November", present: 0, absent: 0 },
      { month: "December", present: 0, absent: 0 }
    ];

    table.tables.forEach((table) => {
      const dateString = table.date;
      const dateObject = new Date(dateString);
      const month = dateObject.toLocaleString("default", { month: "long" });

      table.attendees.forEach((attendee) => {
        const monthData = chartData.find((item) => item.month === month);
        if (attendee.presence) {
          monthData.present++;
        } else {
          monthData.absent++;
        }
      });
    });

    
    return res.status(200).json(chartData);
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
});

module.exports = getStats;
