const data = require("./data").data;
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("blogs", {
    title: "Blogs",
    layout: "layout",
    navBlogs: true,
  });
});

router.get("/", (req, res) => {
  let params = req.params.alias;
  let title = params
    .split("-")
    .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1))
    .join(" ");
  res.render("blogDetail", {
    title: `Blog - ${title}`,
    layout: "layout",
  });
});

module.exports = router;
