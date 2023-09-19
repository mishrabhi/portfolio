const Contact = require("../schema/contactSchema");

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

module.exports.contactList = () => {
  return new Promise((resolve, reject) => {
    Contact.find()
      .then((dt) => {
        resolve(dt);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
