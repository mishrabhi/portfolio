const data = require("./data").data;
const router = require("express").Router();
const ContactService = require("../services/contactService");
const BlogService = require("../services/blogService");
const UserService = require("../services/userService");

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

router.post("/contact", (req, res, next) => {
  let data = req.body;

  ContactService.create(data)
    .then((dt) => {
      res.render("contact", {
        title: "Contact",
        layout: "layout",
        navContact: true,
        message: "Request submitted Successfully",
      });
    })
    .catch((err) => {
      next(err);
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

// let user = [
//   {
//     name: "Ashutosh",
//     email: "asmyselfashu@gmail.com",
//     password: "test",
//   },
//   {
//     name: "Raja",
//     email: "raja@gmail.com",
//     password: "test",
//   },
//   {
//     name: "Abhishek",
//     email: "asmyselfabhishek00@gmail.com",
//     password: "test",
//   },
// ];

router.post("/signup", (req, res, next) => {
  const bodyData = req.body;

  if (!bodyData || bodyData.name == "") {
    res.render("signup", {
      title: "Signup",
      layout: "loginLayout",
      message: "Name Field is required",
    });
  }

  UserService.createUser(bodyData)
    .then((dt) => {
      res.redirect("/signin");
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/signin", (req, res) => {
  const data = req.body;
  userService
    .signin(data)
    .then((dt) => {
      req.session.isLoggedIn = true;
      req.session.user = dt;
      res.redirect("/admin");
    })
    .catch((err) => {
      if (err.message == "Credentials are not Correct") {
        res.render("signin", {
          title: "Signin",
          layout: "loginLayout",
          message: "Email or password is incorrect",
        });
      } else {
        next(err);
      }
    });
});

router.get("/logout", (req, res) => {
  req.session.isLoggedIn = false;
  delete res.locals.user;
  res.redirect("/");
});

module.exports = router;
