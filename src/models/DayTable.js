const { Schema, model } = require("mongoose");

const attendeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  presence: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const dayTableSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  attendees: [attendeeSchema], 
  table: {
    type: Schema.Types.ObjectId,
    ref: "table",
  },
});

const DayTable = model("dayTable", dayTableSchema);

module.exports = DayTable;
