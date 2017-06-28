$(function(){ 
    var topics = ['Terrifying', 'Sad', 'Happy', 'Excited', 'Loved', 'Suprised'];
    var topic = '';
    var person;

    topicAdd();


  $('#submit').on('click', function() {
    topic = $('#input').val().trim();
    $('#input').val("");
    topics.push(topic);
    topicAdd();
    person = topic;
    search();
   });


  $('.gifPic').on('click', function() {
    person = $(this).attr("data-person");
    animate();
   });


  $('.giftopic').on('click', function() {
    clearGif();
    person = $(this).attr("data-person");
    search();
   });


  function clearGif(){
   $(".item").remove();

  }

  function search(){

      // Constructing a URL to search Giphy for the value in the text
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

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + results[i].rating);

              // Creating an image tag
              var personImage = $("<img>", {src: results[i].images.fixed_height_still.url, class:"gifPic", "data-animate": results[i].images.fixed_height.url, "data-still": results[i].images.fixed_height_still.url, "data-state": "still"});

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
          }
        });

  }

  function animate() {
     
      var state = $(this).attr("data-state");
     
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {

        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

      }
  };

  function topicAdd() {
    $(".giftopic").remove();
    clearGif();

    for (var i = 0; i < topics.length; i++) {
        $('#topics').append($('<button>', {class:'button btn btn-primary giftopic', "data-person": topics[i], text: topics[i]}));
    }
  };




$(document).on('click', '.giftopic', search);

$(document).on('click', '.gifPic', animate);
});