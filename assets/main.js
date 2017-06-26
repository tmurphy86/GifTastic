$(function(){ 
    var topics = [];
    var topic = '';
    var person;

    // $('#drop').html('<div class="form-control" id="start-input" type="text">');

    $('#submit').on('click', function() {
      topic = $('#input').val().trim();
      topics.push(topic);
      search();
      topicAdd();
      //run function to do 

    });
    
function search(){

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < 10; i++) {

              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url, "data-status", "running");

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
          }
        });

}

function topicAdd() {
  for (var i = 0; i < topics.length; i++) {
     $('#topics').append($('<button class='button btn btn-primary' >'));

      // In this case, the "this" keyword refers to the button that was clicked
      person = $(this).attr("data-person");


  }

};

$(document).on('click', '.button', search);

});