function init() {
	var party = document.getElementById('party');
	party.onclick=function() {
		document.getElementById('howdy').className += 'party';
	}
}

window.onLoad = init();