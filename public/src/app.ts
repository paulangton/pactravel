console.log("Alex is a lame boi!");

declare var google: any;

var paused: boolean = true;

var pacman: Pacman;

var map: any;
var latestCity: CityGraph;
var visitedCities: CityGraph[];

function Initialize(): void {
  pacman = new Pacman(37.772, -122.214, new ANode(37.772, -122.214, "turtle beach"), new ANode(21.291, -157.821, "myrtle beach"));
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: { lat: 0, lng: -180 },
    mapTypeId: 'terrain'
  });

  var cities = [
    new ANode(37.772, -122.214, "turtle beach"),
    new ANode(21.291, -157.821, "myrtle beach"),
    new ANode(-18.142, 178.431, "boston beach"),
    new ANode(-27.467, 153.027, "coconut beach")
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

  let cg2 = GetCityGraphFromServerGraph(JSON.parse(example));

  cg2.draw(map);

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
    let e : AEdge = latestCity.GetBestEdge(closestNode as ANode, inputAngle); // Get most likely edge

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

function GetCityGraphFromServerGraph(serverGraph : any) : CityGraph {
  let cg = new CityGraph();
  // Sort is important for the edges to be right
  serverGraph.nodes.sort(function(n1 : any, n2 : any) {n1.id < n2.id ? -1 : 1});
  for(let n of serverGraph.nodes) {
    let newNode : ANode;
    if(n.isAirport) {
      newNode = new TravelNode(n.location[0], n.location[1]);
    } else {
      newNode = new AttractionNode(n.location[0], n.location[1]);
    }
    newNode.data = n;
    cg.Nodes.push(newNode);
  }

  for(let e of serverGraph.links) {
    let newEdge : AEdge;
    if(e.isFlight) {
      newEdge = new IntraCityEdge(cg.Nodes[e.source], cg.Nodes[e.target]);
    } else {
      newEdge = new InterCityEdge(cg.Nodes[e.source], cg.Nodes[e.target]);
    }
    newEdge.data = e.data;
    cg.Edges.push(newEdge);
  }

  return cg;
}
let example =
"{'links': [{'distance': 0.10011320051959448, 'source': 0, 'target': 9}, {'distance': 0.10187809479116254, 'source': 0, 'target': 10}, {'distance': 0.10135497105854806, 'source': 0, 'target': 1}, {'distance': 0.04673705252023362, 'source': 0, 'target': 7}, {'distance': 0.038296997271328855, 'source': 1, 'target': 9}, {'distance': 0.0072062472896764354, 'source': 1, 'target': 10}, {'distance': 0.03019023020780488, 'source': 1, 'target': 2}, {'distance': 0.013124404748404603, 'source': 2, 'target': 9}, {'distance': 0.0367042231902519, 'source': 2, 'target': 10}, {'distance': 0.022884492565927672, 'source': 2, 'target': 4}, {'distance': 0.016041508657231418, 'source': 3, 'target': 8}, {'distance': 0.009264987857521176, 'source': 3, 'target': 11}, {'distance': 0.008297590011571621, 'source': 3, 'target': 5}, {'distance': 0.008237718130652195, 'source': 3, 'target': 6}, {'distance': 0.028002856997098813, 'source': 4, 'target': 11}, {'distance': 0.01422743827960342, 'source': 4, 'target': 6}, {'distance': 0.031862831010437964, 'source': 4, 'target': 7}, {'distance': 0.007766595135572649, 'source': 5, 'target': 8}, {'distance': 0.017083617883816866, 'source': 5, 'target': 11}, {'distance': 0.007130918594405191, 'source': 5, 'target': 6}, {'distance': 0.012200409829172667, 'source': 6, 'target': 8}, {'distance': 0.01870320828093455, 'source': 7, 'target': 8}, {'distance': 0.043388938682575734, 'source': 7, 'target': 11}, {'distance': 0.04539878853009003, 'source': 9, 'target': 10}], 'multigraph': false, 'nodes': [{'location': [42.3656132, -71.00956020000001], 'id': 0, 'title': 'Boston Logan Airport', 'wiki': '', 'img': '', 'desc': 'Airport', 'isAirport': true}, {'location': [42.3736, -71.1106], 'id': 1, 'title': 'Cambridge, Massachusetts', 'wiki': 'https://en.wikipedia.org/wiki/Cambridge, Massachusetts', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Cambridge_Montage.jpg/269px-Cambridge_Montage.jpg', 'desc': 'Cambridge is a city in Middlesex County, Massachusetts, United States, in the Boston metropolitan area, situated directly north of the city of Boston proper, across the Charles River.', 'isAirport': false}, {'location': [42.3464, -71.0975], 'id': 2, 'title': 'Fenway Park', 'wiki': 'https://en.wikipedia.org/wiki/Fenway Park', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Fenway_from_Legend%27s_Box.jpg/400px-Fenway_from_Legend%27s_Box.jpg', 'desc': 'Fenway Park is a baseball park in Boston, Massachusetts, located at 4 Yawkey Way near Kenmore Square.', 'isAirport': false}, {'location': [42.3663, -71.0622], 'id': 3, 'title': 'TD Garden', 'wiki': 'https://en.wikipedia.org/wiki/TD Garden', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/TD_Garden_%28crop%29.JPG/400px-TD_Garden_%28crop%29.JPG', 'desc': 'The TD Garden  is a multi-purpose arena in Boston, Massachusetts.', 'isAirport': false}, {'location': [42.3493, -71.0748], 'id': 4, 'title': 'John Hancock Tower', 'wiki': 'https://en.wikipedia.org/wiki/John Hancock Tower', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Bostonstraight.jpg/400px-Bostonstraight.jpg', 'desc': 'Boston, the capital of the U.', 'isAirport': false}, {'location': [42.36, -71.0568], 'id': 5, 'title': 'Freedom Trail', 'wiki': 'https://en.wikipedia.org/wiki/Freedom Trail', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/USA-The_Freedom_Trail.JPG/400px-USA-The_Freedom_Trail.JPG', 'desc': 'The Freedom Trail is a 2.5-mile-long  path through downtown Boston, Massachusetts that passes by 16 locations significant to the history of the United States.', 'isAirport': false}, {'location': [42.3582, -71.0637], 'id': 6, 'title': 'Greater Boston', 'wiki': 'https://en.wikipedia.org/wiki/Greater Boston', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Greaterboston2.png/400px-Greaterboston2.png', 'desc': 'Greater Boston is the area of the Commonwealth of Massachusetts surrounding the city of Boston, consisting most of the eastern third of Massachusetts, excluding the South Coast, Cape Cod & The Islands.', 'isAirport': false}, {'location': [42.3361, -71.0458], 'id': 7, 'title': 'South Boston', 'wiki': 'https://en.wikipedia.org/wiki/South Boston', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/South_Boston_landscape.jpg/400px-South_Boston_landscape.jpg', 'desc': 'South Boston is a densely populated neighborhood of Boston, Massachusetts, located south and east of the Fort Point Channel and abutting Dorchester Bay.', 'isAirport': false}, {'location': [42.3536, -71.0524], 'id': 8, 'title': 'Boston Tea Party', 'wiki': 'https://en.wikipedia.org/wiki/Boston Tea Party', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Boston_Tea_Party_w.jpg/400px-Boston_Tea_Party_w.jpg', 'desc': 'The Boston Tea Party  was a political protest by the Sons of Liberty in Boston, on December 16, 1773.', 'isAirport': false}, {'location': [42.3357, -71.1051], 'id': 9, 'title': 'Harvard Medical School', 'wiki': 'https://en.wikipedia.org/wiki/Harvard Medical School', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Massachusetts_Medical_College_ca1824_MasonSt_Boston.png/400px-Massachusetts_Medical_College_ca1824_MasonSt_Boston.png', 'desc': 'Harvard Medical School  is the graduate medical school of Harvard University.', 'isAirport': false}, {'location': [42.3808, -71.1103], 'id': 10, 'title': 'American Academy of Arts and Sciences', 'wiki': 'https://en.wikipedia.org/wiki/American Academy of Arts and Sciences', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/American_Academy_of_Arts_and_Sciences%2C_Cambridge%2C_Massachusetts.JPG/400px-American_Academy_of_Arts_and_Sciences%2C_Cambridge%2C_Massachusetts.JPG', 'desc': 'The American Academy of Arts and Sciences, frequently known as the American Academy, is one of the oldest and most prestigious honorary societies and a leading center for independent policy research in the United States.', 'isAirport': false}, {'location': [42.3753, -71.0644], 'id': 11, 'title': 'Charlestown, Boston', 'wiki': 'https://en.wikipedia.org/wiki/Charlestown, Boston', 'img': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Charlestown%2C_Massachusetts%2C_City_Hall.png/371px-Charlestown%2C_Massachusetts%2C_City_Hall.png', 'desc': 'Charlestown is the oldest neighborhood in Boston, Massachusetts, United States.', 'isAirport': false}, {'location': [42.25, -71.0], 'id': 12, 'title': 'Quincy, Massachusetts', 'wiki': 'https://en.wikipedia.org/wiki/Quincy, Massachusetts', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Quincy_MA_Town_Hall_1844.jpg/400px-Quincy_MA_Town_Hall_1844.jpg', 'desc': 'Quincy  is a city in Norfolk County, Massachusetts, United States.', 'isAirport': false}, {'location': [42.3317, -71.1217], 'id': 13, 'title': 'Brookline, Massachusetts', 'wiki': 'https://en.wikipedia.org/wiki/Brookline, Massachusetts', 'img': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Montage_of_Brookline_MA.png/312px-Montage_of_Brookline_MA.png', 'desc': 'Brookline /ˈbrʊkˌlɪn/, /ˈbrʊkˌlaɪn/ is a town in Norfolk County, Massachusetts, in the United States, and is a part of Greater Boston.', 'isAirport': false}], 'graph': {}, 'directed': true}";
example = example.replace(/'/g, '"');
console.log(example);
