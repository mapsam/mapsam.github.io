$(document).ready(function(){
	$.getJSON('https://api.github.com/users/svmatthews/starred', function(d){
		$.each(d, function(k,v){
			console.log(k,v);
			var starList = document.getElementById('starred');
			starList.innerHTML += '<li><a href="'+d[k].html_url+'">'+d[k].name+'</a><span class="star-desc"> '+d[k].description+'</li>';
		});
	});
});