const Blog = require("../schema/blogSchema");
const axios = require("axios");

//Create Blog
exports.create = (data, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  let uri = "http://localhost:3100/api/blogs";
  return new Promise((resolve, reject) => {
    axios
      .post(uri, data, { headers: headers })
      .then((resp) => {
        if (resp.status === 201) {
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

//Blog List
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

//Get one Blog
exports.getOne = (alias) => {
  const headers = {
    "x-access-apiKey": "f02032c1-3099-45df-b7b9-f18d86c633f8",
  };
  let uri = `http://localhost:3100/api/blogs/${alias}`;
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

//Delete Blog
exports.deleteBlog = (alias, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  let uri = `http://localhost:3100/api/blogs/${alias}`;
  console.log(uri);
  return new Promise((resolve, reject) => {
    axios
      .delete(uri, { headers: headers })
      .then((resp) => {
        if (resp.status === 204) {
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

//Update Blog
exports.updateBlog = (alias, data, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  let uri = `http://localhost:3100/api/blogs/${alias}`;
  console.log(uri);
  return new Promise((resolve, reject) => {
    axios
      .put(uri, data, { headers: headers })
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
