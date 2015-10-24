'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {
      $(".pic").hover(
          function(){
            $(this).css("background","#C9394A");
            $(this).css("box-shadow","0 0 30px #C9394A");
          },function(){
            $(this).css("background","#2A2A2A");
            $(this).css("box-shadow","0 0 10px #000000");
          });


      window.myRadar = new Chart(document.getElementById("canvas").getContext("2d")).Radar(radarChartData, {
        responsive: true,
        scaleLineColor : "rgba(255,255,255,.3)",
        scaleFontColor : "#fff",
        pointLabelFontColor : "#bbb",
        scaleBackdropColor : "rgba(255,255,255,0.75)",
        scaleLineWidth : 2,
        scaleFontSize : 19,
        pointLabelFontSize : 16,
        angleLineColor : "rgba(255,255,255,0.3)"
      });
}]);



var radarChartData = {
  labels: ["C++", "Java", "Android", "SQL", "Web", "Linux", "PS"],
  datasets: [
    {
      label: "My First dataset",
      fillColor: "rgba(220,30,40,0.5)",
      strokeColor: "rgba(255,255,255,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [55,60,80,50,80,40,90]
    }
  ]
};
