

class CityGraph {
    
    Nodes : ANode[] = [];
    Edges : AEdge[] = [];
    
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
                radius: 100
            });
        }
    }
    
    
}

class Experience {
    
}

class ANode extends Experience {
    lat : number;
    long : number;
    data : any;
    city : String;
    name : String;
    description : String;
    visited : boolean;
    hasCherry : boolean;
    
    constructor(lat : number, long : number, name : String, description? : String, hasCherry? : boolean, city? : String) {
        super();
        this.lat = lat;
        this.long = long;
        this.visited = false;
        this.name = name;
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
    
    visit() : void {
        this.visited = true;
    }
    
    // draws a node
    draw() : void {
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
    a : ANode;
    b : ANode;
    data : any;
    
    constructor(a : ANode, b : ANode) {
        super();
        this.a = a;
        this.b = b;
    }
}

// intercity edge has an edge a to b but not necessarily b to a
class InterCityEdge extends AEdge {
    transportType : String;
    cost : number;
    time : number; // in hours
    
    constructor(a : ANode, b : ANode, transportType : String, cost : number, time : number) {
        super(a, b);
        this.transportType = transportType;
        this.cost = cost;
        this.time = time;
    }
}

class IntraCityEdge extends AEdge {
    
}
