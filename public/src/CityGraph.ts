

class CityGraph {

    Nodes : ANode[];
    Edges : AEdge[];

    GetBestEdge(node : ANode, angle: number) : AEdge {
        return this.Edges[0];
    }

    draw(map : any) {
        for(let e of this.Edges) {
            var path = new google.maps.Polyline({
                path: [
                    {lat: e.a.lat, lng: e.a.long},
                    {lat: e.b.lat, lng: e.b.long}
                ],
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            path.setMap(map);
        }
        for(let n of this.Nodes) {
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: {lat: n.lat, lng: n.long},
                radius: 200000
            });
        }
    }


}

class Experience {

}

class ANode extends Experience {
  lat : number;
  long : number;

  constructor(lat : number, long : number) {
    super();
    this.lat = lat;
    this.long = long;
  }

}

class TravelNode extends ANode {

}

class AttractionNode extends ANode {

}

class AEdge extends Experience {
    a : ANode;
    b : ANode;

    constructor(a : ANode, b : ANode) {
      super();
      this.a = a;
      this.b = b;
    }
}

class InterCityEdge extends AEdge {

}

class IntraCityEdge extends AEdge {

}
