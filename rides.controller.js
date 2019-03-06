/** BUSINESS LOGIC
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
export class RidesController {

  constructor(view, rideDataService, 
    options = {activeFilter: '', sortDescending: true}) {
      this.view = view;
      this.rideDataService = rideDataService;
      this.activeFilter = options.activeFilter;
      this.descendOrderFlag = options.sortDescending;
  }

  initialize() {
    this.rideList = this.rideDataService.getRides()

    //Table set
    this.view
      .rebuildTable(this.rideList)
      .addListeners();      
    this.view.on('headerClick', e => this.onClickTableField(e))

    //Slider Set
    let costList = this.rideList.map(x => x.cost);
    this.view.setSliderValues(Math.min(...costList), Math.max(...costList));
    this.view.on('sliderChange', value => this.view.updateSliderHelper(value))
    this.view.on('sliderRelease', value => {
      const ridesInCostRange = this.getRidesBelowPrice(value);
      this.view.setRowsVisibility(ridesInCostRange);
    })
  }
  
  onClickTableField (event) {
    const fieldName = event.target.innerHTML.toLowerCase();
    console.log(this.activeFilter, this.descendOrderFlag)
    try {
      const key = this.getObjectKey(fieldName);
      this.activeFilter = key;
      this.descendOrderFlag = !this.descendOrderFlag;

      const newOrder = this.sortBy(key, this.descendOrderFlag);
      this.view.changeRowsOrder(newOrder);

      event.target.classList.toggle('activeFilter')
    }
    catch(e) {
      console.log(e)
    }
  }

 

  getRidesBelowPrice (maxCost) {
    return this.rideList.map(x => x.cost < maxCost);
  }


  filter (property, maxValue) {
    //minvalue
    //maxvalue
    //average
  }
  
  getObjectKey (name) {
    switch(name) {
      case 'departure'    : return 'from';
      case 'destination'  : return 'to';
      case 'price'        : return 'cost';
      default             : throw 'Invalid name';
    }
  }
  
  sortBy (property, descending = true) {
    const data = this.rideList.map(x => { 
      return {id: x.id, value: x[property]}  
    });
  
    const type =  Number(data[0].value) ? this.sortNumbers : this.sortString;
    const newOrder = data.sort(type).map(x => x.id);
    return descending ?  newOrder :  newOrder.reverse();
  }
  
  sortString(a,b) {
    return a.value > b.value ? 1 :  a.value < b.value ? -1 :  0
  }
  
  sortNumbers(a,b) {
    return a.value -b.value 
  }
  
}
