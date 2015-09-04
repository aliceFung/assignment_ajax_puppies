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
      async: true,
      success: function(json) {
        showListOfPuppies(json);
      },

      error: function(xhr, status, errorThrown) {
        alertUser(xhr, status, errorThrown);
      },

      complete: function(xhr) {
        console.log("request complete");
      }

    });

  };

  var alertUser = function(xhr, status, errorThrown) {
    if (xhr.status == 0) errorThrown = "The specified page was not found";
    $("#flash").removeClass("hidden alert-success").addClass('alert-warning').text(status + ": " + errorThrown).append("<button class='close' data-dismiss = 'alert'>&times;</button>");
  };

  var showListOfPuppies = function(json) {
    var info = getPuppyInfo(json);
    $("#puppies-list").empty();
    for (key in info) {
      $("#puppies-list").append('<li><b>'+key+'</b>'+ ' (' +
                          info[key].breed + '), created ' +
                          new Date(Date.parse(info[key].found)) +
                          '--' + '<a class = "remove-puppy" href='+ info[key].url +'>Adopt</a></li>');

    }
  };

  var getPuppyInfo = function (jsonArr) {
    var filteredInfo = {};
    jsonArr.reverse();
    for(var i=0; i < jsonArr.length; i++){
      filteredInfo[jsonArr[i].name]= { breed: jsonArr[i].breed.name,
                                      found: jsonArr[i].created_at,
                                      url: jsonArr[i].url };
    }
    return filteredInfo;
  };

  var getBreeds = function(){
    $.ajax({
      method: "GET",
      url: "https://pacific-stream-9205.herokuapp.com/breeds.json",
      dataType: "json",
      contentType: "application/json",
      // header: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
      async: true,
      success: function(jsonArr) {
        buildDropDownMenu(jsonArr);
      },

      error: function(xhr, status, errorThrown) {
        alertUser(xhr, status, errorThrown);
      },

      complete: function(xhr) {
        console.log("breeds request complete");
      }

    });
  };

  var buildDropDownMenu = function(jsonArr){
    var $breed = $('#breed');
    for (var i=0; i< jsonArr.length; i++){
      $breed.append('<option value="' + jsonArr[i].id + '">'+
                  jsonArr[i].name + '</option>');
    }
  };

  var adoptPuppy = function(event) {
    event.preventDefault();
    var element = event.target
    var link = $(element).attr("href")
    $.ajax({
      type: "DELETE",
      url: link,
      dataType: "json",
      contentType: "application/json",
      headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
      async: true,
      success: function(jsonArr) {
        showSuccessAlert('Puppy was successfully adopted!');
        getPuppiesList();
      },

      error: function(xhr, status, errorThrown) {
        alertUser(xhr, status, errorThrown);
      },

      complete: function(xhr) {
        console.log("adoption request complete");
      }

    });

  }

  var registerPuppy = function(event){
    event.preventDefault();
    var puppyName = $('#form input').val();
    var breedVal = $('#form select').val();
    $.ajax({
      method: "POST",
      url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
      data: JSON.stringify({breed_id: breedVal, name: puppyName}),
      dataType: "json",
      contentType: "application/json",
      headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
      type: "POST",
      async: true,
      success: function(jsonArr) {
        showSuccessAlert('Puppy is ready for adoption');
        getPuppiesList();
      },

      error: function(xhr, status, errorThrown) {
        alertUser(xhr, status, errorThrown);
      },

      complete: function(xhr) {
        console.log("breeds request complete");
      }

    });
  };

  var showSuccessAlert = function(message){
    $('#flash').removeClass('hidden alert-warning').addClass('alert-success').text(message);
  };

  var setListener = function () {
    $("body").on("click", "#refresh", function(event) {
      getPuppiesList(event);
    });
    $('body').on('click', '#register', function(event){
      registerPuppy(event);
    });
    $('body').on('click', '.remove-puppy', function(event){
      adoptPuppy(event);
    });
  };

  return {
    getPuppiesList: getPuppiesList,
    getBreeds: getBreeds,
    registerPuppy: registerPuppy,
    setListener: setListener,
  };
})();

$(document).ready(function(){
  PUPPY.ajaxRefresher.setListener();
  PUPPY.ajaxRefresher.getPuppiesList();
  PUPPY.ajaxRefresher.getBreeds();
});


