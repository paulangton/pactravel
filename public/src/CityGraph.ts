// To represent a city graph
class CityGraph {

    Nodes: ANode[] = [];
    Edges: AEdge[] = [];

    // return edge whose angle from east corresponds most closely with the input angle
    GetBestEdge(node: ANode, angle: number): AEdge {
        let bestEdge = this.Edges[0];
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
            let col = (e instanceof InterCityEdge) ? '#FF0000' : '#333333';
            var path = new google.maps.Polyline({
                path: [
                    { lat: e.a.lat, lng: e.a.long },
                    { lat: e.b.lat, lng: e.b.long }
                ],
                strokeColor: col,
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            path.setMap(map);
        }
        for (let n of this.Nodes) {
            let col = (n instanceof TravelNode) ? '#FF0000' : '#00E5EE';
            var cityCircle = new google.maps.Circle({
                strokeColor: col,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: col,
                fillOpacity: 0.35,
                map: map,
                center: { lat: n.lat, lng: n.long },
                radius: 100
            });
        }
    }

    center() {
        let latSum = 0;
        let longSum = 0;
        let count = 0;
        let latBounds = [0,0];
        let longBounds = [0,0];

        for(let n of this.Nodes) {
            if(n instanceof TravelNode) continue;
            latSum += n.lat;
            longSum += n.long;
            latBounds[0] = Math.min(latBounds[0], n.lat);
            latBounds[1] = Math.max(latBounds[1], n.lat);
            longBounds[0] = Math.min(longBounds[0], n.long);
            longBounds[1] = Math.max(longBounds[1], n.long);

            count += 1;
        }
        return [latSum / count, longSum / count, ((latBounds[1] - latBounds[0]) + (longBounds[1] - longBounds[0])) / 2];
    }
}

class Experience {

}

class TestExperience extends Experience {

}

class ANode extends Experience {
    lat: number;
    long: number;
    id: number;
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
        latDif = this.b.lat - this.a.lat;
        longDif = this.b.long - this.a.long;

      }
      else if (startNode == this.b) {
        latDif = this.a.lat - this.b.lat;
        longDif = this.a.long - this.b.long;

      }
      else {

        console.log("Something went very wrong here!")
        console.log(this.a);
        console.log(this.b);
        return 0;
      }
      console.log(latDif);
      console.log(longDif);
      let angle = Math.atan2(latDif, longDif);
      angle = angle < 0 ? 2 * Math.PI + angle : angle;
      console.log(angle + " is the east angle");
      // in radians 0 - 2pi
      return angle;
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
