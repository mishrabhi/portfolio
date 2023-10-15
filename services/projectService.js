const Project = require("../schema/projectSchema");
const axios = require("axios");

exports.create = (data, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  let uri = `http://localhost:3100/api/projects`;
  console.log(uri);
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

exports.projectList = () => {
  const headers = {
    "x-access-apiKey": "f02032c1-3099-45df-b7b9-f18d86c633f8",
  };
  let uri = "http://localhost:3100/api/projects";
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
  const headers = {
    "x-access-apiKey": "f02032c1-3099-45df-b7b9-f18d86c633f8",
  };
  let uri = `http://localhost:3100/api/projects/${alias}`;
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

exports.deleteProject = (alias) => {
  const headers = {
    "x-access-apiKey": "f02032c1-3099-45df-b7b9-f18d86c633f8",
  };
  let uri = `http://localhost:3100/api/projects/${alias}`;
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

exports.updateProject = (alias, dt) => {
  return new Promise((resolve, reject) => {
    Project.findOneAndUpdate(
      { alias: alias },
      { $set: dt, $inc: { __v: 1 } },
      { new: true }
    )
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
