var express = require('express'),
    errorHandler = require('errorhandler'),
	bodyParser = require('body-parser'),
    app = express();
var request = require('request');
var HOSTNAME = 'localhost',
    PORT = 8080,
    PUBLIC_DIR = __dirname + '/public_html';

var counter = 0;

app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler());

app
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json());

app.use(function (req, res, done) {
	console.log('Request #%s at %s \n\t URL: %s   method: %s \n\t body: ', ++counter, new Date(), req.url ,req.method);
	//console.log(req.body);
	done();
});

app.put('/login', function(req, res) {
	var username = req.body.login;
	var password = req.body.password;
	var newurl = 'http://localhost:8081/api/session/';
	request({ url: newurl, method: 'PUT', json: {login: username, password: password}}).pipe(res);
});

app.put('/register', function(req, res) {
	var login = req.body.login;
	var password = req.body.password;
	var newurl = 'http://localhost:8081/api/user';
	request({ url: newurl, method: 'PUT', json: {login: login, password: password}}).pipe(res);
});


app.listen(PORT, function () {
	console.log("listening at http://%s:%s", HOSTNAME, PORT);
});
