"use strict";
console.log("Hello");
var map;
function Initialize() {
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
    var cg = new CityGraph();
    cg.Nodes = cities;
    cg.Edges = edges;
    cg.draw(map);
}
function Update() {
}
function OnFlight(newCity) {
}
// 
function OnCityLoad(newCityGraph) {
}
// gets pixel coordinates
function PixelCoords(map, latLong) {
    var scale = Math.pow(2, map.getZoom());
    var nw = new google.maps.LatLng(map.getBounds().getNorthEast().lat(), map.getBounds().getSouthWest().lng());
    var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
    var worldCoordinate = map.getProjection().fromLatLngToPoint(latLong);
    var pixelOffset = new google.maps.Point(Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale), Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale));
    return [0, 0];
}
var CityGraph = (function () {
    function CityGraph() {
    }
    CityGraph.prototype.draw = function (map) {
        for (var _i = 0, _a = this.Edges; _i < _a.length; _i++) {
            var e = _a[_i];
            var path = new google.maps.Polyline({
                path: [
                    { lat: e.a.lat, lng: e.a.long },
                    { lat: e.b.lat, lng: e.b.long }
                ],
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            path.setMap(map);
        }
        for (var _b = 0, _c = this.Nodes; _b < _c.length; _b++) {
            var n = _c[_b];
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: { lat: n.lat, lng: n.long },
                radius: 200000
            });
        }
    };
    return CityGraph;
}());
var ANode = (function () {
    function ANode(lat, long) {
        this.lat = lat;
        this.long = long;
    }
    return ANode;
}());
var Edge = (function () {
    function Edge(a, b) {
        this.a = a;
        this.b = b;
    }
    return Edge;
}());
