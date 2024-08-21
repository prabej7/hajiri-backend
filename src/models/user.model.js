const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
    },
    fullName: {
      type: String,
    },
    tables: [
      {
        type: Schema.Types.ObjectId,
        ref: "table",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);

module.exports = User;
