'use strict';

var redis = require('../lib/redis');

/*
* Save badges to database
* @Param {Array} badges
* @Param {Function} callback
*/
exports.save = function(badges, callback){
	if (!badges.lenth) return callback(null, null);
	var badge = badges.pop();
	redis.lpush('badges', JSON.stringify(badge), function(err){
		if (err) return callback(err, null);
		exports.save(badges, callback);
	});
};