import { RidesView } from "./rides.view.js";
import { Table } from "./table.js";

/** Factory that generates a new rides view and attach diferent eventListeners depending on user configuration object.
 *
 * @param  {} config {sliders: boolean, buttons: {buy: boolean, edit: boolean,create: boolean, erase: boolean}
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

  function addButtons(target) {
    const lastCellxRow = document.querySelectorAll("tbody tr td:last-child");
    lastCellxRow.forEach(cell =>
      getButtons().forEach(btn => cell.appendChild(btn))
    );
  }

  function getButtons() {
    return btnNames.map(createButton).map(btn => addBtnEmitter(btn));
  }

  function createButton(btnClass) {
    const newBtn = document.createElement("button");
    if (btnClass) {
      newBtn.name = btnClass;
      newBtn.classList.add(btnClass);
    }
    return newBtn;
  }

  function addBtnEmitter(btn, customEventName) {
    customEventName = customEventName || btn.name + DEFAULTEVENTNAME;
    btn.addEventListener("click", e => view.emit(customEventName, e));
    return btn;
  }

  function addTableHeaderListeners() {
    const tableFields = document
      .querySelectorAll("th")
      .forEach(x =>
        x.addEventListener("click", e => view.emit("headerClick", e))
      );
    return view;
  }

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
