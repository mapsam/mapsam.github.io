$(document).ready(function(){
	$.getJSON('https://api.github.com/users/svmatthews/starred', function(d){
		$.each(d, function(k,v){
			var starList = document.getElementById('starred');
			starList.innerHTML += '<li><a href="'+d[k].html_url+'">'+d[k].name+'</a><span class="star-desc"> '+d[k].description+'</li>';
		});
	});
	$.getJSON('https://api.github.com/users/svmatthews/events', function(d){
		$.each(d, function(k,v){
			console.log(k,v);
			var recentList = document.getElementById('git-recent');
			var datestring = new Date(d[k].created_at);
			var day = datestring.getDate();
			var month = datestring.getMonth();
			var year = datestring.getFullYear();
			var time = datestring.getHours() + ':' + datestring.getMinutes();
			var name = d[k].type.replace('Event', '');
			recentList.innerHTML += '<li><span class="meta"><span class="event '+d[k].type+'">'+name+'</span><span class="pushdate">'+year+'-'+month+'-'+day+'-</span><span class="pushtime">'+time+'</span></span><br><a href="http://github.com/'+d[k].repo.name+'" target="_blank">'+d[k].repo.name+'</a></li>';
		});
	});
});