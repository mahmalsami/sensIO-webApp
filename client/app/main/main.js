'use strict';

angular.module('sensProdApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/strategic-planner', {
        templateUrl: 'app/main/strategic-planner.html',
        controller: 'StrategicPlannerCtrl'
      })
      .when('/strategic-planner-details', {
        templateUrl: 'app/main/strategic-planner-details.html',
        controller: 'StrategicPlannerDetailsCtrl'
      });
  });