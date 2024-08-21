const { Schema, model } = require("mongoose");

const dayTableSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  attendees: [],
  table: {
    type: Schema.Types.ObjectId,
    ref: "table",
  },
});

const DayTable = model("dayTable", dayTableSchema);

module.exports = DayTable;
