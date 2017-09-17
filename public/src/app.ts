console.log("Hello!");

declare var google: any;

var paused: boolean = true;

var map : any;
var latestCity : CityGraph;
var visitedCities : CityGraph[];

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
    new AEdge(cities[0], cities[1]),
    new AEdge(cities[1], cities[2]),
    new AEdge(cities[2], cities[3]),
    new AEdge(cities[3], cities[0]),
  ];

  let cg = new CityGraph();
  cg.Nodes = cities;
  cg.Edges = edges;

  cg.draw(map);

  google.maps.event.addListener(map, 'click', OnClick);

}
function OnClick(event : any, counter = 10) {
  console.log(event);

  var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  var marker = new google.maps.Marker({
    position: event.latLng,
    map: map,
    icon: image,
    zIndex: 1
  });
  if(counter == 0) {
    return;
  }
  //event.latLng.lat += 1;
  //OnClick(event, counter - 1);
}

function Update() : void {

  if(paused) return;



}

function OnFlight(newCity : any) {

}

//
function OnCityLoad(newCityGraph: any) : void {
  latestCity = newCityGraph;
  visitedCities.push(newCityGraph);

  latestCity.draw(map);
}

var keys : any = [];
window.onkeyup = function(e) {keys[e.keyCode]=false;}
window.onkeydown = function(e) {keys[e.keyCode]=true;}

function GetInputDirection() {
  let isUp = keys[38] || keys[87] || false;
  let isDown = keys[40] || keys[83] || false;
  let isLeft = keys[37] || keys[65] || false;
  let isRight = keys[39] || keys[68] || false;

  // bOoLEAnS aDD As NuMBerSsSSs!?!
  let vertical = isUp - isDown;
  let horizontal = isRight - isLeft;

}
