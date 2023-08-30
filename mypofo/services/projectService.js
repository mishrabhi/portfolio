const Project = require("../schema/projectSchema");

exports.create = (data) => {
  let project = new Project(data);
  project
    .save()
    .then((dt) => {
      console.log("Data Saved Success", dt);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.list = (cb) => {
  Project.find()
    .then((dt) => {
      console.log("Data from DB", dt);
      cb(null, dt);
    })
    .catch((err) => {
      cb(err, null);
    });
};
