UIkit.navbar();

$('.modal').on('hide', function () {
    var leg = $('.videoPlayer').attr("src");
    $('.videoPlayer').attr("src", leg);
});
