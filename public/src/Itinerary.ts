// An itinerary should be a list of experiences
class Itinerary {
  travels: Experience[];
  seen : any = {};
  lastExpId: number;

  constructor(travels?: Experience[], lastExpId?: number) {
    if (travels) {
      this.travels = travels;
    }
    else {
      this.travels = [];
    }

    if (lastExpId) {
      this.lastExpId = lastExpId;
    }
    else {
      this.lastExpId = 0;
    }
  }

  // Add to itinerary
  visit(exp: any): void {
    if(this.seen[exp]) return;
    this.seen[exp] = true;

    let itineraryDiv = document.getElementById("itinerary");
    let itineraryPad = document.getElementById("itinerary-pad");
    if (itineraryDiv == null) throw Error("Itinerary div doesn't exist!");

    let newDiv = document.createElement('div');
    if (exp instanceof TestExperience) {
      newDiv.innerHTML = 'Test Experience!';
    } else if (exp instanceof AttractionNode) {
      newDiv.innerHTML = '\t- Visited ' + exp.data.title;
    } else if (exp instanceof InterCityEdge) {
      newDiv.innerHTML = '</hr><h3>Flight from ' + exp.a.data.title + ' to ' + exp.b.data.title + '</h3><span><i>Cost: ' + exp.b.data.price + ' Duration: ' + exp.time + '</i></span>';
    } else {
      return;
    }
    
    itineraryDiv.insertBefore(newDiv, itineraryPad);
    itineraryDiv.classList.add('itinerary-item');

    itineraryDiv.scrollTop = itineraryDiv.scrollHeight - itineraryDiv.clientHeight;
    return;

    // if (!(e instanceof IntraCityEdge)) {
    //   let lastDiv = document.getElementById("exp" + this.lastExpId);
    //   if (lastDiv != null) {
    //     let curDiv : HTMLElement | null = null;
    //     if (e instanceof InterCityEdge) {
    //       curDiv = document.createElement("<div id='exp" + (this.lastExpId + 1) + "'>'" + e.transportType + ": " + e.a.city + " -> " + e.b.city + "'</div>");
    //     }

    //     else if (e instanceof ANode) {
    //       curDiv = document.createElement("<div id='exp" + (this.lastExpId + 1) + "'>'VISITED: " + e.city + " - " + e.name + "'</div>");
    //     }

    //     else if (curDiv == null ) {
    //       throw Error("Steady with those null HTMLElements son.");
    //     }

    //     insertAfter(curDiv, lastDiv);
    //   }
    //   this.lastExpId += 1;
    // }

    // this.travels.push(e);
  }

}
