/**
 * Table component with some shortcuts to setup the tbody content and properties.
 */
export class Table {
  constructor(hostElement, items, headers) {
    this.hostElement = hostElement;
    this.items = items || [];
    this.headers = headers || [];
    console.log(this.hostElement);
    this.items && this.clear() && this.build();
  }

  setItems(items) {
    this.items = items;
    return this;
  }

  build() {
    for (let item of this.items) {
      const row = this.addRow();
      let values = Object.values(item);
      const cells = values.map(this.addCell).forEach(x => row.appendChild(x));
      this.hostElement.appendChild(row);
    }
    return this;
  }

  clear() {
    while (this.hostElement.firstChild)
      this.hostElement.removeChild(this.hostElement.firstChild);
    return this;
  }

  addCell(value) {
    const cell = document.createElement("td");
    cell.innerHTML = value;
    return cell;
  }

  addRow() {
    return document.createElement("tr");
  }

  getRowNode() {
    return this.hostElement.querySelectorAll("tr");
  }

  /** Iterates over the table tbody rows, setting up a property.
   * @param  {string} name    Name of the attribute to be set, or created in format data-name.
   * @param  {any[]}  values  Array holding the property value for each row.
   */
  setRowsAttribute(name, values) {
    const rowNode = this.hostElement.querySelectorAll("tr");
    rowNode.forEach((row, i) => row.setAttribute(name, values[i]));
    return this;
  }

  //CSS Order & Display
  setRowsVisibility(visibleList) {
    this.getRowNode().forEach((row, i) =>
      this.setRowVisibility(row, visibleList[i])
    );
  }

  setRowVisibility(row, hideFlag) {
    row.style.display = hideFlag ? "none" : "flex";
  }

  changeRowsOrder(order) {
    const rowNode = this.getRowNode();
    order.forEach((num, i) => (rowNode[num].style.order = i));

    /* order.forEach((pos, i) => (rowNode[pos].style.order = i)); */
  }
}
