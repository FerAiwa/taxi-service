import { EventEmitter } from "./event-emitter.js";
import { Table } from "./table.js";
/**
 * Displays the Table and the Slider components instances.
 * Contains the basic code to display the data sent by the controller.
 * Emits the events attached in the view factory.
 */
export class RidesView extends EventEmitter {
  /**
   *
   * @param {Table} table
   */
  constructor(table) {
    super();
    this.table = table;
    //slider
  }

  /** Iterates over the rows and replaces the ride.scale boolean value with a fancy indicator image  */
  setSpecialGlyphs() {
    const scaleCells = document.querySelectorAll("tbody > tr td:last-child");
    for (let cell of scaleCells) {
      cell.innerHTML.includes("true")
        ? cell.removeChild(cell.firstChild) &&
          cell.insertAdjacentHTML("afterbegin", this.getScaleGlyph())
        : cell.removeChild(cell.firstChild);
    }
  }
  /** Returns stringified figure>image elements that will replace the ride.scale value */
  getScaleGlyph() {
    return `<figure class="table-glyph"><img src="images/taxistop.png" alt="Ride has one or more stops"></figure>`;
  }

  //Slider ------------------------------------------------------------------------------------
  /** Sets the slider (input range) min and max property values.
   *  @param {number} min  @param {number} max
   **/
  setSliderValues(min, max) {
    const slider = document.querySelector(`input[type="range"]`);
    console.log(min, max);
    slider.min = min;
    slider.max = max;
    this.updateSliderHelper(slider.value);
  }
  /** Updates the cost value shown next to the slider.
   * @param {number|string} value
   */
  updateSliderHelper(value) {
    const sliderHelper = document.querySelector("fieldset label");
    sliderHelper.textContent = value + "€";
  }
}
