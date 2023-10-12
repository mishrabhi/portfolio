const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
      unique: true,
    },
    shortDescription: String,
    description: String,
    image: String,
    relatedBlogs: [
      {
        name: String,
        link: String,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    blogCategory: {
      type: String,
      enum: [
        "Technology",
        "HTML",
        "CSS",
        "Javascript",
        "Express",
        "MongoDB",
        "Node",
      ],
    },
    author: String,
    createdBy: mongoose.Types.ObjectId,
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogs", blogSchema);
