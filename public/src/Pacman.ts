
class Pacman {
  lat : number;
  long : number;
  renderState : number; // 0, 1, or 2
  fromNode : ANode;
  toNode : ANode;
  marker : any;

  constructor(lat : number, long : number, fromNode : ANode, toNode : ANode, renderState? : number) {
    this.lat = lat;
    this.long = long;
    this.fromNode = fromNode;
    this.toNode = toNode;
    if (renderState) {
      this.renderState = renderState;
    }
    else {
      this.renderState = 0;
    }
  }

  // Sets render state
  setRenderState(renderState : number) : void {
    this.renderState = renderState;
  }

  // increments render state
  next() : void {
    this.renderState += 1;
  }

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

  // draws a pacman
  draw(map : any) {
    var image = {
      url: '../resources/pacman' + this.renderState + ".gif",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(32, 32)
    };

    this.marker.setMap(null);
    this.marker = new google.maps.Marker({
      position: {lat:this.lat, lng: this.long},
      map: map,
      icon: image,
      zIndex: 1
    });
    this.marker.setMap(map);

  }

}
