const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
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
  phone: {
    type: Number,
  },
});

module.exports = mongoose.model("contacts", contactSchema);
