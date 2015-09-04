var PUPPY = PUPPY || {}

PUPPY.ajaxRefresher = (function(){

  var getPuppiesList = function () {
    var $puppies = $.ajax({
      method: "GET",
      url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
      dataType: "json",
      async: true,
    });
    var info = getPuppyInfo($puppies.responseJSON);
    for (keys in info) {
      
    };
    $("#puppies-list")
  }

  var getPuppyInfo = function (jsonObj) {

  }

  return {

  }
})();

$(document).ready(function(){

});