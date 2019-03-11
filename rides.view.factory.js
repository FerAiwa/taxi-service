import { RidesView } from "./rides.view.js";
import { Table } from "./table.js";

/** Factory function. Instanciates a new ride view and extends it attaching buttons, eventListeners & custom event emitters based on the configuration object.
 * @param {Object} config             - Contains info about what the factory should attach to the view.
 * @param {boolean} config.sliders    - Attach slider to the ride view.
 * @param {boolean[]} config.buttons  -  Add button name
 * @param {HTMLTableElement} tableRef - The DOM element that will host the table data.
 */
export function RidesViewFactory(
  config = { sliders, buttons: { buy, edit, create, erase } },
  tableRef
) {
  const table = new Table(tableRef);
  const view = new RidesView(table);
  Object.assign(table, {
    addButtons,
    addTableHeaderListeners,
    addSliderListeners
  });
  Object.freeze(view);

  //TABLE BUTTONS -----------------------------------------------------------------------------------------------
  const DEFAULTEVENTNAME = "BtnClick";
  const btnNames = Object.keys(config.buttons).filter(
    name => config.buttons[name]
  );

  /** Appends buttons to the view
   * @param {HTMLElement=}  target [optional] Where to attach the created
   * */
  function addButtons(target) {
    const lastCellxRow = document.querySelectorAll("tbody tr td:last-child");
    lastCellxRow.forEach(cell =>
      getButtons().forEach(btn => cell.appendChild(btn))
    );
  }

  /** Creates one button, attach a click listener and a custom event emitter that will be handled by the controller.
   * @return {HTMLButtonElement[]}
   */
  function getButtons() {
    return btnNames.map(createButton).map(btn => addBtnEmitter(btn));
  }

  /**
   * @param {string} btnClass
   */
  function createButton(btnClass) {
    const newBtn = document.createElement("button");
    if (btnClass) {
      newBtn.name = btnClass;
      newBtn.classList.add(btnClass);
    }
    return newBtn;
  }

  /**Adds a click event listener  and a custom event emitter.
   * @param {HTMLButtonElement} btn
   * @param {string=} customEventName
   */
  function addBtnEmitter(btn, customEventName) {
    customEventName = customEventName || btn.name + DEFAULTEVENTNAME;
    btn.addEventListener("click", e => view.emit(customEventName, e));
    return btn;
  }

  /**
   * Adds click event listener to the table headers, that will trigger 'headerClick' custom events.
   */
  function addTableHeaderListeners() {
    const tableFields = document
      .querySelectorAll("th")
      .forEach(x =>
        x.addEventListener("click", e => view.emit("headerClick", e))
      );
    return view;
  }
  /**
   * Adds input & change even listeners to a input type slider, that will trigger 'sliderChange' and 'sliderRelease' custom events.
   */
  function addSliderListeners() {
    const slider = document.querySelector(`input[type="range"]`);
    slider.addEventListener("input", e =>
      view.emit("sliderChange", e.target.value)
    );
    slider.addEventListener("change", e =>
      view.emit("sliderRelease", e.target.value)
    );
    return view;
  }

  return view;
}
