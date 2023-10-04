const Blog = require("../schema/blogSchema");
const axios = require("axios");

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

exports.blogList = (filter) => {
  const headers = {
    "x-access-apiKey": "f02032c1-3099-45df-b7b9-f18d86c633f8",
  };
  let uri = "http://localhost:3100/api/blogs";
  if (filter.blogCategory) {
    uri = `http://localhost:3100/api/blogs?blogCategory=${filter.blogCategory}`;
  }
  console.log(uri);
  return new Promise((resolve, reject) => {
    axios
      .get(uri, { headers: headers })
      .then((resp) => {
        if (resp.status === 200) {
          resolve(resp.data);
        } else {
          reject(resp.data);
        }
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
