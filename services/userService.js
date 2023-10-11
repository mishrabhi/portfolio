const User = require("../schema/userSchema");
const axios = require("axios");

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
  const headers = {
    "Content-Type": "application/json",
    // authorisation: `Bearer ${req.session.token}`,
  };
  const url = `http://localhost:3100/auth/signin`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, bodyData, { header: headers })
      .then((resp) => {
        console.log("success");
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
