const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const ContactService = require("../services/contactService");
const ProjectService = require("../services/projectService");
const BlogService = require("../services/blogService");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../static/images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.render("admin/index", {
    layout: "adminLayout",
  });
});

router.get("/contacts", (req, res, next) => {
  ContactService.contactList()
    .then((dt) => {
      res.render("admin/contactList", {
        layout: "adminLayout",
        contacts: dt.data,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// router.get("/projects", (req, res, next) => {
//   function cb(err, dt) {
//     if (err) {
//       next(err);
//     } else {
//       res.render("admin/projectList", {
//         layout: "adminLayout",
//         projects: dt,
//       });
//     }
//   }
//   ProjectService.list(cb, {});
// });

router.get("/projects", (req, res, next) => {
  ProjectService.projectList()
    .then((dt) => {
      console.log(dt.data.data);
      res.render("admin/projectList", {
        layout: "adminLayout",
        projects: dt.data.data,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/projects/create", (req, res) => {
  res.render("admin/projectCreate", {
    layout: "adminLayout",
  });
});

router.post("/projects/create", (req, res, next) => {
  let bodyData = req.body;
  let classes = ["primary", "info", "danger", "success"];
  let finalTags = [];
  if (bodyData.tags && bodyData.tags != "" && bodyData.tags != null) {
    let tags = bodyData.tags.split(",");

    finalTags = tags.map((e, i) => {
      return { name: e, class: classes[i] };
    });
  }

  bodyData.tags = finalTags;
  bodyData.alias = bodyData.name.toLowerCase().split(" ").join("-");
  ProjectService.create(bodyData)
    .then((dt) => {
      res.redirect("/admin/projects");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/projects/:alias", (req, res, next) => {
  const alias = req.params.alias;
  ProjectService.getOne(alias)
    .then((dt) => {
      res.render("admin/projectDetail", {
        layout: "adminlayout",
        project: dt,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/projects/:alias/delete", (req, res, next) => {
  const alias = req.params.alias;
  ProjectService.deleteProject(alias)
    .then((dt) => {
      res.redirect("/admin/projects");
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/projects/:alias/update", (req, res, next) => {
  const alias = req.params.alias;
  const bodyData = req.body;
  let classes = ["primary", "info", "danger", "success"];
  let finalTags = [];
  if (bodyData.tags && bodyData.tags != "" && bodyData.tags != null) {
    let tags = bodyData.tags.split(",");

    finalTags = tags.map((e, i) => {
      return { name: e, class: classes[i] };
    });
  }
  bodyData.tags = finalTags;
  bodyData.alias = bodyData.name.toLowerCase().split(" ").join("-");

  ProjectService.updateProject(alias, bodyData)
    .then((dt) => {
      res.redirect("/admin/projects");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/projects/:alias/upload", (req, res) => {
  res.render("admin/upload", {
    layout: "adminLayout",
    path: `/admin/projects/${req.params.alias}/upload`,
  });
});

router.post(
  "/projects/:alias/upload",
  upload.single("img"),
  (req, res, next) => {
    let fileData = req.file;
    ProjectService.updateProject(req.params.alias, {
      image: `/images/${fileData.filename}`,
    })
      .then((dt) => {
        res.redirect("/admin/projects");
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.get("/blogs", (req, res, next) => {
  BlogService.blogList({})
    .then((dt) => {
      console.log(dt.data.data);
      res.render("admin/blogList", {
        layout: "adminLayout",
        blogs: dt.data.data,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/blogs/create", (req, res) => {
  res.render("admin/blogCreate", {
    layout: "adminLayout",
  });
});

router.post("/blogs/create", (req, res, next) => {
  let bodyData = req.body;
  bodyData.alias = bodyData.name.toLowerCase().split(" ").join("-");
  bodyData.author = req.session.user.name;
  bodyData.createdBy = req.session.user._id;
  BlogService.create(bodyData)
    .then((dt) => {
      res.redirect("/admin/blogs");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/blogs/:alias", (req, res, next) => {
  const alias = req.params.alias;
  BlogService.getOne(alias)
    .then((dt) => {
      res.render("admin/blogDetail", {
        layout: "adminLayout",
        blog: dt,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/blogs/:alias/delete", (req, res, next) => {
  const alias = req.params.alias;
  BlogService.deleteBlog(alias)
    .then((dt) => {
      res.redirect("/admin/blogs");
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/blogs/:alias/update", (req, res, next) => {
  const alias = req.params.alias;
  const bodyData = req.body;
  BlogService.updateBlog(alias, bodyData)
    .then((dt) => {
      res.redirect("/admin/blogs");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/blogs/:alias/upload", (req, res) => {
  res.render("admin/upload", {
    layout: "adminLayout",
    path: `/admin/blogs/${req.params.alias}/upload`,
  });
});

router.post("/blogs/:alias/upload", upload.single("img"), (req, res, next) => {
  let fileData = req.file;
  BlogService.updateBlog(req.params.alias, {
    image: `/images/${fileData.filename}`,
  })
    .then((dt) => {
      res.redirect("/admin/blogs");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
