const data = require("./data").data;
const router = require("express").Router();
const BlogService = require("../services/blogService");

router.get("/", (req, res, next) => {
  BlogService.blogList()
    .then((dt) => {
      res.render("blogs", {
        title: "Blogs",
        navBlog: true,
        layout: "layout",
        blogs: dt,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:alias", (req, res) => {
  const alias = req.params.alias;
  let dt = data.blogs[data.blogIndex[alias]];
  res.render("projectDetail", {
    title: "Blog Detail",
    layout: "layout",
    project: dt,
  });
});

module.exports = router;
