import { RidesView } from '/rides.view.js';

export function RidesViewFactory (userType, tableRef) {
  
  const view = new RidesView(tableRef);
  Object.assign(
    view, 
    {addListeners: userType === 'admin' ? setAdminListeners : setUserListeners
  })  
  Object.freeze(view);
  console.log('ridesfactory created view', view)
  return view

  function setAdminListeners() {
    const tableFields = document.querySelectorAll('th')
      .forEach(x =>  x
      .addEventListener('click', e => 
      view.emit('headerClick', e))
  )}


  function setUserListeners() {
    return 'i got user listeners'
    /*       const tableFields = document.querySelectorAll('th');
    listener.type = 'click';
    listener.callback */
  }
}

function ListenerProvider (userType) {
  function setAdminListeners() {
    const tableFields = document.querySelectorAll('th')
      .forEach(x =>  x
      .addEventListener('click', e => 
      view.emit('headerClick', e))
  )}


  function setUserListeners() {
    return 'i got user listeners'
    /*       const tableFields = document.querySelectorAll('th');
    listener.type = 'click';
    listener.callback */
  }


  return {
    addListener: userType === 'admin' ? setAdminListeners : setUserListeners
  }

}