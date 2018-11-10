$(document).ready(function () {
	var movies = ["Godfather", "Superbad", "21 Jump Street", "Goodfellas", "Wolf of Wall Street", "Night of The Living Dead", "Cloudy With a Chance of Meatballs", "Megamind"];

	function renderButtons() {
		$("#movie-buttons").empty();
		for (i = 0; i < movies.length; i++) {
			$("#movie-buttons").append("<button class='btn' data-movie='" + movies[i] + "'>" + movies[i] + "</button>");
		}
	}

	renderButtons();

	$("button").on("click", function () {
		var movie = $(this).attr("data-movie");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			movie + "&api_key=3mg0E7MTsAXi1hoPy1fsbY59YUHs002I&limit=10"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#movies").empty();
			for (var i = 0; i < results.length; i++) {
				var movieDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var movieImg = $("<img>");

				movieImg.attr("src", results[i].images.original_still.url);
				movieImg.attr("data-still", results[i].images.original_still.url);
				movieImg.attr("data-animate", results[i].images.original.url);
				movieImg.attr("data-state", "still");
				movieImg.attr("class", "gif");
				movieDiv.append(p);
				movieDiv.append(movieImg);
				$("#movies").append(movieDiv);
			}
		});
	});

    $("#save-Movie").on("click", function(event) {
        
        event.preventDefault();
        

      var newMovie = $("#yourMovie").val();
      movies.push(newMovie);
      renderButtons();

    });

    
	function changeState(){
        var $image = $(this);
        var $state = $(this).attr("data-state");

        if ($state === "still") {
            var data_animate = $(this).attr("data-animate");
            $(this).attr("src", data_animate);
            $(this).attr("data-state", "animate");
    
          } else {
            var data_still = $(this).attr("data-still");
            $(this).attr("src", data_still);
            $(this).attr("data-state", "still");
	}
    }
    
	$(document).on("click", ".gif", changeState);

});