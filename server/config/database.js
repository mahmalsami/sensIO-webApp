'use strict';

function connect(){

// var db = require('mongoskin').db('mongodb://barber-user:barber-pass00@ds027771.mongolab.com:27771/barber', {safe:true});

// 	console.log("[database.js]");
// 	return db;


	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'us-cdbr-azure-southcentral-e.cloudapp.net',
	  user     : 'b81ebb2b0c105f',
	  password : '1a1f8033',
	  database : 'sensIO6AVa02ksnb'
	});


	return connection.connect();
}

exports.connect=connect;
