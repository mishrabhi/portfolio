const Blog = require("../schema/blogSchema");

module.exports.create = (data) => {
  let blogs = new Blog(data);
  blogs
    .save()
    .then((dt) => {
      console.log("Data Saved Success", dt);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.blogList = () => {
  return new Promise((resolve, reject) => {
    Blog.find()
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
