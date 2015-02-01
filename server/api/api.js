'use strict';


exports.savePacket = function(req, res) {

	//var db = require('../config/database').connect();
	


	var nodeID = parseInt(req.body.nodeID);
	var sequenceNumber = parseInt(req.body.seq);
	var duration = parseInt(req.body.dur);
	var sourceId = parseInt(req.body.sourceId);

	var now= new Date();
	var publicationDate = now.toISOString().substr(0,10);
	var hour = parseInt(now.toISOString().substr(11,6));



if(duration!=0){

	var mysql      = require('mysql');

	var connection = mysql.createConnection({
	  host     : 'us-cdbr-azure-southcentral-e.cloudapp.net',
	  user     : 'b81ebb2b0c105f',
	  password : '1a1f8033',
	  database : 'sensIO6AVa02ksnb'
	});

	connection.connect();

	//Sample to test MYSQL
	//var selectQuery = '"SELECT COUNT(*) FROM SENSIO WHERE nodeID='+nodeID+' AND sequenceNumber='+sequenceNumber+'"';
	var selectQuery = 'SELECT COUNT(*) FROM SENSIO WHERE nodeID='+nodeID+' AND sequenceNumber='+sequenceNumber;
	console.log(selectQuery);
	var queryResult = 0;
	connection.query(selectQuery, function(err, rows, fields) {
	  if (err) {
	  	connection.end();
	  	throw err;
	  }

	  queryResult = parseInt(rows[0]['COUNT(*)']);
	});


	//To be done later
	console.log('query result '+queryResult);
	if(!queryResult){
		var insertQuery = 'INSERT INTO SENSIO VALUES('+nodeID+','+duration+','+publicationDate+','+hour+','+sequenceNumber+','+sourceId+')';

		connection.query(insertQuery.toString(), function(err, rows, fields) {
		 if (err) {
	  	throw err;
	  	connection.end();
	  }
		});
	}


	connection.end();
}

res.status(201).json({'response':"OK"});


	// db.collection('nodes').find({'nodeID':nodeID,'sequenceNumber':sequenceNumber}).toArray(function(err, result) {

	// 	if(result.length == 0){
	// 	  db.collection('nodes').insert({'nodeID':nodeID,'sequenceNumber':sequenceNumber,'delay':delay,'publicationDate':now.toISOString().substr(0,10)}, function(err) {
	// 	    if (err) {
	// 	      throw err;
	// 				res.status(500).json(err);
	// 	    }else {
	// 	      res.status(201).json({'response':"Sucessfully Registered"});
	// 	    }
	// 	  });

	// 	}else{
	// 		res.status(201).json({'response':"Already registred"});
	// 	}
	//  });



		// db.collection('node-list').find({'nodeID':nodeID}).toArray(function(err, result) {
		// 	if(result == 0){

		// 	  db.collection('node-list').insert({'nodeID':nodeID}, function(err) {
		// 	    if (err) {
		// 	      throw err;
		// 				conole.log(err);
		// 	    }else {
		// 	      console.log("Sucessfully Added to list");
		// 	    }
		// 	  });
		// 	}
		// });



		// db.collection('node-list-connected').find({'nodeID':nodeIDAuthor}).toArray(function(err, result) {
		// 	if(result == 0){

		// 	  db.collection('node-list-connected').insert({'nodeID':nodeIDAuthor}, function(err) {
		// 	    if (err) {
		// 	      throw err;
		// 				conole.log(err);
		// 	    }else {
		// 	      console.log("Sucessfully Added to list");
		// 	    }
		// 	  });
		// 	}
		// });






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

	// var db = require('../config/database').connect();
var result = ['a','b'];
	// var now= new Date();

	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'us-cdbr-azure-southcentral-e.cloudapp.net',
	  user     : 'b81ebb2b0c105f',
	  password : '1a1f8033',
	  database : 'sensIO6AVa02ksnb'
	});

	connection.connect();

	var insertQuery = 'SELECT SUM(duration) FROM SENSIO';

	connection.query(insertQuery.toString(), function(err, rows, fields) {
	  if (err) {
	  	throw err;
	  	connection.end();
	  }
	  	 res.json([
	    { Day: 'Mon.', value: 0 },
	    { Day: 'Tue.', value: 0 },
	    { Day: 'Wed.', value: 0 },
	    { Day: 'Thur', value: 0 },
	    { Day: 'Frid.', value: 0 },
	    { Day: 'Sat.', value: 10 },
	    { Day: 'Sund.', value: parseInt(rows[0]['SUM(duration)']/1000)}
	  ]);
	});

	connection.end();

	// db.collection('nodes').find({'publicationDate':now.toISOString().substr(0,10)}).toArray(function(err, result) {


	 // });


};



exports.globalTendance = function(req, res) {
	var result = ['a','b'];
	// var db = require('../config/database').connect();


	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'us-cdbr-azure-southcentral-e.cloudapp.net',
	  user     : 'b81ebb2b0c105f',
	  password : '1a1f8033',
	  database : 'sensIO6AVa02ksnb'
	});

	connection.connect();
	
	var insertQuery = 'SELECT SUM(duration) FROM SENSIO';

	connection.query(insertQuery.toString(), function(err, rows, fields) {
		if (err) {
	  	throw err;
	  	connection.end();
	  }
	  res.json([
	    { y: 'June', a: 0,  b: 10 },
	    { y: 'July', a: 0,  b: 11 },
	    { y: 'July', a: 0,  b: 12 },
	    { y: 'Sept.', a: 0,  b: 14 },
	    { y: 'Oct.', a: 0,  b: 13 },
	    { y: 'Nov.', a: 0,  b: 10 },
	    { y: 'Dec.', a: 0, b: 11 },
	    { y: 'Janu.', a:parseInt(rows[0]['SUM(duration)']/1000), b: 12 }
	  ]);
	    connection.end();
  });
};





exports.currentNodeState = function(req, res) {

	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'us-cdbr-azure-southcentral-e.cloudapp.net',
	  user     : 'b81ebb2b0c105f',
	  password : '1a1f8033',
	  database : 'sensIO6AVa02ksnb'
	});
	
	connection.connect();

	var insertQuery = 'SELECT nodeID,hour,SUM(duration) FROM SENSIO GROUP BY nodeID,hour';//WHERE nodeID=1 OR nodeID=2 GROUPBY nodeID,hour
//var insertQuery = 'SELECT * FROM SENSIO';

connection.query(insertQuery.toString(), function(err, rows, fields) {
	if (err) {
	  	throw err;
	  	connection.end();
	}

	var inter =0;
	//var tab = [0,1,2,3,4,5,6];
	var tabA = new Array(22);
	var tabB = new Array(22);

	for(i=0;i<tabA.length;i++){
		tabA[i]=0;
		tabB[i]=0;
	}

	var i;
	

	for(i=0;i<rows.length;i++){

		if(rows[i]['nodeID']==1){
			inter = rows[i]['hour'];
			tabA[inter-(inter % 2)] += rows[i]['SUM(duration)'];
		}

		if(rows[i]['nodeID']==2){
			inter = rows[i]['hour'];
			tabB[inter-(inter % 2)] += rows[i]['SUM(duration)'];
		}

		console.log(rows[i]['nodeID']);
	}	

	for(i=0;i<tabA.length;i++){
		console.log('tab value' + tabA[i]);
		console.log('tab value' + tabB[i]);
	}

	console.log(JSON.stringify(rows)+'  reallly ???');
	  res.json([
	    { Day:  '8', a: tabA[8]/1000,  b: tabB[8]/1000 },
	    { Day: '10', a: tabA[10]/1000, b: tabB[10]/1000 },
	    { Day: '12', a: tabA[12]/1000, b: tabB[12]/1000 },
	    { Day: '14', a: tabA[14]/1000, b:tabB[14]/1000 },
	    { Day: '16', a: tabA[16]/1000, b:tabB[16]/1000 },
	    { Day: '18', a: tabA[18]/1000, b:tabB[18]/1000},
	    { Day: '20', a: tabA[20]/1000, b:tabB[20]/1000 }
	  ]);
	    connection.end();
});


};





exports.todayTendance = function(req, res) {


	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'us-cdbr-azure-southcentral-e.cloudapp.net',
	  user     : 'b81ebb2b0c105f',
	  password : '1a1f8033',
	  database : 'sensIO6AVa02ksnb'
	});

	connection.connect();

	var insertQuery = 'SELECT SUM(duration),nodeID FROM SENSIO WHERE nodeID=1 OR nodeID=2';
	// var db = require('../config/database').connect();
	
	connection.query(insertQuery.toString(), function(err, rows, fields) {
		if (err) {
	  	throw err;
	  	connection.end();
	  }
	// db.collection('nodes').find({'nodeID':1}).toArray(function(err, result) {
		// var result = ['a','b'];
		// var previousResult = result.length;
		// var result = ['a','b'];
		var valueA =0;
		var valueB =0;

		var i;
		for(i=0;i<rows.length;i++){
			if(rows[i]['nodeID']==1){
				valueA=rows[i]['SUM(duration)'];
			}else{
				valueB=rows[i]['SUM(duration)'];
			}
		}
		// db.collection('nodes').find({'nodeID':2}).toArray(function(err, result) {
		  res.json([
		    {label: 'SensIO Stand A', value: valueA},
		    {label: 'SensIO Stand B', value: valueB}
		  ]);
		  connection.end();
	});

		// });

	// });

};






exports.maintenanceState = function(req, res) {
	// var db = require('../config/database').connect();

	var totalFleet=0;
	var totalConnected=0;








	// db.collection('node-list').find().toArray(function(err, result) {
		var result = ['a','b'];
    totalFleet = result.length;


    // db.collection('node-list-connected').find().toArray(function(err, result) {
    	totalConnected = result.length;

		  res.json(
		    {
		      totalFleet: 3,
		      connectedNodes: 1,
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
	// 	});//end of find node-list-connected

	// });//end of find node-list

};
