const router = require("express").Router();
const ContactService = require("../services/contactService");
const ProjectService = require("../services/projectService");

router.get("/", (req, res) => {
  res.render("admin/index", {
    layout: "adminLayout",
  });
});

router.get("/projects", (req, res, next) => {
  function cb(err, dt) {
    if (err) {
      next(err);
    } else {
      res.render("admin/projectList", {
        layout: "adminLayout",
        projects: dt,
      });
    }
  }
  ProjectService.list(cb);
});

router.get("/contacts", (req, res, next) => {
  ContactService.contactList()
    .then((dt) => {
      res.render("admin/contactList", {
        layout: "adminLayout",
        contacts: dt,
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
