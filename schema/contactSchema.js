const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      trim: true,
    },
    description: String,
    contact: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contacts", contactSchema);
