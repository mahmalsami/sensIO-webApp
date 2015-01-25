'use strict';

function connect(){

var db = require('mongoskin').db('mongodb://barber-user:barber-pass00@ds027771.mongolab.com:27771/barber', {safe:true});

	console.log("[database.js]");
	return db;
	
}

exports.connect=connect;
