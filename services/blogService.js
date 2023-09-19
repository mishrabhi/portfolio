const Blog = require("../schema/blogSchema");

exports.create = (data) => {
  return new Promise((resolve, reject) => {
    let newBlog = new Blog(data);
    newBlog
      .save()
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.blogList = (filter, limit) => {
  return new Promise((resolve, reject) => {
    Blog.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.getOne = (alias) => {
  return new Promise((resolve, reject) => {
    Blog.findOne({ alias: alias })
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.deleteBlog = (alias) => {
  return new Promise((resolve, reject) => {
    Blog.findOneAndDelete({ alias: alias })
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.updateBlog = (alias, dt) => {
  return new Promise((resolve, reject) => {
    Blog.findOneAndUpdate(
      { alias: alias },
      { $set: dt, $inc: { __v: 1 } },
      { new: true }
    )
      .then((dt) => {
        console.log("Updated Data", dt);
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
