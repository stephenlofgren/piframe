var express = require('express');
var picRoute = require('./api/routes/pictureRoutes.js');

app = express(),
port = process.env.PORT || 3000;

bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use('/picture', picRoute);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
