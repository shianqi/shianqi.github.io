'use strict';

angular.module('myApp.view2', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'view2/view2.html',
      controller: 'View2Ctrl'
    });
  }])

  .controller('View2Ctrl', ["$scope","$http",function($scope,$http) {

      $http.get("http://115.28.72.26/visitNumber.php").success(function(response) {
        $scope.visitNumber = response.number;
      });
  }]);