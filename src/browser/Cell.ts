
class Cell {
  id: string;
  value: string = "";
  constructor(id: string, value: string = "") {
    this.id = id;
    this.value = value;
  }

  getHTMLElement = (): HTMLElement => {
    var cell = document.createElement("div");
    cell.className = "cell";
    cell.id = this.id;
    var input = document.createElement("input");
    input.value = this.value;
    cell.appendChild(input);
    return cell;
  }

}

export default Cell;