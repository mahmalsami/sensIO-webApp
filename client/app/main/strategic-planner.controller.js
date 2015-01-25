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



    $http.get('/api/todaytendance').success(function(todayTendanceData) {
			$scope.todayTendance = todayTendanceData;

			Morris.Donut({
			  element: 'today-tendancy-chart',
			  data: $scope.todayTendance
			});

		});	



  });
