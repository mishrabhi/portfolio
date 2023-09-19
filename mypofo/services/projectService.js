const Project = require("../schema/projectSchema");

exports.create = (data) => {
  return new Promise((resolve, reject) => {
    let newProject = new Project(data);
    newProject
      .save()
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.list = (cb, filter) => {
  Project.find(filter)
    .then((dt) => {
      console.log("Data from DB", dt);
      cb(null, dt);
    })
    .catch((err) => {
      cb(err, null);
    });
};

exports.getOne = (alias) => {
  return new Promise((resolve, reject) => {
    Project.findOne({ alias: alias })
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.deleteProject = (alias) => {
  return new Promise((resolve, reject) => {
    Project.findOneAndDelete({ alias: alias })
      .then((dt) => {
        resolve(dt);
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
