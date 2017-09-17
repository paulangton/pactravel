import CityGraph from "./CityGraph";

class Pacman {
  lat : number;
  long : number;
  mouthState : number; // 0, 1, or 2
  fromNode : CityGraph.ANode;
  toNode : CityGraph.ANode;

  // Reverses pacman's direction
  rev() : void {
    let temp = this.toNode;
    this.toNode = this.fromNode;
    this.fromNode = this.toNode;
  }

  // returns a minimum distance (speed) for pacman to move in order to complete
  // the path in n time steps
  move(n : number) : void {
    let speed : number = Math.sqrt(Math.pow(this.toNode.lat - this.fromNode.lat, 2) + Math.pow(this.toNode.long - this.fromNode.long, 2)) / n;
    let latDif : number = this.toNode.lat - this.lat;
    let longDif : number = this.toNode.long - this.long;
    let direction = Math.atan(latDif/longDif); // in radians
    if (latDif > 0) {
      this.lat += speed * Math.cos(direction);
    }
    else {
      this.lat -= speed * Math.cos(direction);
    }
    if (longDif > 0) {
      this.long += speed * Math.sin(direction);
    }
    else{
      this.long -= speed * Math.sin(direction);
    }
  }

}
