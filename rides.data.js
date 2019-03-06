export class RidesDataService {
  constructor () {
    this.RIDELIMIT = 8;
    this.rides = [
      { id: 0, to: "A Coruña", from: "Santiago", cost: 60, scale: false },
      { id: 1, to: "New York", from: "New Yersey", cost: 120, scale: false },
      { id: 2, to: "Valencia", from: "Madrid", cost: 300, scale: true },
      { id: 3, to: "O Porto", from: "Guimaraes", cost: 50, scale: false },
      { id: 4, to: "Roma", from: "Milan", cost: 300, scale: false },
      { id: 5, to: "London", from: "Manchester", cost: 200, scale: false }
    ];
  }
    
  create () {
    if(this.rides.length >= RIDELIMIT) throw `Error. Reached maximum rides (${RIDELIMIT}.)`;
    return new Ride({
      id    : RIDELIMIT+1,
      to    : prompt('Arrival city name?'),
      cost  : prompt('Ride cost (€)?'),
      scale : confirm('The ride has a scale...?')
    });
  }

  add (ride) {
    this.rides.push(ride);
    this.saveAll();    
  };
  
  remove(id) {
    const ride = getRidebyId(id);
    if(!ride) throw 'Remove error. Couldn´t find ride with that id.'
    this.rides.splice(this.rides.indexOf(ride), 1);
    this.saveAll();
  }
  
  saveAll () { localStorage.setItem('rides', JSON.stringify(this.rides)) }
  
  getRidebyId (id) { return this.rides.find(x => x.id === id) }
  
  getRides () { 
    return this.getStoredRides() || this.rides;
  }

  getStoredRides () { 
    return JSON.parse(localStorage.getItem('rides')) 
  }

}
