const User = require("../schema/userSchema");

exports.createUser = (data) => {
  return new Promise((resolve, reject) => {
    const newUser = new User(data);
    newUser
      .save()
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.signin = (bodyData) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: bodyData.email })
      .then((dt) => {
        if (dt && dt != null) {
          if (dt.password === bodyData.password) {
            resolve(dt);
          } else {
            reject(new Error("Credentials are not Correct"));
          }
        } else {
          reject(new Error("Credentials are not Correct"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
