exports.logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

exports.notFound = (req, res, next) => {
  res.status(404).render("notFound", {
    title: "Page Not Found",
    layout: "loginLayout",
  });
};

exports.handleError = (err, req, res, next) => {
  console.log(err);
  res.status(500).render("500", {
    title: "Internal Server Error!",
    layout: "loginLayout",
  });
};

exports.authenticate = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/signin");
  }
};

exports.authenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.locals.user = req.session.user;
    next();
  } else {
    next();
  }
};
