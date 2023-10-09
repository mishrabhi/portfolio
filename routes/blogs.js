const data = require("./data").data;
const router = require("express").Router();
const BlogService = require("../services/blogService");

router.get("/", (req, res, next) => {
  const filter = {};
  if (req.query.blogCategory) {
    filter.blogCategory = req.query.blogCategory;
  }
  BlogService.blogList(filter)
    .then((data) => {
      console.log(data.data);
      const featuredBlog = data.data.data.filter((e) => e.isFeatured);
      res.render("blogs", {
        title: "Blogs",
        navBlog: true,
        layout: "layout",
        blogs: data.data.data,
        featuredBlog: featuredBlog[0],
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:alias", (req, res, next) => {
  let params = req.params.alias;
  let title = params
    .split("-")
    .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1))
    .join(" ");
  BlogService.getOne(params)
    .then((data) => {
      console.log(data.data);
      res.render("blogDetail", {
        title: `Blog - ${title}`,
        layout: "layout",
        blog: data.data,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// router.get("/:alias", async (req, res, next) => {
//   try {
//     let blogList = await BlogService.blogList({}, 3);
//     let blogDetail = await BlogService.getOne(req.params.alias);
//     console.log("Blog List", blogList);
//     res.render("blogDetail", {
//       title: "Blog - ${title}",
//       layout: "layout",
//     });
//   } catch (error) {
//     next(error);
//   }
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
// });

module.exports = router;
