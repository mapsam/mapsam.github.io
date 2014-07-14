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
});