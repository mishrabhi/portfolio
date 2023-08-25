const data = require("./data").data;

exports.index = (req, res) => {
  res.render("home", {
    title: "Abhishek - Portfolio",
    layout: "homeLayout",
  });
};

exports.projectList = (req, res) => {
  res.render("projects", {
    title: "Projects",
    navProject: true,
    layout: "layout",
    projects: data.projects,
  });
};

exports.blogs = (req, res) => {
  res.render("blogs", {
    title: "Blogs",
    layout: "layout",
    navBlogs: true,
  });
};

exports.contact = (req, res) => {
  res.render("contact", {
    title: "contact",
    layout: "layout",
    mavContact: true,
  });
};

exports.projectDetail = (req, res) => {
  const alias = req.params.alias;

  let dt = data.project[data.projectIndex[alias]];

  res.render("projectDetail", {
    title: "Project Detail",
    layout: "layout",
    project: dt,
  });
};

exports.blogDetail = (req, res) => {
  let params = req.params.alias;
  let title = params
    .split("-")
    .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1))
    .join(" ");
  res.render("blogDetail", {
    title: `Blog - ${title}`,
    layout: "layout",
  });
};

exports.signIn = (req, res) => {
  res.render("signin", {
    title: "signin",
    layout: "loginLayout",
  });
};

exports.signUp = (req, res) => {
  res.render("signup", {
    title: "Signup",
    layout: "loginlayout",
  });
};

exports.admin = (req, res) => {
  res.render("admin/index", {
    layout: "adminLayout",
  });
};

exports.adminProjectList = (req, res) => {
  res.render("admin/projectList", {
    layout: "adminLayout",
    projects: data.projects,
  });
};

let user = [
  {
    name: "Ashutosh",
    email: "asmyselfashu@gmail.com",
    password: "test",
  },
  {
    name: "Raja",
    email: "raja@gmail.com",
    password: "test",
  },
];

exports.doSignin = (req, res) => {
  const data = req.body;
  let findUser = user.filter((e) => e.email == data.email);
  if (findUser.length > 0) {
    if (findUser[0].password === data.password) {
      req.session.isLoggedIn = true;
      req.session.user = findUser[0];
      res.redirect("/admin");
    } else {
      res.render("signin", {
        title: "Signin",
        layout: "loginLayout",
        message: "Email or password is incorrect",
      });
    }
  } else {
    res.render("signin", {
      title: "Signin",
      layout: "loginLayout",
      message: "Email or password is incorrect",
    });
  }
};
