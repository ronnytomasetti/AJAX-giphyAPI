/**
 * AJAX GIPHY API
 * RONNY TOMASETTI
 * 2016 UCF CODING BOOTCAMP
 */

var initialTopics = [   "luke skywalker",
                        "darth vader",
                        "yoda",
                        "c3po",
                        "r2d2",
                        "han solo",
                        "chewbacca",
                        "boba fett",
                        "stormtroops",
                        "death star" ];

var initialBtnCount = 10;

var giphySearchURL = "http://api.giphy.com/v1/gifs/search?";
var swapiSearchURL = "http://swapi.co/api/people/";

$(document).ready(function() {

    function generateButtonWith( topic )
    {
        var btn = $('<button>').addClass( 'list-group-item' )
                               .attr( 'type', 'button' )
                               .attr( 'data-topic', topic )
                               .text( topic )
                               .on( 'click', function()
                               {
                                    // Update active button
                                    $('.list-group-item').removeClass('active');
                                    $( this ).addClass('active');

                                    // Grab topic data from button clicked
                                    var topic = $(this).data('topic');
                                    // Make ajax call to GIPHY api
                                    retrieveGiphyDataWith( topic );
                                });
        
        $('#btn-list').prepend( btn );
    } // END generateButtonWith( topic )

    function retrieveGiphyDataWith( topic )
    {
        $.ajax({
            url: giphySearchURL,
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
                                          .html( '<strong>' + rating + '</strong>' );

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
    } // END retrieveGiphyDataWith( topic )

    function retrieveInitialTopics( initialBtnCount )
    {
        $.ajax({
            url: swapiSearchURL,
            type: 'GET',
            dataType: 'json',
        })
        .done(function(response) {
            console.log("DONE");
        })
        .fail(function() {
            console.warn("AJAX ERROR");
        })
        .always(function() {
            console.log("COMPLETE");
        });
    } // END retrieveInitialTopics( initialBtnCount )

    $('#add-topic-button').on( 'click', function()
    {
        var userTopic = $('#add-topic-input').val().trim().toLowerCase();
        generateButtonWith( userTopic );
        $('#add-topic-input').val('');
    });

    /********************************************************
     * APPLICATION GO! Start generating initial button group.
     ********************************************************/
    $.each(initialTopics, function(index, value)
    {
        generateButtonWith( value );
    });

}); // END $(document).ready()
