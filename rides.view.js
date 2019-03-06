import { EventEmitter } from '/event-emitter.js';
export class RidesView extends EventEmitter { 

   constructor (hostElement) {
     super();
     this.tableElement = hostElement;
   }

  //Table Builder ---------------------------------------------------------------------------------
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
    this.setSpecialGlyphs()

    return this
  }

  setSpecialGlyphs () {
    const rideScales = document.querySelectorAll('tbody > tr td:last-child');

    for(let rideScale of rideScales) {
      switch(rideScale.innerHTML) {
        case 'true' : rideScale.innerHTML = this.getScaleGlyph(); break;
        case 'false': rideScale.innerHTML = ''; break;
      }
      //TODO: split this dirty!
      rideScale.innerHTML = rideScale.innerHTML.concat('<button>Buy</button>')
    }
  }
  addBuyButton () {

  }

  getScaleGlyph () {
    return `<figure><img src="/images/taxistop.png" alt="Ride has one or more stops"></figure>`
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


  //CSS Order & Display
  setRowsVisibility (visibleList) {
    console.log('seting rows display')
    const rowNode = document.querySelectorAll('#rides tr');
    rowNode.forEach((row,i) => this.setRowVisibility(row, visibleList[i]))
  }

  setRowVisibility (row, hideFlag) {
    row.style.display = hideFlag ? 'none' : 'flex';
  }

  changeRowsOrder (order) {
    const rideSection = document.querySelectorAll('#rides tr');
    order.forEach((pos,i) =>  rideSection[pos].style.order = i)
  }

  //Slider ------------------------------------------------------------------------------------
  setSliderValues (min, max) {
    const slider = document.querySelector(`input[type="range"]`)
    slider.min = min;
    slider.max = max;
    this.updateSliderHelper(slider.value);
  }

  updateSliderHelper (value) {
    const sliderHelper = document.querySelector('fieldset label');
    sliderHelper.textContent = value +'€';
    //sliderHelper.style.left = value + '%';
  }
 
}