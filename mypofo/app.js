const express = require("express");
const hbs = require("hbs");
const session = require("express-session");
const middleware = require("./middlewares/middleware");
const routes = require("./routes");
const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");
app.use(middleware.logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "mysupersecretwebappsessionkey",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 10000000 },
  })
);

app.use(express.static(__dirname + "/static"));

app.get("/", routes.index);
app.get("/projects", routes.projectList);
app.get("/blogs", routes.blogs);
app.get("/contact", routes.contact);
app.get("/signin", routes.signIn);
app.post("/signin", routes.doSignin);
app.get("/signup", routes.signUp);
app.get("/admin", middleware.authenticate, routes.admin);
app.get("/admin/projects", middleware.authenticate, routes.adminProjectList);
app.get("/projects/:alias", middleware.authenticate, routes.projectDetail);
app.get("/blogs/:alias", middleware.authenticate, routes.blogDetail);

app.use(middleware.notFound);
app.use(middleware.handleError);

app.listen(3000, () => console.log("App up and running on port 3000"));
