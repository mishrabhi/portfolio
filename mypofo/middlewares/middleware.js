module.exports.logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

module.exports.notFound = (req, res, next) => {
  res.status(404).send("Page Not Found");
};

module.exports.handleError = (err, req, res, next) => {
  res.status(500).send("Something Went Wrong");
};

exports.authenticate = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/signin");
  }
};
