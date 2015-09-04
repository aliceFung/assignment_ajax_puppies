var PUPPY = PUPPY || {};

PUPPY.ajaxRefresher = (function () {

  var getPuppiesList = function (event) {
    if (event) {
      event.preventDefault();
    };
    $.ajax({
      method: "GET",
      url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
      dataType: "json",
      contentType: "application/json",
      // header: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
      async: true,
      success: function(json) {
        showListOfPuppies(json);
      },

      error: function(xhr, status, errorThrown) {
        alertUser(xhr, status, errorThrown);
      },

      complete: function(xhr) {
        console.log("request complete")
      }

    });

  };

  var alertUser = function(xhr, status, errorThrown) {
    $("#flash").removeClass("hidden").text(status + ": " + errorThrown)
  }

  var showListOfPuppies = function(json) {
    var info = getPuppyInfo(json);
    $("#puppies-list").empty();
    for (key in info) {
      $("#puppies-list").append('<li><b>'+key+'</b>'+ ' (' +
                          info[key].breed + '), created ' +
                          new Date(Date.parse(info[key].found)) +
                          '--' + '<a href='+ info[key].url +'>Adopt</a></li>');

    }
  };

  var getPuppyInfo = function (jsonArr) {
    var filteredInfo = {};
    for(var i=0; i < jsonArr.length; i++){
      filteredInfo[jsonArr[i].name]= { breed: jsonArr[i].breed.name,
                                      found: jsonArr[i].created_at,
                                      url: jsonArr[i].url };
    }
    return filteredInfo;
  };

  var setListener = function () {
    $("body").on("click", "#refresh", function(event) {
      getPuppiesList(event);
    });
  }

  return {
    getPuppiesList: getPuppiesList,
    setListener: setListener,
  };
})();

$(document).ready(function(){
  PUPPY.ajaxRefresher.setListener();
  PUPPY.ajaxRefresher.getPuppiesList();
});


