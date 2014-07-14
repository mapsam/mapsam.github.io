$(document).ready(function(){
	// $.getJSON('https://api.github.com/users/svmatthews/starred', function(d){
	// 	$.each(d, function(k,v){
	// 		var starList = document.getElementById('starred');
	// 		starList.innerHTML += '<li><a href="'+d[k].html_url+'">'+d[k].name+'</a><span class="star-desc"> '+d[k].description+'</li>';
	// 	});
	// });
	$.getJSON('https://api.github.com/users/svmatthews/events', function(d){
		$.each(a, function(k,v){
			console.log(k,v);
			var recentList = document.getElementById('git-recent');
			var datestring = new Date(a[k].created_at);
			console.log(datestring);
			recentList.innerHTML += '<li><span class="meta"><span class="event ';
		});
	});
});