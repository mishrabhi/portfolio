const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const projectSchema = new Schema({
  title: {
    type: "string",
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 3;
      },
      message: "Minimum length should be 4",
    },
  },
  alias: {
    type: "string",
    required: [true, "alias is required!"],
    unique: true,
  },
  shortDescription: String,
  description: String,
  image: String,
  tags: [{ name: String, class: String }],
  relatedProjects: [
    {
      name: String,
      link: String,
    },
  ],
  githubUrl: String,
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  updatedOn: Date,
  createdBy: String,
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
    default: "active",
  }, //enum: {values: ['active', 'inactive'], message: '{VALUE} is not supported' }
});

module.exports = mongoose.model("projects", projectSchema);

//Here we are exporting the actual collection
