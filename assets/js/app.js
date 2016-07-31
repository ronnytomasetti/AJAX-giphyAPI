/**
 * AJAX GIPHY API
 * RONNY TOMASETTI
 * 2016 UCF CODING BOOTCAMP
 */

var searchURL = "http://api.giphy.com/v1/gifs/search?";

var topics = [ "cats", "dogs", "hamsters", "pig", "ducks", "fish",
                "cats", "dogs", "hamsters", "pig", "duck", "fish",
                "cats", "dogs", "hamsters", "pig", "duck", "fish",
                "cats", "dogs", "hamsters", "pig", "duck", "fish" ];

$(document).ready(function() {

    // Create topic button collection and append
    $.each(topics, function(index, value)
    {
        var btn = $('<button>').addClass('list-group-item')
                               .attr('type', 'button')
                               .attr('data-topic', value)
                               .text(value);
        
        $('#btn-list').append( btn );
    });

    // Add click event listener to buttons list
    $('.list-group-item').on( 'click', function()
    {
        // Update active button
        $('.list-group-item').removeClass('active');
        $( this ).addClass('active');

        // Grab topic data from button clicked
        var topic = $(this).data('topic');

        $.ajax({
            url: searchURL,
            type: 'GET',
            dataType: 'json',
            data: {
                q: topic,
                limit: 10,
                api_key: "dc6zaTOxFJmzC",
            },
        })
        .done(function(response) {
            $('#giphy-data').empty();
            $.each(response.data, function (key, value)
            {
                var gifImg = $('<img>').addClass('gif-img img-thumbnail')
                                       .data( 'still-url', value.images.original_still.url )
                                       .data( 'looping-url', value.images.original.url )
                                       .data( 'state', 'still')
                                       .attr( 'src', value.images.original_still.url )
                                       .on( 'click', function()
                                        {
                                            if ( $(this).data('state') == 'still' )
                                            {
                                                $(this).attr( 'src', value.images.original.url );
                                                $(this).data('state', 'looping');
                                            }
                                            else
                                            {
                                                $(this).attr( 'src', value.images.original_still.url );
                                                $(this).data('state', 'still');
                                            }
                                        });

                // Check IF rating is empty string. If empty, create variable rating set to NOT RATED.
                // ELSE create variable rating set to value.rating
                if ( value.rating === "")
                    var rating = "NOT RATED";
                else
                    var rating = "RATED " + value.rating.toUpperCase();

                var gifRating = $('<div>').addClass('panel-footer gif-rating text-center')
                                          .text( rating );

                var gifDiv = $('<div>').addClass('panel panel-default giphy-gif')
                                       .append( gifImg, gifRating );

                $('#giphy-data').append( gifDiv );
            })
        })
        .fail(function() {
            console.warn("AJAX ERROR");
        })
        .always(function() {
            console.log("complete");
        });
        
    });

});

// TODO: ADD RATING TO EACH GIF
// TODO: IMPLEMENT ADD TOPIC BUTTON LOGIC
// TODO: STYLE CSS