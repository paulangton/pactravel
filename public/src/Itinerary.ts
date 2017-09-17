// An itinerary should be a list of experiences
class Itinerary {
  travels : Experience[];

  // Add to itinerary
  visit(e : Experience) : void {
    if (!(e instanceof IntraCityEdge)) {

    }
    
    this.travels.push(e);
  }

}
