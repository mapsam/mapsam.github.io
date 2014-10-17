$(document).ready(function(){
  $('a').on('click', function(){
    if($(this).attr('href').indexOf('#')>-1) {
      event.preventDefault();
      var id = $(this).attr("href"),
          top = $(id).offset().top;
      $("html, body").animate({
        scrollTop: top
      }, 500)
    }
  });
});