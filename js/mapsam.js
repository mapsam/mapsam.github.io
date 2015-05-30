$(document).ready(function(){
  console.info('WELCOME TO MAPSAM! :)');

  var tooltip = null;
  $('.project').on('mouseover', function(){
    tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = $(this).attr('data-title');
    $(this).append(tooltip);
  });
  $('.project').on('mouseout', function(){
    $('.tooltip').remove();
  });

});