// created array called comics set it equal to topics due to assignment
var comics = ['Batman', 'Superman', 'Wolverine', 'Iron Man', 'Dare Devil', 'Spawn'];
var topics = comics;

createcomicButtons();


// pushed to the end of the array. 
// function is called place buttons.
$('#addComic').on('click', function() {
    var comicEntered = $('#comicInput').val().trim();
    comics.push(comicEntered);
    $('#comicInput').val('');
    createcomicButtons();
    return false;
});


$(document.body).on('click', '.button-list', function() {
    var comicClicked = $(this).data('comic');
    //string for the Giphy API request and adds comics to the string
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + comicClicked + '&limit=10&api_key=p55DVrogwsOEFUjB7ocaOrj2lexS37Bo';

    // Empties the element
    $('#comics').empty();

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {
        var results = response.data;
        console.log(response);
        for (i = 0; i < results.length; i++) {
            //create new variables 
            var newGif = $('<div class="col-sm-4">');
            var rating = results[i].rating.toUpperCase();
            // created p variable so that the rating can be attached
            var p = $('<p>').html('Rating: ' + rating);
            //assign img to the img var
            var img = $('<img>');
            img.attr('src', results[i].images.fixed_height_small_still.url);
            img.attr('data-still', results[i].images.fixed_height_small_still.url);
            img.attr('data-animate', results[i].images.fixed_height_small.url);
            img.attr('data-clicked', 'still');
            img.addClass('gif-margin gif center-block panel');

            // Appends the p and img variables to the newGif variable.
            newGif.append(img);
            newGif.append(p);
            // Appends the newGif to html
            $('#comics').append(newGif);
        }
    });
});

// Pauses the gif and animates gif with a click
$(document.body).on('click', '.gif', function() {
    var click = $(this).attr('data-clicked');

    if (click === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-clicked', 'still');
    }
});


//
// FUNCTIONS --------------------------------------------------------------------------------------------------------------
//


//createomicButtons function is called div gets emptied and then loops through the comics array. Button is appened to the 
//#comicButtons 

function createcomicButtons() {
    $('#comicButtons').empty();

    for (var i = 0; i < comics.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-comic', comics[i]).html(comics[i]);
        $('#comicButtons').append(button);
    }
}