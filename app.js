'use strict';

var express = require('express');
var app = express();
var badges = require('./controllers/badges');

app.use(express.json());

app.set('port', process.env.PORT || 8000);

app.post('/', badges.save, badges.send, function(req, res){
	res.send('\nDone\n\n');
});

app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
