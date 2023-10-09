const data = require("./data").data;
const router = require("express").Router();
const ProjectService = require("../services/projectService");

router.get("/", (req, res, next) => {
  ProjectService.projectList()
    .then((data) => {
      console.log(data.data);
      res.render("projects", {
        title: "Projects",
        navproject: true,
        layout: "layout",
        projects: data.data.data,
      });
    })
    .catch((err) => {
      next(err);
    });
  // ProjectService.projectList(callback, { status: "active" });
});

router.get("/:alias", (req, res) => {
  const alias = req.params.alias;
  // let dt = data.projects[data.projectIndex[alias]];
  ProjectService.getOne(alias)
    .then((data) => {
      console.log(data.data);
      res.render("projectDetail", {
        title: `Project - ${alias}`,
        layout: "layout",
        project: data.data,
      });
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = router;
