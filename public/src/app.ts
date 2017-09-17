console.log("Hello");

declare var google: any;
var map;

function Initialize() : void {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: 0, lng: -180},
    mapTypeId: 'terrain'
  });
  
  var cities = [
    new ANode(37.772,-122.214),
    new ANode(21.291,-157.821),
    new ANode(-18.142,178.431),
    new ANode(-27.467, 153.027)
  ];

  var edges = [
    new Edge(cities[0], cities[1]),
    new Edge(cities[1], cities[2]),
    new Edge(cities[2], cities[3]),
    new Edge(cities[3], cities[0]),
  ];

  let cg = new CityGraph();
  cg.Nodes = cities;
  cg.Edges = edges;

  cg.draw(map);
}

function Update() : void {
  
}

function OnFlight(newCity : any) {
  
}

// 
function OnCityLoad(newCityGraph: any) : void {
  
}

