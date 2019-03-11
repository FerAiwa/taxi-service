import { Ride } from "./models/ride.js";

/** Holds the Rides Data mocks and interacts with local storage. */
export class RidesDataService {
  constructor() {
    this.RIDELIMIT = 8;
    const RIDES = [
      { id: 0, to: "A Coruña", from: "Santiago", cost: 60, scale: false },
      { id: 1, to: "New York", from: "New Yersey", cost: 120, scale: false },
      { id: 2, to: "Valencia", from: "Madrid", cost: 300, scale: true },
      { id: 3, to: "O Porto", from: "Guimaraes", cost: 50, scale: false },
      { id: 4, to: "Roma", from: "Milan", cost: 300, scale: false },
      { id: 5, to: "London", from: "Manchester", cost: 200, scale: false }
    ];
    this.localRides = this.getStoredRides() || RIDES;
    console.log(this.localRides);
  }

  create() {
    const reachedLimit = this.localRides.length >= this.RIDELIMIT;
    if (reachedLimit) throw `Error. Reached maximum rides (${this.RIDELIMIT}.)`;

    const newRide = new Ride({
      id: this.getLastIDCreated() + 1,
      from: prompt("Departure city?"),
      to: prompt("Destination?"),
      cost: +prompt("Ride cost (€)?"),
      scale: confirm("The ride has a scale...?")
    });
    this.simpleValidate(newRide) && this.add(newRide);
  }

  /*** @param {Ride} ride  */
  simpleValidate(ride) {
    const { id, from, cost, scale } = ride;
    const isValid = "" + id && "" + from && isFinite(cost) && scale;
    if (isValid) return true;
    else throw "ups. Something went wrong during ride creation";
  }

  /*** @param {Ride} ride  */
  add(ride) {
    this.localRides.push(ride);
    this.saveAll();
  }
  /** @param {string} id */
  update(id) {
    console.log("item updated");
    this.saveAll();
  }

  /** @param {string} id */
  remove(id) {
    const ride = this.getRidebyId(id);
    if (!ride) throw "Remove error. Couldn´t find ride with that id.";
    const confirmMsg = `Are you sure you want to delete ride ${ride.id} ${
      ride.from
    } - ${ride.to}?`;
    if (confirm(confirmMsg)) {
      this.localRides.splice(this.localRides.indexOf(ride), 1);
      this.saveAll();
    }
  }

  saveAll() {
    localStorage.setItem("rides", JSON.stringify(this.localRides));
  }

  getRidebyId(id) {
    return this.localRides.find(x => x.id == id);
  }

  getRides() {
    return this.localRides;
  }

  getStoredRides() {
    return JSON.parse(localStorage.getItem("rides"));
  }

  getLastIDCreated() {
    return Math.max(...this.localRides.map(x => x.id));
  }

  getRideLocalIndex(ride) {
    return this.localRides.findIndex(x => ride.id == x.id);
  }
}
