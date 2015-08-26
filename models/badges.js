'use strict';

var redis = require('../lib/redis');
var broadcast = require('../lib/broadcast');

/*
* Save badges to database
* @Param {Array} badges
* @Param {Function} callback
*/
exports.save = function(badges, callback){
	console.log(badges);
	console.log(badges.length);
	if (!badges.length) return callback(null, null);
	console.log("saving to database");
	var badge = badges.pop();
	redis.lpush('badges', JSON.stringify(badge), function(err){
		if (err) return callback(err, null);
		exports.save(badges, callback);
	});
};

/**
* Trim down the redis list
*/
exports.trim = function(){
	redis.ltrim('badges', 0, 9);
};

/**
* Send out badges to the bradcaster
* @Param {Array} badges
* @Param {Function}	callback 
*/
exports.send = function(badges, callback){
	badges.forEach(broadcast.send);
	callback(null, null);
};