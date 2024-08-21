const { Schema, model } = require("mongoose");

const attendeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    presence: {
      type: Boolean,
      default: false,
    },
    table: {
      type: Schema.Types.ObjectId,
      ref: "table",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attendee = model("attendee", attendeeSchema);

module.exports = Attendee;
