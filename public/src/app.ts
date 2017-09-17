console.log("Alex is a lame boi!");

declare var google: any;

var paused: boolean = true;

var pacman: Pacman;
var itinerary: Itinerary;

var map: any;
var latestCity: CityGraph;
var visitedCities: CityGraph[] = [];

var queryOrlando = 
{lat: 28.429394, long: -81.30899, air_name: "Orlando Airport", air_code: "ORL"};
var queryLondon = 
{lat: 51.504520, long: 0.048212, air_name: "London Ccity", air_code: "LCY"};
var queryMyrtle = 
{lat: 51.504520, long: 0.048212, air_name: "Myrtle Beach International Airport", air_code: "MYR"};

function Initialize(): void {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: { lat: 42.356327, lng: -71.060237 },
    mapTypeId: 'terrain'
  });

  // let cg2 = GetCityGraphFromServerGraph(JSON.parse(example));
  // // OnCityLoad(cg2);

  // let edge = cg2.Edges[0];
  // pacman = new Pacman(
  //   edge.a.lat,
  //   edge.a.long,
  //   edge.a,
  //   edge.b
  // );
  pacman = new Pacman(0, 0, new ANode(0, 0), new ANode(0, 0));
  itinerary = new Itinerary();

  let query = {
    lat: 0,
    long: 0,
    air_name: "Boston Logan Airport",
    air_code: "BOS",
  }
  OnFlight(query);

  setInterval(Update, 100);
}

function Update(): void {
  console.log("Update!");

  // Test itinerary
  if (keys[84]) {
    console.log("Adding test itinerary item!");
    itinerary.visit(new TestExperience());
  }

  if (keys[32]) paused = !paused; // Spacebar unpauses
  if (paused) return;

  let closestNode: ANode | null = null; // Ugly full iteration to find closest node to pac
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
  if (dist == 0 && closestNode != pacman.fromNode) {
    itinerary.visit(closestNode);

    let inputAngle = GetInputDirection();
    console.log("Input angle: " + inputAngle)
    if (inputAngle == null) return; // User hasn't pressed anything
    let e: AEdge = latestCity.GetBestEdge(closestNode as ANode, inputAngle); // Get most likely edge

    // Set the pacman path
    let newPathNode = (e.a == closestNode) ? e.b : e.a;
    pacman.turn(newPathNode)
    if (e instanceof InterCityEdge) {
      pacman.inFlight = true;

      let query = {
        lat: newPathNode.lat,
        long: newPathNode.long,
        air_name: newPathNode.data.title,
        air_code: newPathNode.data.destination,
      }
      OnFlight(query);
    }
  }

  let pacMovement = .001;

  pacman.move(pacMovement);
  pacman.draw(map);

}

function OnFlight(query: any) {
  var myRequest = new Request('http://127.0.0.1:5000/poi?latitude=' + query.lat + '&longitude=' + query.long + '&airport_name=' + query.air_name + '&airport_code=' + query.air_code);

  console.log(myRequest.url);
  fetch(myRequest)
    .then(function (res) {
      if (res.status == 200) return res.json();
      else throw new Error('Something went wrong on api server!');
    })
    .then(function (res) {
      console.log(res.data);
      OnCityLoad(GetCityGraphFromServerGraph(res.data));
      OnDoneFlying();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function OnDoneFlying() {
  let citySize = latestCity.center();
  console.log(citySize);
  map.setCenter({ lat: citySize[0], lng: citySize[1] });
  map.setZoom(Math.round(citySize[2] / 4.36));

  pacman.fromNode = latestCity.Edges[0].a;
  pacman.toNode = latestCity.Edges[0].b;
  pacman.lat = latestCity.Edges[0].a.lat;
  pacman.long = latestCity.Edges[0].a.long;
  pacman.draw(map);
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

  if (!(isUp || isDown || isLeft || isRight)) return null;

  if (isUp && !(isDown || isLeft || isRight)) return Math.PI / 2;
  if (isDown && !(isUp || isLeft || isRight)) return 3 * Math.PI / 2;
  if (isLeft && !(isUp || isDown || isRight)) return Math.PI;
  if (isRight && !(isUp || isDown || isLeft)) return 0;

  if (isUp && isLeft && !(isDown || isRight)) return 3 * Math.PI / 4;
  if (isDown && isRight && !(isUp || isLeft)) return 7 * Math.PI / 4;
  if (isLeft && isDown && !(isUp || isRight)) return 5 * Math.PI / 4;
  if (isRight && isUp && !(isDown || isLeft)) return 1 * Math.PI / 4;
  return null;
}

function GetCityGraphFromServerGraph(serverGraph: any): CityGraph {
  let cg = new CityGraph();
  let nodeTracker: any = {};
  for (let n of serverGraph.nodes) {
    let newNode: ANode;
    if (n.desc == "Airport") {
      newNode = new TravelNode(n.location[0], n.location[1]);
    } else {
      newNode = new AttractionNode(n.location[0], n.location[1]);
    }
    newNode.data = n;
    newNode.id = n.id;
    cg.Nodes.push(newNode);
    nodeTracker[newNode.id] = newNode;
  }

  for (let e of serverGraph.links) {
    let newEdge: AEdge;
    if (e.isFlight) {
      newEdge = new InterCityEdge(nodeTracker[e.source], nodeTracker[e.target]);
    } else {
      newEdge = new IntraCityEdge(nodeTracker[e.source], nodeTracker[e.target]);
    }
    newEdge.data = e.data;
    cg.Edges.push(newEdge);
  }

  return cg;
}
let example2 =
  JSON.stringify({
    'links': [], 'multigraph': false, 'nodes': [{ 'title': 'Boston Logan Airport', 'wiki': '', 'img': '', 'desc': 'Airport', 'id': 0, 'location': [42.3656132, -71.00956020000001], 'isAirport': true },
    { 'title': 'Cambridge, Massachusetts', 'wiki': 'https://en.wikipedia.org/wiki/Cambridge, Massachusetts', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Cambridge_Montage.jpg/269px-Cambridge_Montage.jpg', 'desc': 'Cambridge is a city in Middlesex County, Massachusetts, United States, in the Boston metropolitan area, situated directly north of the city of Boston proper, across the Charles River.', 'id': 1, 'location': [42.3736, -71.1106], 'isAirport': false },
    { 'title': 'Fenway Park', 'wiki': 'https://en.wikipedia.org/wiki/Fenway Park', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Fenway_from_Legend%27s_Box.jpg/400px-Fenway_from_Legend%27s_Box.jpg', 'desc': 'Fenway Park is a baseball park in Boston, Massachusetts, located at 4 Yawkey Way near Kenmore Square.', 'id': 2, 'location': [42.3464, -71.0975], 'isAirport': false }, { 'title': 'TD Garden', 'wiki': 'https://en.wikipedia.org/wiki/TD Garden', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/TD_Garden_%28crop%29.JPG/400px-TD_Garden_%28crop%29.JPG', 'desc': 'The TD Garden  is a multi-purpose arena in Boston, Massachusetts.', 'id': 3, 'location': [42.3663, -71.0622], 'isAirport': false }, { 'title': 'John Hancock Tower', 'wiki': 'https://en.wikipedia.org/wiki/John Hancock Tower', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Bostonstraight.jpg/400px-Bostonstraight.jpg', 'desc': 'Boston, the capital of the U.', 'id': 4, 'location': [42.3493, -71.0748], 'isAirport': false }, { 'title': 'Freedom Trail', 'wiki': 'https://en.wikipedia.org/wiki/Freedom Trail', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/USA-The_Freedom_Trail.JPG/400px-USA-The_Freedom_Trail.JPG', 'desc': 'The Freedom Trail is a 2.5-mile-long  path through downtown Boston, Massachusetts that passes by 16 locations significant to the history of the United States.', 'id': 5, 'location': [42.36, -71.0568], 'isAirport': false }, { 'title': 'Greater Boston', 'wiki': 'https://en.wikipedia.org/wiki/Greater Boston', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Greaterboston2.png/400px-Greaterboston2.png', 'desc': 'Greater Boston is the area of the Commonwealth of Massachusetts surrounding the city of Boston, consisting most of the eastern third of Massachusetts, excluding the South Coast, Cape Cod & The Islands.', 'id': 6, 'location': [42.3582, -71.0637], 'isAirport': false }, { 'title': 'South Boston', 'wiki': 'https://en.wikipedia.org/wiki/South Boston', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/South_Boston_landscape.jpg/400px-South_Boston_landscape.jpg', 'desc': 'South Boston is a densely populated neighborhood of Boston, Massachusetts, located south and east of the Fort Point Channel and abutting Dorchester Bay.', 'id': 7, 'location': [42.3361, -71.0458], 'isAirport': false }, { 'title': 'Boston Tea Party', 'wiki': 'https://en.wikipedia.org/wiki/Boston Tea Party', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Boston_Tea_Party_w.jpg/400px-Boston_Tea_Party_w.jpg', 'desc': 'The Boston Tea Party  was a political protest by the Sons of Liberty in Boston, on December 16, 1773.', 'id': 8, 'location': [42.3536, -71.0524], 'isAirport': false }, { 'title': 'Harvard Medical School', 'wiki': 'https://en.wikipedia.org/wiki/Harvard Medical School', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Massachusetts_Medical_College_ca1824_MasonSt_Boston.png/400px-Massachusetts_Medical_College_ca1824_MasonSt_Boston.png', 'desc': 'Harvard Medical School  is the graduate medical school of Harvard University.', 'id': 9, 'location': [42.3357, -71.1051], 'isAirport': false }, { 'title': 'American Academy of Arts and Sciences', 'wiki': 'https://en.wikipedia.org/wiki/American Academy of Arts and Sciences', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/American_Academy_of_Arts_and_Sciences%2C_Cambridge%2C_Massachusetts.JPG/400px-American_Academy_of_Arts_and_Sciences%2C_Cambridge%2C_Massachusetts.JPG', 'desc': 'The American Academy of Arts and Sciences, frequently known as the American Academy, is one of the oldest and most prestigious honorary societies and a leading center for independent policy research in the United States.', 'id': 10, 'location': [42.3808, -71.1103], 'isAirport': false }, { 'title': 'Charlestown, Boston', 'wiki': 'https://en.wikipedia.org/wiki/Charlestown, Boston', 'img': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Charlestown%2C_Massachusetts%2C_City_Hall.png/371px-Charlestown%2C_Massachusetts%2C_City_Hall.png', 'desc': 'Charlestown is the oldest neighborhood in Boston, Massachusetts, United States.', 'id': 11, 'location': [42.3753, -71.0644], 'isAirport': false }, { 'title': 'Quincy, Massachusetts', 'wiki': 'https://en.wikipedia.org/wiki/Quincy, Massachusetts', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Quincy_MA_Town_Hall_1844.jpg/400px-Quincy_MA_Town_Hall_1844.jpg', 'desc': 'Quincy  is a city in Norfolk County, Massachusetts, United States.', 'id': 12, 'location': [42.25, -71.0], 'isAirport': false }, { 'title': 'Brookline, Massachusetts', 'wiki': 'https://en.wikipedia.org/wiki/Brookline, Massachusetts', 'img': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Montage_of_Brookline_MA.png/312px-Montage_of_Brookline_MA.png', 'desc': 'Brookline /ˈbrʊkˌlɪn/, /ˈbrʊkˌlaɪn/ is a town in Norfolk County, Massachusetts, in the United States, and is a part of Greater Boston.', 'id': 13, 'location': [42.3317, -71.1217], 'isAirport': false }], 'directed': false, 'graph': {}
  })
let example =
  "{'links': [{'distance': 0.10011320051959448, 'source': 0, 'target': 9}, {'distance': 0.10187809479116254, 'source': 0, 'target': 10}, {'distance': 0.10135497105854806, 'source': 0, 'target': 1}, {'distance': 0.04673705252023362, 'source': 0, 'target': 7}, {'distance': 0.038296997271328855, 'source': 1, 'target': 9}, {'distance': 0.0072062472896764354, 'source': 1, 'target': 10}, {'distance': 0.03019023020780488, 'source': 1, 'target': 2}, {'distance': 0.013124404748404603, 'source': 2, 'target': 9}, {'distance': 0.0367042231902519, 'source': 2, 'target': 10}, {'distance': 0.022884492565927672, 'source': 2, 'target': 4}, {'distance': 0.016041508657231418, 'source': 3, 'target': 8}, {'distance': 0.009264987857521176, 'source': 3, 'target': 11}, {'distance': 0.008297590011571621, 'source': 3, 'target': 5}, {'distance': 0.008237718130652195, 'source': 3, 'target': 6}, {'distance': 0.028002856997098813, 'source': 4, 'target': 11}, {'distance': 0.01422743827960342, 'source': 4, 'target': 6}, {'distance': 0.031862831010437964, 'source': 4, 'target': 7}, {'distance': 0.007766595135572649, 'source': 5, 'target': 8}, {'distance': 0.017083617883816866, 'source': 5, 'target': 11}, {'distance': 0.007130918594405191, 'source': 5, 'target': 6}, {'distance': 0.012200409829172667, 'source': 6, 'target': 8}, {'distance': 0.01870320828093455, 'source': 7, 'target': 8}, {'distance': 0.043388938682575734, 'source': 7, 'target': 11}, {'distance': 0.04539878853009003, 'source': 9, 'target': 10}], 'multigraph': false, 'nodes': [{'location': [42.3656132, -71.00956020000001], 'id': 0, 'title': 'Boston Logan Airport', 'wiki': '', 'img': '', 'desc': 'Airport', 'isAirport': true}, {'location': [42.3736, -71.1106], 'id': 1, 'title': 'Cambridge, Massachusetts', 'wiki': 'https://en.wikipedia.org/wiki/Cambridge, Massachusetts', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Cambridge_Montage.jpg/269px-Cambridge_Montage.jpg', 'desc': 'Cambridge is a city in Middlesex County, Massachusetts, United States, in the Boston metropolitan area, situated directly north of the city of Boston proper, across the Charles River.', 'isAirport': false}, {'location': [42.3464, -71.0975], 'id': 2, 'title': 'Fenway Park', 'wiki': 'https://en.wikipedia.org/wiki/Fenway Park', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Fenway_from_Legend%27s_Box.jpg/400px-Fenway_from_Legend%27s_Box.jpg', 'desc': 'Fenway Park is a baseball park in Boston, Massachusetts, located at 4 Yawkey Way near Kenmore Square.', 'isAirport': false}, {'location': [42.3663, -71.0622], 'id': 3, 'title': 'TD Garden', 'wiki': 'https://en.wikipedia.org/wiki/TD Garden', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/TD_Garden_%28crop%29.JPG/400px-TD_Garden_%28crop%29.JPG', 'desc': 'The TD Garden  is a multi-purpose arena in Boston, Massachusetts.', 'isAirport': false}, {'location': [42.3493, -71.0748], 'id': 4, 'title': 'John Hancock Tower', 'wiki': 'https://en.wikipedia.org/wiki/John Hancock Tower', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Bostonstraight.jpg/400px-Bostonstraight.jpg', 'desc': 'Boston, the capital of the U.', 'isAirport': false}, {'location': [42.36, -71.0568], 'id': 5, 'title': 'Freedom Trail', 'wiki': 'https://en.wikipedia.org/wiki/Freedom Trail', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/USA-The_Freedom_Trail.JPG/400px-USA-The_Freedom_Trail.JPG', 'desc': 'The Freedom Trail is a 2.5-mile-long  path through downtown Boston, Massachusetts that passes by 16 locations significant to the history of the United States.', 'isAirport': false}, {'location': [42.3582, -71.0637], 'id': 6, 'title': 'Greater Boston', 'wiki': 'https://en.wikipedia.org/wiki/Greater Boston', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Greaterboston2.png/400px-Greaterboston2.png', 'desc': 'Greater Boston is the area of the Commonwealth of Massachusetts surrounding the city of Boston, consisting most of the eastern third of Massachusetts, excluding the South Coast, Cape Cod & The Islands.', 'isAirport': false}, {'location': [42.3361, -71.0458], 'id': 7, 'title': 'South Boston', 'wiki': 'https://en.wikipedia.org/wiki/South Boston', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/South_Boston_landscape.jpg/400px-South_Boston_landscape.jpg', 'desc': 'South Boston is a densely populated neighborhood of Boston, Massachusetts, located south and east of the Fort Point Channel and abutting Dorchester Bay.', 'isAirport': false}, {'location': [42.3536, -71.0524], 'id': 8, 'title': 'Boston Tea Party', 'wiki': 'https://en.wikipedia.org/wiki/Boston Tea Party', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Boston_Tea_Party_w.jpg/400px-Boston_Tea_Party_w.jpg', 'desc': 'The Boston Tea Party  was a political protest by the Sons of Liberty in Boston, on December 16, 1773.', 'isAirport': false}, {'location': [42.3357, -71.1051], 'id': 9, 'title': 'Harvard Medical School', 'wiki': 'https://en.wikipedia.org/wiki/Harvard Medical School', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Massachusetts_Medical_College_ca1824_MasonSt_Boston.png/400px-Massachusetts_Medical_College_ca1824_MasonSt_Boston.png', 'desc': 'Harvard Medical School  is the graduate medical school of Harvard University.', 'isAirport': false}, {'location': [42.3808, -71.1103], 'id': 10, 'title': 'American Academy of Arts and Sciences', 'wiki': 'https://en.wikipedia.org/wiki/American Academy of Arts and Sciences', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/American_Academy_of_Arts_and_Sciences%2C_Cambridge%2C_Massachusetts.JPG/400px-American_Academy_of_Arts_and_Sciences%2C_Cambridge%2C_Massachusetts.JPG', 'desc': 'The American Academy of Arts and Sciences, frequently known as the American Academy, is one of the oldest and most prestigious honorary societies and a leading center for independent policy research in the United States.', 'isAirport': false}, {'location': [42.3753, -71.0644], 'id': 11, 'title': 'Charlestown, Boston', 'wiki': 'https://en.wikipedia.org/wiki/Charlestown, Boston', 'img': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Charlestown%2C_Massachusetts%2C_City_Hall.png/371px-Charlestown%2C_Massachusetts%2C_City_Hall.png', 'desc': 'Charlestown is the oldest neighborhood in Boston, Massachusetts, United States.', 'isAirport': false}, {'location': [42.25, -71.0], 'id': 12, 'title': 'Quincy, Massachusetts', 'wiki': 'https://en.wikipedia.org/wiki/Quincy, Massachusetts', 'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Quincy_MA_Town_Hall_1844.jpg/400px-Quincy_MA_Town_Hall_1844.jpg', 'desc': 'Quincy  is a city in Norfolk County, Massachusetts, United States.', 'isAirport': false}, {'location': [42.3317, -71.1217], 'id': 13, 'title': 'Brookline, Massachusetts', 'wiki': 'https://en.wikipedia.org/wiki/Brookline, Massachusetts', 'img': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Montage_of_Brookline_MA.png/312px-Montage_of_Brookline_MA.png', 'desc': 'Brookline /ˈbrʊkˌlɪn/, /ˈbrʊkˌlaɪn/ is a town in Norfolk County, Massachusetts, in the United States, and is a part of Greater Boston.', 'isAirport': false}], 'graph': {}, 'directed': true}";
example = example.replace(/'/g, '"');
