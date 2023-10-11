const Contact = require("../schema/contactSchema");
const axios = require("axios");

module.exports.create = (dt) => {
  return new Promise((resolve, reject) => {
    const newContact = new Contact(dt);
    newContact
      .save()
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// module.exports.contactList = () => {
//   return new Promise((resolve, reject) => {
//     Contact.find()
//       .then((dt) => {
//         resolve(dt);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

exports.contactList = () => {
  const headers = {
    "x-access-apiKey": "f02032c1-3099-45df-b7b9-f18d86c633f8",
  };
  let uri = "http://localhost:3100/api/contacts";
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
