const express = require("express");
const hbs = require("hbs");
const session = require("express-session");
const mongoose = require("mongoose");
const middleware = require("./middlewares/middleware");
const index = require("./routes/index");
const projectRoutes = require("./routes/projects");
const blogRoutes = require("./routes/blogs");
const adminRoutes = require("./routes/admin");
const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");
app.use(middleware.logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://127.0.0.1:27017/mypofo")
  .then((dt) => {
    console.log("DB Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  session({
    secret: "mysupersecretwebappsessionkey",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 10000000 },
  })
);

app.use(express.static(__dirname + "/static"));
app.use(middleware.authenticated);

app.use("/", index);
app.use("/projects", projectRoutes);
app.use("/blogs", blogRoutes);
app.use("/admin", middleware.authenticate, adminRoutes);

app.use(middleware.notFound);
app.use(middleware.handleError);

app.listen(3000, () => console.log("App up and running on port 3000"));
