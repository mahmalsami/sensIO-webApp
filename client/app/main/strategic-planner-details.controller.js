'use strict';

angular.module('sensProdApp')
  .controller('StrategicPlannerDetailsCtrl', function ($scope, $http) {


  	$http.get('/api/currentnodestate').success(function(currentNodeStateData) {
  		$scope.currentNodeState= currentNodeStateData;

			Morris.Area({
			  element: 'current-node-state',
			  data: $scope.currentNodeState,
			  parseTime: false,
			  xkey: 'Day',
			  ykeys: ['a', 'b'],
			  labels: ['Mac', 'Microsoft']
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
