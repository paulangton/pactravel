console.log("Hello!");

declare var google: any;

var paused: boolean = true;

var pacman: Pacman = new Pacman;

var map: any;
var latestCity: CityGraph;
var visitedCities: CityGraph[];

function Initialize(): void {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: { lat: 0, lng: -180 },
    mapTypeId: 'terrain'
  });

  var cities = [
    new ANode(37.772, -122.214),
    new ANode(21.291, -157.821),
    new ANode(-18.142, 178.431),
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

  google.maps.event.addListener(map, 'click', OnClick);

}
function OnClick(event: any, counter = 10) {
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
  if (counter == 0) {
    return;
  }
  //event.latLng.lat += 1;
  //OnClick(event, counter - 1);
}

function Update(): void {
  if (keys[32]) paused = !paused; // Spacebar unpauses
  if (paused) return;

  let closestNode : ANode | null = null; // Ugly full iteration to find closest node to pac
  let dist = -1;
  for (let n of latestCity.Nodes) {
    if (closestNode == null ||
      Distance(
        { lat: n.lat, lng: n.long },
        { lat: pacman.lat, lng: pacman.long }) < dist) {
      closestNode = n;
      dist = Distance(
        { lat: n.lat, lng: n.long },
        { lat: pacman.lat, lng: pacman.long })
    }
  }

  // Pacman is paused at a node, waiting user input to go somewhere else
  if(dist == 0) { 
    let inputAngle = GetInputDirection();
    if(inputAngle == null) return; // User hasn't pressed anything
    let e : Edge = latestCity.GetBestEdge(closestNode as ANode, inputAngle); // Get most likely edge
    
    // Set the pacman path
    pacman.fromNode = closestNode as ANode;
    pacman.toNode = (e.a == closestNode) ? e.b : e.a;
    pacman.lat = pacman.fromNode.lat;
    pacman.long = pacman.fromNode.long;
  }

  let pacMovement = .1;

  pacman.move(pacMovement);

}

function OnFlight(newCity: any) {

}

// 
function OnCityLoad(newCityGraph: any): void {
  latestCity = newCityGraph;
  visitedCities.push(newCityGraph);

  latestCity.draw(map);
}

var keys: any = [];
window.onkeyup = function (e) { keys[e.keyCode] = false; }
window.onkeydown = function (e) { keys[e.keyCode] = true; }

function GetInputDirection() {
  let isUp = keys[38] || keys[87] || false;
  let isDown = keys[40] || keys[83] || false;
  let isLeft = keys[37] || keys[65] || false;
  let isRight = keys[39] || keys[68] || false;

  if (!(isUp && isDown && isLeft && isRight)) return null;

  if (isUp && !(isDown && isLeft && isRight)) return Math.PI / 2;
  if (isDown && !(isUp && isLeft && isRight)) return 3 * Math.PI / 2;
  if (isLeft && !(isUp && isDown && isRight)) return Math.PI;
  if (isRight && !(isUp && isDown && isLeft)) return 0;

  if (isUp && isLeft && !(isDown && isLeft && isRight)) return 3 * Math.PI / 4;
  if (isDown && isRight && !(isUp && isLeft && isRight)) return 7 * Math.PI / 4;
  if (isLeft && isDown && !(isUp && isDown && isRight)) return 5 * Math.PI / 4;
  if (isRight && isUp && !(isUp && isDown && isLeft)) return 1 * Math.PI / 4;
  throw new Error("GetInputDirection failed!");
}