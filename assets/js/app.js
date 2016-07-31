/**
 * AJAX GIPHY API
 * RONNY TOMASETTI
 * 2016 UCF CODING BOOTCAMP
 */

var searchURL = "http://api.giphy.com/v1/gifs/search?";

var topics = [ "cats", "dogs", "hamsters", "pig", "duck", "fish",
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
            $('#topic-data').empty();
            $.each(response.data, function (key, value)
            {
                var gif = $('<img>').addClass('giphy-gif')
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

                $('#topic-data').append( gif );
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