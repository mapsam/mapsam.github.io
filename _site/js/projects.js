$(document).ready(function(){
  $('#project-nav li').on('click', function(){
    $('#project-nav li').removeClass('active');
    $(this).addClass('active');
    var type = $(this).attr('id');
    if(type=='all') {
      $('.project').show();
    } else {
      $('.project').hide();
      $('.project.'+type).show();
    }
  });

  $('.expand').on('click', function(){
    var text = $(this).text();
    if(text==='more') {
      $('.full').hide(200);
      $('.expand').text('more');
      $(this).text('less');
      $(this).parent().next('.full').slideToggle(200);
    } else {
      $(this).parent().next('.full').slideToggle(200);
      $(this).text('more');
    }
  });
});