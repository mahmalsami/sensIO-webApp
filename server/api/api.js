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

function getInformation(){
	var mysql      = require('mysql');

	//Connection to the database	
	var connection = mysql.createConnection({
	  host     : 'eu-cdbr-azure-west-b.cloudapp.net',
	  user     : 'b74b78de34cf65',
	  password : '2896cbff',
	  database : 'sensIO'
	});

	connection.connect();

	//Inputs of the callback function
	//nodeID: table containing the IDs of nodes which information (number of detection events, duration of the detections ...)
	//must be extracted from the database
	//startDate and endDate: only node informations which was registered between the start date and end date are extracted from the database
	//they must be in the format dd/mm/yyyy
	//period:
	//	1: each node information between the start date and end date are added. For each node, the variable results  
	//contains the total number of detection events and the total duration of the detection events.
	//	2: the time interval between the start date and the end date is split into days. For each node,
	//the variable results contains the total number of detection events and the total duration of the detection events per day.
	//	3: the time interval between the start date and the end date is split into months. For each node,
	//the variable results contains the total number of detection events and the total duration of the detection events per month.
	//	4: the time interval between the start date and the end date is split into years. For each node,
	//the variable results contains the total number of detection events and the total duration of the detection events per year.
	var nodeID = [1, 2];
	var startDate = '01/02/2015';
	var endDate = '10/02/2015';
	var period = 3;

	//The day, month and year of the start date and end date are extracted and put in different variables	
	var dayStartDate = parseInt(startDate.substr(0, startDate.indexOf('/')));
	var tmp = startDate.substr(startDate.indexOf('/')+1);
	var monthStartDate = parseInt(tmp.substr(0, tmp.indexOf('/')));
	tmp = tmp.substr(tmp.indexOf('/')+1);
	var yearStartDate = parseInt(tmp.substr(0));
	var dayEndDate = parseInt(endDate.substr(0, endDate.indexOf('/')));
	tmp = endDate.substr(endDate.indexOf('/')+1);
	var monthEndDate = parseInt(tmp.substr(0, tmp.indexOf('/')));
	tmp = tmp.substr(tmp.indexOf('/')+1);
	var yearEndDate = parseInt(tmp.substr(0));

	//The variable results is formated according to the value of the variable period and
	//the node information are initialized to 0 in the variable result.
	//Hereafter are the formats of the variable results according to the value of the variable period
	//
	//Period = 0:
	//[ [ nodeID: 1, total: [ nbDetectEvents: 0, durationOfDetectEvents: 0 ] ],
  	//[ nodeID: 2, total: [ nbDetectEvents: 1, durationOfDetectEvents: 7500 ] ] 
	//... ]
	//
	//Period = 1:
	//[ [ nodeID: 1,
    	//'1/2/2015': [ nbDetectEvents: 0, durationOfDetectEvents: 0 ],
    	//'2/2/2015': [ nbDetectEvents: 0, durationOfDetectEvents: 0 ],
    	//'3/2/2015': [ nbDetectEvents: 0, durationOfDetectEvents: 0 ],
   	//... ],
 	//[ nodeID: 2,
    	//'1/2/2015': [ nbDetectEvents: 0, durationOfDetectEvents: 0 ],
    	//'2/2/2015': [ nbDetectEvents: 0, durationOfDetectEvents: 0 ],
    	//'3/2/2015': [ nbDetectEvents: 0, durationOfDetectEvents: 0 ],
   	//... ] ]
	//
	//Period = 2:
	//[ [ nodeID: 1, '2/2015': [ nbDetectEvents: 2, durationOfDetectEvents: 10000 ] ],
  	//[ nodeID: 2, '2/2015': [ nbDetectEvents: 1, durationOfDetectEvents: 7500 ] ] 
	//...]
	//
	//Period = 3:
	//[ [ nodeID: 1, '/2015': [ nbDetectEvents: 2, durationOfDetectEvents: 10000 ] ],
  	//[ nodeID: 2, '/2015': [ nbDetectEvents: 1, durationOfDetectEvents: 7500 ] ] 
	//...]

	var nodeIDs;
	var results = [];
	for (var i = 0; i < nodeID.length; i++)
	{
		if (i == 0)
			nodeIDs = nodeID[i];
		nodeIDs += ' or nodeID='+nodeID[i];
		results[i] = [];
		results[i]['nodeID'] = nodeID[i];
		if (period == 0){
			results[i]['total'] = [];		
			results[i]['total']['nbDetectEvents'] = 0;
			results[i]['total']['durationOfDetectEvents'] = 0;
		}
		else if (period == 1){
			currentDay = dayStartDate;
			currentMonth = monthStartDate;
			currentYear = yearStartDate;
			currentDate = currentDay.toString() + '/' + currentMonth.toString() + '/' + currentYear.toString();
			endDateTmp = dayEndDate.toString() + '/' + monthEndDate.toString() + '/' + yearEndDate.toString();
			console.log(currentDate + ' ' + endDateTmp);
			results[i][currentDate] = [];
			results[i][currentDate]['nbDetectEvents'] = 0;
			results[i][currentDate]['durationOfDetectEvents'] = 0;
			while (currentDate != endDateTmp){
				if ((currentDay == 31 && (currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 || currentMonth == 10 || currentMonth == 12)) || (currentDay == 30 && (currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11)) || (currentDay == 28 && currentMonth == 2)) {
					currentDay = 1;
					currentMonth++;
				}
				else {			
					currentDay++;
				}
				if (currentMonth == 13){
					currentMonth = 1;
					currentYear++;
				}
				currentDate = currentDay.toString() + '/' + currentMonth.toString() + '/' + currentYear.toString();
				results[i][currentDate] = [];
				results[i][currentDate]['nbDetectEvents'] = 0;
				results[i][currentDate]['durationOfDetectEvents'] = 0;
			}
		}
		else if (period == 2)
		{
			currentMonth = monthStartDate;
			currentYear = yearStartDate;
			currentDate = currentMonth.toString() + '/' + currentYear.toString();
			endDateTmp = monthEndDate.toString() + '/' + yearEndDate.toString();
			console.log(currentDate + ' ' + endDateTmp);
			results[i][currentDate] = [];
			results[i][currentDate]['nbDetectEvents'] = 0;
			results[i][currentDate]['durationOfDetectEvents'] = 0;
			while (currentDate != endDateTmp)
			{
				if (currentMonth == 12){
					currentMonth = 1;
					currentYear++;
				}
				else {
					currentMonth++;
				}
				currentDate = currentMonth.toString() + '/' + currentYear.toString();
				results[i][currentDate] = [];
				results[i][currentDate]['nbDetectEvents'] = 0;
				results[i][currentDate]['durationOfDetectEvents'] = 0;
			}
		}
		else if (period == 3)
		{
			currentYear = yearStartDate;			
			currentDate = '/' + currentYear.toString();
			endDateTmp = '/' + yearEndDate.toString();
			console.log(currentDate + ' ' + endDateTmp);
			results[i][currentDate] = [];
			results[i][currentDate]['nbDetectEvents'] = 0;
			results[i][currentDate]['durationOfDetectEvents'] = 0;
			while (currentDate != endDateTmp)
			{
				currentYear++;
				currentDate = '/' + currentYear.toString();
				results[i][currentDate] = [];
				results[i][currentDate]['nbDetectEvents'] = 0;
				results[i][currentDate]['durationOfDetectEvents'] = 0;
			}
		}
	}

	//Node information are extracted from the database. For each row, the date is compared to the start date and end date.
	//If the date is between the start date and end date, the information of the node which ID is nodeID are updated in the variable results.
	var selectQuery = 'SELECT nodeID, date, duration FROM SENSINGDATA WHERE nodeID='+nodeIDs;
	connection.query(selectQuery, function(err, rows, fields) {
	  if (err) {
	  	connection.end();
	  	throw err;
	  }
	  else{
		console.log(rows);
		nbEntries = 0;
		for (var i = 0; i < rows.length; i++){
			var dayRow = parseInt(rows[i].date.substr(0, startDate.indexOf('/')));
			var tmp = rows[i].date.substr(rows[i].date.indexOf('/')+1);
			var monthRow = parseInt(tmp.substr(0, tmp.indexOf('/')));
			tmp = tmp.substr(tmp.indexOf('/')+1);
			var yearRow = parseInt(tmp.substr(0));

			if (((yearStartDate < yearRow) ||
			(yearStartDate == yearRow && monthStartDate < monthRow) ||
			(yearStartDate == yearRow && monthStartDate == monthRow && dayStartDate <= dayRow)) &&
			((yearEndDate < yearRow) ||
			(yearEndDate == yearRow && monthEndDate > monthRow) ||
			(yearEndDate == yearRow && monthEndDate == monthRow && dayEndDate >= dayRow))){
				var key;
				if (period == 0)				
					key = 'total';
				else if (period == 1)
					key = dayRow.toString()+'/'+monthRow.toString()+'/'+yearRow.toString();
				else if (period == 2)
					key = monthRow.toString()+'/'+yearRow.toString();
				else if (period == 3)
					key = '/' + yearRow.toString();				

				results[nodeID.indexOf(parseInt(rows[i].nodeID))][key]['nbDetectEvents']++;
				results[nodeID.indexOf(parseInt(rows[i].nodeID))][key]['durationOfDetectEvents'] += rows[i].duration;
			}
		}
		console.log(results);	  
	}
	});

	connection.end();
}
