from CityGraph import *;

class Pacman {
  lat : number;
  lng : number;
  mouthState : boolean;
  fromNode : ANode;
  toNode : ANode;

  // Reverses pacman's direction
  rev() : void {
    let temp = this.toNode;
    this.toNode = this.fromNode;
    this.fromNode = this.toNode;
  }

  // returns a minimum distance (speed) for pacman to move in order to complete
  // the path in n time steps
  move(n : number) : void {
    let speed : number = Math.sqrt(Math.pow(this.toNode.lat - this.fromNode.lat, 2) + Math.pow(this.toNode.lng - this.fromNode.lng, 2)) / n;
    let latDif : number = this.toNode.lat - this.lat;
    let lngDif : number = this.toNode.lng - this.lng
    let direction = Math.atan(latDif/lngDif)
    if (latDif > 0) {
      this.lat += speed * Math.cos();
    }
    else {
      this.lat -= speed * Math.cos();
    }
    if (lngDif > 0) {
      this.lng -= speed * Math.sin();
    }
    else{
      this.lng -= speed * Math.sin();
    }
  }

}
