'use strict';

angular.module('sensProdApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/maintenanceState').success(function(maintenanceStateData) {
      $scope.maintenanceState = maintenanceStateData;

    });

  });
