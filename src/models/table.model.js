const { Schema, model } = require("mongoose");

const tableSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "attendee",
      },
    ],
    tables: [
      {
        type: Schema.Types.ObjectId,
        ref: "dayTable",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Table = model("table", tableSchema);

module.exports = Table;
