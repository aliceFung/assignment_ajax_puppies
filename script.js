var PUPPY = PUPPY || {};

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
      $("#puppies-list").append('<li><b>'+key+'</b>'+ ' (' +
                          info[key][breed] + '), created ' +
                          Date.new(Date.parse(info[key][found])) +
                          '--' + '<a href='+ info[key][url] +'>'+
                          Adopt + '</a></li>');

    }

    return info;
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

  return {
    getPuppiesList: getPuppiesList
  };
})();

$(document).ready(function(){
  PUPPY.ajaxRefresher.getPuppiesList();
});


