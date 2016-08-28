/**
 * Created by SaiKiran on 28/08/16.
 */
var module = angular.module('ServicesMod', []);
module.factory('FeedFactory', function ($http) {
  return {
    get : function(){
      var feeds = [];
      var config = {
        transformResponse: function (data, headers) {
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
            feeds.push(currentFeedObj);

          }

        }
      }
      $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fdailyutahchronicle.com%2Fcategory%2Fsports%2Ffeed%2F'&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", config)
        .success(function(data){
          console.log(data);

        })
        .error(function(data){
          console.log(data);
        });
      return feeds;
    }
  }
});
