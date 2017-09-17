
class Pacman {
  lat: number;
  long: number;
  renderState: number; // 0, 1, or 2
  fromNode: ANode;
  toNode: ANode;
  marker: any;

  constructor(lat: number, long: number, fromNode: ANode, toNode: ANode, renderState?: number) {
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
  setRenderState(renderState: number): void {
    this.renderState = renderState;
  }

  // increments render state
  next(): void {
    this.renderState += 1;
  }

  // turns the pacman to a different path
  turn(toNode : ANode) : void {
    this.fromNode = this.toNode
    this.toNode = toNode
  }

  // returns a minimum distance (speed) for pacman to move in order to complete
  // the path in n time steps
  move(n: number): void {
    let speed: number = Math.sqrt(Math.pow(this.toNode.lat - this.fromNode.lat, 2) + Math.pow(this.toNode.long - this.fromNode.long, 2)) / n;
    speed = n;
    let latDif: number = this.toNode.lat - this.lat;
    let longDif: number = this.toNode.long - this.long;
    let direction = Math.atan(latDif / longDif); // in radians
    console.log(direction);

    if (latDif > 0) {
      this.lat += speed * Math.sin(direction);
      if (this.lat > this.toNode.lat) {
        this.lat = this.toNode.lat;
      }
    }
    else {
      this.lat -= speed * Math.sin(direction);
      if (this.lat < this.toNode.lat) {
        this.lat = this.toNode.lat;
      }
    }
    if (longDif > 0) {
      this.long += speed * Math.cos(direction);
      if (this.long > this.toNode.long) {
        this.long = this.toNode.long;
      }
    }
    else {
      this.long -= speed * Math.cos(direction);
      if (this.long < this.toNode.long) {
        this.long = this.toNode.long;
      }
    }
  }

  // draws a pacman
  draw(map: any) {
    let iconBase : String = './resources/';
    let icons = [
      iconBase + 'pacman0.png',
      iconBase + 'pacman1.png',
      iconBase + 'pacman2.png'
    ];

    let image = {
      url: icons[this.renderState],
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(256, 230),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(15, 15),
      scaledSize: new google.maps.Size(30, 30)
    };

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: { lat: this.lat, lng: this.long },
        map: map,
        icon: icons[this.renderState],
        zIndex: 1
      });
    }
    this.marker.setPosition(new google.maps.LatLng(this.lat, this.long));
    this.marker.setIcon(image);
    if (this.renderState >= 2) {
      this.renderState = 0;
    }
    else {
      this.renderState += 1;
    }
  }


}
