import { EventEmitter } from '/event-emitter.js';

 export class RidesView extends EventEmitter { 

   constructor (hostElement) {
     super();
     this.tableElement = hostElement;
   }

  rebuildTable (rideList) {
    this.emptyTable();
    for(let ride of rideList) {
      const row = this.addRow();
      let values = Object.values(ride);
      values.shift(); //remove the first field. Id is not displayed in the template
      const cells = values
        .map(this.addCell)
        .forEach(x => row.appendChild(x));
      
        this.tableElement.appendChild(row);
    }
    return this
  }

  emptyTable () {
    while(this.tableElement.firstChild) {
       this.tableElement.removeChild(this.tableElement.firstChild)
    }
    return this.tableElement
  }
    
  addCell (value) {
    const cell = document.createElement('td');
    cell.innerHTML = value;
    return cell
  }
    
  addRow () { 
    return document.createElement('tr') 
  }

  changeRowsOrder (order) {
    const rideSection = document.querySelectorAll('#rides tr');
    order.forEach((pos,i) =>  rideSection[pos].style.order = i)
  }

   
}