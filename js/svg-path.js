$(document).ready(function(){
  $('#animate').on('click', function(){
    animatePath('dash', 3000);
  });
});

function animatePath(id, duration) {
  var path = document.querySelector('#'+id+' path');
  var length = path.getTotalLength();
  path.style.transition = path.style.WebkitTransition = 'none';
  path.style.strokeDasharray = length + ' ' + length;
  path.style.strokeDashoffset = length;
  path.getBoundingClientRect();
  path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset '+duration+'ms ease-in-out';
  path.style.strokeDashoffset = '0';
}