var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express(),
	currentRequestNumber = 0;

var HOSTNAME = 'localhost',
    PORT = 8080,
	PUBLIC_DIR_NAME = '/public_html',
    PUBLIC_DIR = __dirname + PUBLIC_DIR_NAME;

app.use(function(req, res, next) {
	var currentDate = new Date();
	// Здесь нужно написать журналирование в формате
	// (журналирование - вывод в консоль)
	// [время] [номер запроса по счету]
	console.log("-->%s %s %s\n   at %s:%s:%s", currentRequestNumber++, req.method, req.originalUrl, currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
	next();
});

app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler());


app.listen(PORT, function () {
	console.log("-->Simple static server launched!\n   Running in %s\n   Listening to http://%s:%s", __dirname, HOSTNAME, PORT);
});
