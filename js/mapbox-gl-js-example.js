window.onload = function() {

  mapboxgl.accessToken = 'pk.eyJ1IjoibWFwc2FtIiwiYSI6ImNpaWR1MXlxcDAxMTJ1M2tzYWUyeTdpY24ifQ.QG1jCTgj-WYwJa2y1W0wMw';

  var map = new mapboxgl.Map({
    container: 'map-example',
    style: 'mapbox://styles/mapsam/cikg2spcb001d9sm69lo7bhpz',
    center: [-120.897351, 47.613391],
    zoom: 6
  });

  map.scrollZoom.disable();

};