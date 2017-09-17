// To represent a city graph
class CityGraph {

    Nodes: ANode[] = [];
    Edges: AEdge[] = [];

    // return edge whose angle from east corresponds most closely with the input angle
    GetBestEdge(node: ANode, angle: number): AEdge {
        let bestEdge = this.Edges[0];
        console.log(this.Edges[0]);
        for(let e of this.Edges) {
          if (e.a == node || e.b == node) {
            let curBestAngle : number = Math.abs(bestEdge.getAngleFromEast(node) - angle);
            let nextAngle : number = Math.abs(e.getAngleFromEast(node) - angle)
            if (curBestAngle > nextAngle) {
              bestEdge = e
            }
          }
        }
        console.log("input angle: " + angle)
        console.log(bestEdge);
        return bestEdge;
    }

    draw(map: any) {
        for (let e of this.Edges) {
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
        for (let n of this.Nodes) {
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: { lat: n.lat, lng: n.long },
                radius: 100
            });
        }
    }


}

class Experience {

}

class TestExperience extends Experience {

}

class ANode extends Experience {
    lat: number;
    long: number;
    data: any;
    city: String;
    name: String;
    description: String;
    visited: boolean;
    hasCherry: boolean;

    constructor(lat: number, long: number, name?: String, description?: String, hasCherry?: boolean, city?: String) {
        super();
        this.lat = lat;
        this.long = long;
        this.visited = false;
        if (name) {
            this.name = name;
        }
        if (hasCherry) {
            this.hasCherry = hasCherry;
        }
        else {
            this.hasCherry = false;
        }
        if (city) {
            this.city = city;
        }
        if (description) {
            this.description = description;
        }
    }

    visit(): void {
        this.visited = true;
    }

    // draws a node
    draw(): void {
        if (this.hasCherry && !this.visited) {
            // drop a cherry
        }

    }
}

class TravelNode extends ANode {

}

class AttractionNode extends ANode {

}

class AEdge extends Experience {
    a: ANode;
    b: ANode;
    data: any;

    constructor(a: ANode, b: ANode) {
        super();
        this.a = a;
        this.b = b;
    }

    getAngleFromEast(startNode : ANode) {
      let latDif: number;
      let longDif: number;
      if (startNode == this.a) {
        latDif = this.b.lat - this.a.lat
        longDif = this.b.long - this.a.long

      }
      else if (startNode == this.b) {
        latDif = this.a.lat - this.b.lat
        longDif = this.a.long - this.b.long

      }
      else {

        console.log("Something went very wrong here!")
        console.log(this.a);
        console.log(this.b);
        return 0;
      }
      // in radians
      return Math.atan2(latDif, longDif);
    }
}

// intercity edge has an edge a to b but not necessarily b to a
class InterCityEdge extends AEdge {
    transportType: String;
    cost: number;
    time: number; // in hours

    constructor(a: ANode, b: ANode, transportType?: String, cost?: number, time?: number) {
        super(a, b);
        if (transportType) {
            this.transportType = transportType;
        }
        if (cost) {
            this.cost = cost;
        }
        if (time) {
            this.time = time;
        }
    }
}

class IntraCityEdge extends AEdge {

}
