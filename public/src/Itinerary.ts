// An itinerary should be a list of experiences
class Itinerary {
  travels : Experience[];

  // render the itinerary
  draw() : void {
    for (let t of this.travels) {
      t.draw();
    }
  }
}
