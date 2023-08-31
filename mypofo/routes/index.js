const data = require("./data").data;
const router = require("express").Router();

exports.createProject = (req, res) => {
  let data = req.body;
  ProjectService.create(data);
};

router.get("/", (req, res) => {
  res.render("home", {
    title: "Abhishek - Portfolio",
    layout: "homeLayout",
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "contact",
    layout: "layout",
    navContact: true,
  });
});

router.get("/signin", (req, res) => {
  res.render("signin", {
    title: "signin",
    layout: "loginLayout",
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    title: "Signup",
    layout: "loginlayout",
  });
});

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
  {
    name: "Abhishek",
    email: "asmyselfabhishek00@gmail.com",
    password: "test",
  },
];

router.post("/signin", (req, res) => {
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
});

router.get("/logout", (req, res) => {
  req.session.isLoggedIn = false;
  delete res.locals.user;
  res.redirect("/");
});

module.exports = router;
