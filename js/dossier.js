function scrollTo(item) {
  $('html, body').animate({
    scrollTop: item.offset().top
  }, 'slow');
}