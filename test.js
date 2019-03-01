rides = [
  { id: 0, to: "A Coruña", from: "Santiago", cost: 60, scale: false },
  { id: 1, to: "New York", from: "New Yersey", cost: 120, scale: false },
  { id: 2, to: "Valencia", from: "Madrid", cost: 300, scale: true },
  { id: 3, to: "O Porto", from: "Guimaraes", cost: 50, scale: false },
  { id: 4, to: "Roma", from: "Milan", cost: 300, scale: false },
  { id: 5, to: "London", from: "Manchester", cost: 200, scale: false }
];

//Service (Model)
function sortBy (property, descending = true) {
  const data = rides.map(x => { 
    return {id: x.id, value: x[property]}  
  });
  const type =  Number(data[0].value) ? sortNumbers : sortString;
  const newOrder = data.sort(type).map(x => x.id);
  return descending ?  newOrder :  newOrder.reverse();
}

function sortString(a,b) {
  return a.value > b.value ? 1 :  a.value < b.value ? -1 :  0
}
function sortNumbers(a,b) {
  return a.value -b.value 
}


function getRidebyId (id) { return this.rides.find(x => x.id === id) }

//Controller -> Vista management
function changeRowOrder (newOrder) {
  const rideSection = document.querySelectorAll('#rides tr');
  newOrder.forEach((pos,i) => {
    rideSection[pos].style.order = i;
  })
}

//start
function setRideTable (rideList) {
  const rideTable = document.getElementById('rides');

  for(let ride of rideList) {
    const row = addRow();
    let values = Object.values(ride);
    values.shift(); //remove the first field. Id is not displayed in the template
    cells = values.map(addCell)
    .forEach(cell => row.appendChild(cell));

    rideTable.appendChild(row);
  }
}
//can be used by admin too
function addCell (value) {
  const cell = document.createElement('td');
  cell.innerHTML = value;
  return cell
}

function addRow () { 
  return document.createElement('tr') 
}


function hasRidesProperty (name) { 
  return rides[0][name] 
}