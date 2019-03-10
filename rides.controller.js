import { RidesView } from "./rides.view.js";
import { RidesDataService } from "./rides.data.js";
/** BUSINESS LOGIC
 * The Controller. Controller responds to user actions and invokes changes on the model.
 */

export class RidesController {
  /**
   * @param {RidesView} view
   * @param {RidesDataService} rideDataService
   * @param {*} options
   */
  constructor(
    view,
    rideDataService,
    options = { activeFilter: "", sortDescending: true }
  ) {
    this.view = view;
    this.rideDataService = rideDataService;
    this.activeFilter = options.activeFilter;
    this.descendOrderFlag = options.sortDescending;
  }

  initialize() {
    this.rideList = this.rideDataService.getRides();
    this.resetTable(this.view.table, this.rideList);
    this.resetSlider();
    this.startEvenCatcher();
  }

  /**
   * Reloads table after model changes
   */
  resetTable(table, items) {
    table
      .clear()
      .setItems(items)
      .build()
      .setRowsAttribute("data-ride", items.map(x => x.id))
      .addButtons(this.view.table.hostElement);

    table.addTableHeaderListeners();
    table.addSliderListeners();
    this.view.setSpecialGlyphs();
  }

  resetSlider() {
    let costList = this.rideList.map(x => x.cost).filter(isFinite);
    this.view.setSliderValues(Math.min(...costList), Math.max(...costList));
  }

  startEvenCatcher() {
    //TODO: DRY ALERT!!!
    //Events
    this.view.on("headerClick", e => this.onClickTableField(e));
    this.view.on("buttonClick", e => this.onButtonClick(e));
    this.view.on("buyBtnClick", e => this.onBuyButtonClick(e));
    this.view.on("editBtnClick", e => this.onEditBtnClick(e));
    this.view.on("eraseBtnClick", e => this.onEraseBtnClick(e));
    this.view.on("createBtnClick", e => this.onCreateBtnClick(e));

    this.view.on("sliderChange", value => this.view.updateSliderHelper(value));
    this.view.on("sliderRelease", value => {
      const ridesInCostRange = this.getRidesBelowPrice(value);
      this.view.table.setRowsVisibility(ridesInCostRange);
    });
  }

  //EVENT BUSINESS LOGIC

  onBuyButtonClick(e) {
    const id = e.target.parentElement.parentElement.getAttribute("data-ride");
    const ride = this.rideDataService.getRidebyId(id);
    alert(`Thanks for your purchase! \n We wish you a nice trip to ${ride.to}`);
  }

  onEditBtnClick(e) {
    const id = e.target.parentElement.parentElement.getAttribute("data-ride");
    const editingRide = this.rideDataService.getRidebyId(id);
    for (let property of Object.keys(editingRide)) {
      if (property === "id") continue;
      editingRide[property] = prompt(property, editingRide[property]);
    }
    this.rideDataService.update(id);
    this.resetTable(this.view.table, this.rideList);
  }

  onEraseBtnClick(e) {
    const id = e.target.parentElement.parentElement.getAttribute("data-ride");

    this.rideDataService.remove(id);
    this.resetTable(this.view.table, this.rideList);
  }

  onCreateBtnClick(e) {
    this.rideDataService.create();
    this.resetTable(this.view.table, this.rideList);
  }

  onClickTableField(event) {
    const fieldName = event.target.innerHTML.toLowerCase();
    try {
      const key = this.getObjectKey(fieldName);
      this.activeFilter = key;
      this.descendOrderFlag = !this.descendOrderFlag;

      const reorderIds = this.sortBy(key, this.descendOrderFlag);
      const reorderIndexes = reorderIds.map(x =>
        this.rideDataService.getRideLocalIndex(x)
      );
      this.view.table.changeRowsOrder(reorderIndexes);

      event.target.classList.toggle("activeFilter");
    } catch (e) {
      console.error(e);
    }
  }

  sortBy(property, descending = true) {
    const data = this.rideList.map(x => {
      return { id: x.id, value: x[property] };
    });

    const type = Number(data[0].value) ? this.sortNumbers : this.sortString;
    const newOrder = data.sort(type);
    return descending ? newOrder : newOrder.reverse();
  }

  sortString(a, b) {
    return a.value > b.value ? 1 : a.value < b.value ? -1 : 0;
  }

  sortNumbers(a, b) {
    return a.value - b.value;
  }

  getRidesBelowPrice(maxCost) {
    return this.rideList.map(x => x.cost < maxCost);
  }

  getObjectKey(name) {
    switch (name) {
      case "departure":
        return "from";
      case "destination":
        return "to";
      case "price":
        return "cost";
      default:
        throw "Invalid name";
    }
  }
}
