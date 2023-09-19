const data = require("./data").data;
const router = require("express").Router();
const ProjectService = require("../services/projectService");

router.get("/", (req, res, next) => {
  function callback(err, dt) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.render("projects", {
        title: "Projects",
        navproject: true,
        layout: "layout",
        projects: dt,
      });
    }
  }
  ProjectService.list(callback, { status: "active" });
});

router.get("/:alias", (req, res) => {
  const alias = req.params.alias;
  let dt = data.projects[data.projectIndex[alias]];
  res.render("projectDetail", {
    title: "Project Detail",
    layout: "layout",
    project: dt,
  });
});

module.exports = router;
