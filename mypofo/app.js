const express = require('express');
const hbs = require('hbs');
const middleware = require('./middlewares/middleware');
const routes = require('./routes');
const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');
hbs.registerPartials(__dirname+'/views/partials');
app.use(middleware.logger);
app.use(express.static(__dirname+'/static'));


app.get('/', routes.index);

app.use(middleware.notFound);
app.use(middleware.handleError);


app.listen(3000, () => console.log('App up and running on port 3000'));