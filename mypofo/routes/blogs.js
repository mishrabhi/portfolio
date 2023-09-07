const data = require("./data").data;
const router = require("express").Router();
const BlogService = require("../services/blogService");

router.get("/", (req, res, next) => {
  const filter = { status: "active" };
  if (req.query.blogCategory) {
    console.log(req.query);
    filter.blogCategory = req.query.blogCategory;
  }
  BlogService.blogList(filter, 20)
    .then((dt) => {
      const featuredBlog = dt.filter((e) => e.isFeatured);
      res.render("blogs", {
        title: "Blogs",
        navBlog: true,
        layout: "layout",
        blogs: dt,
        featuredBlog: featuredBlog[0],
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:alias", async (req, res, next) => {
  try {
    let blogList = await BlogService.blogList({}, 3);
    let blogDetail = await BlogService.getOne(req.params.alias);
    console.log("Blog List", blogList);
    res.render("blogDetail", {
      title: "Blog Detail",
      layout: "layout",
      blog: blogDetail,
      blogList: blogList,
    });
  } catch (error) {
    next(error);
  }
  // BlogService.blogList(function cb(err, data) {
  //   if (data) {
  //     BlogService.getOne((err, dt) => {
  //       if (err) {

  //       } else {

  //       }
  //     });
  //   } else {

  //   }
  // });
});

module.exports = router;
