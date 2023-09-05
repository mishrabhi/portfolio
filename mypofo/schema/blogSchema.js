const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  name: {
    type: "string",
    required: true,
  },
  alias: {
    type: "string",
    required: true,
    unique: true,
  },
  shortDescription: "string",
  Description: String,
  image: String,
  tags: [{ name: String, class: String }],
  relatedProjects: [
    {
      name: String,
      link: String,
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  updatedOn: Date,
  createdBy: String,
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("blogs", blogSchema);
