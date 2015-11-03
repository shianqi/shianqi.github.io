'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'myApp.view1', 'myApp.view2', 'myApp.view3', 'myApp.version'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/view1'});
    }])


    .controller('title',  function($scope,$location) {
      $scope.isTrue = function () {
        return true;
      }
      $scope.changeColor_1 = function () {
        window.location.href = 'index.html#/view1';
        $scope.onOffState1 = 'On';
        $scope.onOffState2 = 'Off';
        $scope.onOffState3 = 'Off';
      }
      $scope.changeColor_2 = function () {
        window.location.href = 'index.html#/view2';
        $scope.onOffState1 = 'Off';
        $scope.onOffState2 = 'On';
        $scope.onOffState3 = 'Off';
      }
      $scope.changeColor_3 = function () {
        window.location.href = 'index.html#/view3';
        $scope.onOffState1 = 'Off';
        $scope.onOffState2 = 'Off';
        $scope.onOffState3 = 'On';
      }

      if ($location.url() == "/view3") {
        $scope.onOffState1 = 'Off';
        $scope.onOffState2 = 'Off';
        $scope.onOffState3 = 'On';
      }
      if ($location.url() == "/view2") {
        $scope.onOffState1 = 'Off';
        $scope.onOffState2 = 'On';
        $scope.onOffState3 = 'Off';
      }

      $.ajax({
        type: "POST",
        url: "http://115.28.72.26/my website/addVisit.php"
      })
    });

