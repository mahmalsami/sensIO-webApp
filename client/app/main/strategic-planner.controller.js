'use strict';

angular.module('sensProdApp')
  .controller('StrategicPlannerCtrl', function ($scope, $http) {


    $http.get('/api/currentweektendancy').success(function(weekTendancyData) {
      $scope.weekTendancy = weekTendancyData;
	
			Morris.Bar({
			  element: 'morris-bar-chart',
			  data: $scope.weekTendancy,
			  xkey: 'Day',
			  ykeys: ['value'],
			  labels: ['Attendance Score']
			});

    });



    $http.get('/api/globaltendance').success(function(globalTendanceData) {
      $scope.globalTendance = globalTendanceData;
	
			Morris.Line({
				element: 'global-tendance-bar',
			  data: $scope.globalTendance,
			  parseTime: false,
			  xkey: 'y',
			  ykeys: ['a', 'b'],
			  labels: ['Series A', 'Series B']
			});

    });



		Morris.Donut({
		  element: 'today-tendancy-chart',
		  data: [
		    {label: 'SensIO Stand A', value: 12},
		    {label: 'SensIO Stand B', value: 30},
		    {label: 'Other Stand', value: 5}
		  ]
		});





  });
