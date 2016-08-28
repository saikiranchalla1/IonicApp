// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngSanitize'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/list.html',
          controller: 'myCtrl'
        }
      }
    })

    .state('tabs.detail', {
      url: '/list/:feedId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'myCtrl'
        }
      }
    })
    $urlRouterProvider.otherwise('/tab/list');
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('myCtrl', function($scope, $http, $state){
  $scope.whichFeed = $state.params.feedId;
  console.log("Which Feed: " + $scope.whichFeed);
  var config = {
                transformResponse: function (data, headers) {
                   
                        feeds = [];
                        var feedsElems = angular.element(data.trim()).find("item");
                        for (var i = 0; i < feedsElems.length; i++) {
                            var feed = feedsElems.eq(i);
                            var currentFeed = feed[0].getElementsByTagName('description')[0].innerText;
                            var currentFeedObj = {
                              index : i,
                              description : feed[0].innerHTML.substring(1, feed[0].innerHTML.indexOf('http')-1),
                              url : feed[0].getElementsByTagName('guid')[0].innerHTML,
                              encoded : feed[0].getElementsByTagName('encoded')[0].innerHTML
                            }
                            $scope.feeds.push(currentFeedObj);

                          }
                          return $scope.feeds;
                    } 
                  }


    $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fdailyutahchronicle.com%2Fcategory%2Fsports%2Ffeed%2F'&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", config)
    .success(function(data){
      console.log(data);
       
    })
    .error(function(data){
      console.log(data);
    })

    $scope.init = function(){
      var config = {
                transformResponse: function (data, headers) {
                   
                        feeds = [];
                        var feedsElems = angular.element(data.trim()).find("item");
                        for (var i = 0; i < feedsElems.length; i++) {
                            var feed = feedsElems.eq(i);
                            var currentFeed = feed[0].getElementsByTagName('description')[0].innerText;
                            var currentFeedObj = {
                              index : i,
                              description : currentFeed,
                              url : feed[0].getElementsByTagName('guid')[0].innerHTML,
                              encoded : feed[0].getElementsByTagName('encoded')[0].innerHTML
                            }
                            $scope.feeds.push(currentFeedObj);

                          }
                          return $scope.feeds;
                    } 
                  }


    $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fdailyutahchronicle.com%2Fcategory%2Fsports%2Ffeed%2F'&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", config)
    .success(function(data){
      console.log(data);
       $scope.whichFeed = $state.params.aId;
    })
    .error(function(data){
      console.log(data);
    })
    }
  $scope.feeds = [];
  $scope.toggleStar = function(feed){
    feed.star = !feed.star;
  }
  $scope.refreshFeed = function(){
    $scope.init();
    $scope.$broadcast('scroll.refreshComplete');
  }

})
