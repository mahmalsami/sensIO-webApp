'use strict';


exports.savePacket = function(req, res) {

	var db = require('../config/database').connect();
	



//Sample to test MYSQL
// 	db.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);



	var nodeID = parseInt(req.body.nodeID);
	var sequenceNumber = parseInt(req.body.seq);
	var delay = parseInt(req.body.dur);
	var nodeIDAuthor = parseInt(req.body.nodeIDAuthor);

	var now= new Date();


	db.collection('nodes').find({'nodeID':nodeID,'sequenceNumber':sequenceNumber}).toArray(function(err, result) {

		if(result.length == 0){
		  db.collection('nodes').insert({'nodeID':nodeID,'sequenceNumber':sequenceNumber,'delay':delay,'publicationDate':now.toISOString().substr(0,10)}, function(err) {
		    if (err) {
		      throw err;
					res.status(500).json(err);
		    }else {
		      res.status(201).json({'response':"Sucessfully Registered"});
		    }
		  });

		}else{
			res.status(201).json({'response':"Already registred"});
		}
	 });



		db.collection('node-list').find({'nodeID':nodeID}).toArray(function(err, result) {
			if(result == 0){

			  db.collection('node-list').insert({'nodeID':nodeID}, function(err) {
			    if (err) {
			      throw err;
						conole.log(err);
			    }else {
			      console.log("Sucessfully Added to list");
			    }
			  });
			}
		});



		db.collection('node-list-connected').find({'nodeID':nodeIDAuthor}).toArray(function(err, result) {
			if(result == 0){

			  db.collection('node-list-connected').insert({'nodeID':nodeIDAuthor}, function(err) {
			    if (err) {
			      throw err;
						conole.log(err);
			    }else {
			      console.log("Sucessfully Added to list");
			    }
			  });
			}
		});






};



exports.awesomeThings = function(req, res) {
  res.json([
    {
      name : 'HTML5 Boilerplate',
      info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
      awesomeness: 10
    }, {
      name : 'AngularJS',
      info : 'AngularJS is a toolset for building the framework most suited to your application development.',
      awesomeness: 10
    }, {
      name : 'Karma',
      info : 'Spectacular Test Runner for JavaScript.',
      awesomeness: 10
    }, {
      name : 'Express',
      info : 'Flexible and minimalist web application framework for node.js.',
      awesomeness: 10
    }
  ]);
};



exports.currentWeekTendancy = function(req, res) {

	var db = require('../config/database').connect();

	var now= new Date();

	db.collection('nodes').find({'publicationDate':now.toISOString().substr(0,10)}).toArray(function(err, result) {
	  res.json([
	    { Day: 'Mon.', value: 0 },
	    { Day: 'Tue.', value: 0 },
	    { Day: 'Wed.', value: 0 },
	    { Day: 'Thur', value: 0 },
	    { Day: 'Frid.', value: 0 },
	    { Day: 'Sat.', value: 10 },
	    { Day: 'Sund.', value: result.length }
	  ]);

	 });


};



exports.globalTendance = function(req, res) {
	
	var db = require('../config/database').connect();
	db.collection('nodes').find().toArray(function(err, result) {
	  res.json([
	    { y: 'June', a: 0,  b: 10 },
	    { y: 'July', a: 0,  b: 11 },
	    { y: 'July', a: 0,  b: 12 },
	    { y: 'Sept.', a: 0,  b: 14 },
	    { y: 'Oct.', a: 0,  b: 13 },
	    { y: 'Nov.', a: 0,  b: 10 },
	    { y: 'Dec.', a: 0, b: 11 },
	    { y: 'Janu.', a: result.length, b: 12 }
	  ]);
  });
};



exports.currentNodeState = function(req, res) {
  res.json([
    { Day: '8', a: 0, b: 0 },
    { Day: '10', a: 0, b: 0 },
    { Day: '12', a: 0, b: 0 },
    { Day: '14', a: 0, b: 0 },
    { Day: '16', a: 0, b: 0 },
    { Day: '18', a: 1, b: 10 },
    { Day: '20', a: 0, b: 0 }
  ]);
};





exports.todayTendance = function(req, res) {

	var db = require('../config/database').connect();

	db.collection('nodes').find({'nodeID':1}).toArray(function(err, result) {
		var previousResult = result.length;

		db.collection('nodes').find({'nodeID':2}).toArray(function(err, result) {
		  res.json([
		    {label: 'SensIO Stand A', value: previousResult},
		    {label: 'SensIO Stand B', value: result.length}
		  ]);
		});

	});

};






exports.maintenanceState = function(req, res) {
	var db = require('../config/database').connect();

	var totalFleet=0;
	var totalConnected=0;








	db.collection('node-list').find().toArray(function(err, result) {

    totalFleet = result.length;


    db.collection('node-list-connected').find().toArray(function(err, result) {
    	totalConnected = result.length;

		  res.json(
		    {
		      totalFleet: totalFleet,
		      connectedNodes: totalConnected,
		      warnings: 0,
		      alerts: 0,
		      logs:[
		        {
		          'title' : 'Server message',
		          'message':'Connection initiate',
		        },
		        {
		          'title' : 'Server message',
		          'message':'perspiciatis omnis exercitationem. Beatae, officia pariatur? Est'
		        },
		        {
		          'title' : 'Server message',
		          'message':'Connection initiate perspiciatis omnis exercitationem. Beatae, officia pariatur? Est'
		        },
		      ]
		    }
		  );
		});//end of find node-list-connected

	});//end of find node-list

};
