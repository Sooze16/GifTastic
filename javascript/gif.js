$(document).ready(function() {
    // Initial array of comic strips
    var comics = ["Batman", "Superman", "Catwoman", "The Penguin"];

    // displaycomicInfo function re-renders the HTML to display the appropriate content
    function displayComicInfo() {

        var comicStrip = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + comicStrip + "&api_key=ZQbiPzhuI3qdufIfSHBSqxHsGUf7AtU1&limit=10";

        // Creates AJAX call for the specific comic button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            for (var i = 0; i < 10; i++) {


                // Creates a div to hold the comic
                var comicName = $("<div>");
                comicName.html("Comic Strip Title: " + response.data[i].title);
                $("#comic-view").prepend(comicName);
                // Retrieves the Rating Data


                // Creates an element to have the rating displayed
                // Displays the rating
                var rating = $("<div>");
                rating.html("Comic rating: " + response.data[i].rating);
                $("#comic-view").prepend(rating);



                var image = $("<img>");
                image.attr("src", response.data[i].images.fixed_height_still.url);
                image.addClass("gif");
                image.attr("data-state", "still")
                image.attr("data-still", response.data[i].images.fixed_height_still.url)
                image.attr("data-animate", response.data[i].images.fixed_height.url)
                $("#comic-view").prepend(image);

            }
            // Puts the entire Comic above the previous .
        });

    }
    $(document).on("click", ".gif", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    // Function for displaying comic data
    function renderButtons() {

        // Deletes the comics prior to adding new comics
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of comics
        for (var i = 0; i < comics.length; i++) {

            // Then dynamicaly generates buttons for each comic in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adds a class of comic to our button
            a.addClass("comic");
            // Added a data-attribute
            a.attr("data-name", comics[i]);
            // Provided the initial button text
            a.text(comics[i]);
            // Added the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where the add comic button is clicked
    $("#add-character").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var comic = $("#comic-input").val().trim();

        // The comic from the textbox is then added to our array
        comics.push(comic);

        // Calling renderButtons which handles the processing of our comic array
        renderButtons();
    });

    // Adding click event listeners to all elements with a class of "comic"
    $(document).on("click", ".comic", displayComicInfo);


    // Calling the renderButtons function to display the intial buttons
    renderButtons();

});