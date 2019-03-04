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
    const rideList = this.rideDataService.getRides();
    this.view
      .rebuildTable(rideList)
      .addListeners();
      
    this.view.on('headerClick', e => this.onClickTableField(e)
      //console.log('Controller catch',e)
    )
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
    }
    catch(e) {
      console.log(e)
    }
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
    let data = this.rideDataService.getRides();
    data = data.map(x => { 
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
