'use strict';

var redis = require('../lib/redis');

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