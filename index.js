var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

global.appRoot = path.resolve(__dirname);

mongoose.connect('mongodb://localhost:27017/reqwhy', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/public'));

var routes = require('./src/routes/reqwhyRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(3000, function () {
  console.log('Node API server started on port '+ 3000);
});