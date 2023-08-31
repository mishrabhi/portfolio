const data = require("./data").data;
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("admin/index", {
    layout: "adminLayout",
  });
});

router.get("/projects", (req, res) => {
  res.render("admin/projectList", {
    layout: "adminLayout",
    projects: data.projects,
  });
});

module.exports = router;
