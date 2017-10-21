$('.modal').on('hide', function () {
    var leg = $('.videoPlayer').attr("src");
    $('.videoPlayer').attr("src", leg);
});

if ($('#desktop').is(':visible')) {
    $('#background_video').html('<video muted autoplay loop align="center"><source src="media/background.mp4" type="video/mp4"></video>');
}
