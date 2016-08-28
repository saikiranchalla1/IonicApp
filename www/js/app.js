// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngSanitize', 'ServicesMod'])
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
          cache : false,
          templateUrl: 'templates/list.html',
          controller: 'SportsCtrl'
        }
      }
    })
    .state('tabs.detail', {
      url: '/list/:feedId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'SportsCtrl'
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
  .controller('NewsCtrl', function($scope){

  })
  .controller('ArtsCtrl', function($scope){

  })
.controller('SportsCtrl', function($scope, $http, $state, FeedFactory){
  $scope.whichFeed = $state.params.feedId;
  $scope.platform = ionic.Platform;
  console.log("Which Feed: " + $scope.whichFeed);
  $scope.feeds = FeedFactory.get();
    $scope.init = function(){

      $scope.feeds = FeedFactory.get();
    }

  $scope.toggleStar = function(feed){
    feed.star = !feed.star;
  }
  $scope.refreshFeed = function(){
    $scope.init();
    $scope.$broadcast('scroll.refreshComplete');
  }

})
