'use strict';

angular.module('sensProdApp')
  .controller('StrategicPlannerCtrl', function ($scope, $http) {

  	//HardCoded
  	//Should be appliable for all years
  	// var allDates = ["1/2015","2/2015","3/2015","4/2015","5/2015","6/2015","7/2015","8/2015","9/2015","10/2015","11/2015","12/2015"];
  	var allDates = ["4/2/2015","5/2/2015","6/2/2015","7/2/2015","8/2/2015","9/2/2015","10/2/2015","11/2/2015"];

  	var tabOfTabs = new Array();

    // $http.get('/api/getinfo/2').success(function(nodeData) {
    $http.get('/api/things').success(function(nodeData) {
    	// nodeData = [{"nodeID":1,"2/2015":{"nbDetectEvents":11,"durationOfDetectEvents":50199}},{"nodeID":2,"2/2015":{"nbDetectEvents":12,"durationOfDetectEvents":103171}}];
      nodeData = [{"nodeID":1,"1/2/2015":{"nbDetectEvents":1,"durationOfDetectEvents":8000},"2/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"3/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"4/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"5/2/2015":{"nbDetectEvents":1,"durationOfDetectEvents":2000},"6/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"7/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"8/2/2015":{"nbDetectEvents":9,"durationOfDetectEvents":40199},"9/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"10/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0}},{"nodeID":2,"1/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"2/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"3/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"4/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"5/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"6/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"7/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"8/2/2015":{"nbDetectEvents":12,"durationOfDetectEvents":103171},"9/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"10/2/2015":{"nbDetectEvents":18,"durationOfDetectEvents":88004}}];
      $scope.nodeData = nodeData;
			
      //Construct data for each node
			for(var i=0;i<nodeData.length;i++){
				tabOfTabs[i] = new Array();

				//Construct data for each month for each node
				for(var j=0;j<allDates.length;j++){

					if(nodeData[i].hasOwnProperty(allDates[j])) {
						var poubNbrEvents = nodeData[i];
						// tabOfTabs[i][j]=poubNbrEvents[allDates[1]].durationOfDetectEvents/1000/poubNbrEvents[allDates[1]].nbDetectEvents;
						tabOfTabs[i][j]=poubNbrEvents[allDates[j]].durationOfDetectEvents/1000/poubNbrEvents[allDates[j]].nbDetectEvents || 0;
					}else{
						tabOfTabs[i][j]=0;
					}

				}
			}
window.console.log(JSON.stringify(tabOfTabs[0]));



			var data = {
			    labels: allDates,
			    // ["January", "February", "March", "April", "May", "June", "July"],
			    datasets: [
			        {
			            label: "My First dataset",
			            fillColor: "rgba(220,220,220,0.2)",
			            strokeColor: "rgb(254, 102, 114)",
			            pointColor: "rgb(254, 102, 114)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgb(254, 102, 114)",
			            data: tabOfTabs[0]
			        },
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			          	data: tabOfTabs[1]
			        }
			    ]
			};

			var options = {
			    animation: true,
			    scaleoverride: true,
			    responsive: true,
			    maintainAspectRatio: false
			}
			
			var ctx = document.getElementById("morris-bar-chart").getContext("2d");
			var myLineChart = new Chart(ctx).Line(data, options);



			// var funct = myLineChart.clear();
			// setInterval(
			// 	function(){ 
			// 		window.console.log("hou");
			// 		myLineChart.update();
			// 	}, 3000);



      //Construct data for each node
			for(var i=0;i<nodeData.length;i++){
				tabOfTabs[i] = new Array();

				//Construct data for each month for each node
				for(var j=0;j<allDates.length;j++){

					if(nodeData[i].hasOwnProperty(allDates[j])) {
						var poubNbrEvents = nodeData[i];
						tabOfTabs[i][j]=poubNbrEvents[allDates[j]].nbDetectEvents;
					}else{
						tabOfTabs[i][j]=0;
					}

				}
			}





			var data2 = {
			    labels: allDates,
			    //["January", "February", "March", "April", "May", "June", "July"],
			    datasets: [
			        {
			            label: "My First dataset",
			            fillColor: "rgba(220,220,220,0.2)",
			            strokeColor: "rgb(254, 102, 114)",
			            pointColor: "rgb(254, 102, 114)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgb(254, 102, 114)",
			            data: tabOfTabs[0]
			        },
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			          	data: tabOfTabs[1]
			        }
			    ]
			};





			var ctx = document.getElementById("morris-bar-chart-2").getContext("2d");
			var myLineChart = new Chart(ctx).Bar(data2, options);			

    });






    $http.get('/api/getinfo/1').success(function(nodeData) {
    // $http.get('/api/things').success(function(nodeData) {
    	// nodeData = [{"nodeID":1,"1/2/2015":{"nbDetectEvents":1,"durationOfDetectEvents":8000},"2/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"3/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"4/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"5/2/2015":{"nbDetectEvents":1,"durationOfDetectEvents":2000},"6/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"7/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"8/2/2015":{"nbDetectEvents":9,"durationOfDetectEvents":40199},"9/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"10/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0}},{"nodeID":2,"1/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"2/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"3/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"4/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"5/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"6/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"7/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"8/2/2015":{"nbDetectEvents":12,"durationOfDetectEvents":103171},"9/2/2015":{"nbDetectEvents":0,"durationOfDetectEvents":0},"10/2/2015":{"nbDetectEvents":18,"durationOfDetectEvents":88004}}];
      $scope.nodeDataPerDay = nodeData;

      //Hard coded
      //TOdo getCurrentDate -> Transform to correct format
      var todayString="8/2/2015";
			//var todayString="11/2/2015";


			if(nodeData[0].hasOwnProperty(todayString)) {
				var valueA= nodeData[0][todayString].nbDetectEvents;
			}


			if(nodeData[1].hasOwnProperty(todayString)) {
				var valueB= nodeData[1][todayString].nbDetectEvents;
			}

			// Morris.Line({
			// 	element: 'global-tendance-bar',
			//   data: $scope.globalTendance,
			//   parseTime: false,
			//   xkey: 'y',
			//   ykeys: ['a', 'b'],
			//   labels: ['Series A', 'Series B']
			// });


    	//Hardcoded for 2 values node0 et node1

			var data = [
			    {
			        value: valueA,
			        color:"#F7464A",
			        highlight: "#FF5A5E",
			        label: "Red"
			    },
			    {
			        value: valueB,
			        color: "#46BFBD",
			        highlight: "#5AD3D1",
			        label: "Green"
			    }
			];

			var options = {
			    animation: true,
			    scaleoverride: true,
			    responsive: true,
			    maintainAspectRatio: false
			}
			
			var ctx = document.getElementById("today-tendancy-chart").getContext("2d");
			// var myLineChart = new Chart(ctx).PolarArea(data, options);
			//var myDoughnutChart = new Chart(ctx).Doughnut(data,options);
			var myPieChart = new Chart(ctx).Pie(data,options);

			var ctx2 = document.getElementById("today-tendancy-chart-2").getContext("2d");
			// var myLineChart = new Chart(ctx).PolarArea(data, options);
			var myDoughnutChart = new Chart(ctx2).Doughnut(data,options);
			// var myPieChart = new Chart(ctx).Pie(data,options);

    });



  //   $http.get('/api/todaytendance').success(function(todayTendanceData) {
		// 	$scope.todayTendance = todayTendanceData;

		// 	Morris.Donut({
		// 	  element: 'today-tendancy-chart',
		// 	  data: $scope.todayTendance
		// 	});

		// });	



  });
