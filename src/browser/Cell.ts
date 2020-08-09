
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
    input.addEventListener("keydown", this.onKeyDown);
    input.addEventListener("focus", this.onFocus);
    input.addEventListener("blur", this.onBlur);
    input.value = this.evaluate();
    cell.appendChild(input);
    return cell;
  }

  onFocus = (e: any) => {
    e.target.value = this.value;
    e.target.setSelectionRange(0, this.value.length);
  }

  onKeyDown = (e: any) => {
    const val = e.target.value;
    if(e.keyCode === 13) { // enter
      this.value = val;
      e.target.blur();
    } else if(e.keyCode === 27) { // escape
      e.target.value = this.value;
      e.target.blur();
    } else if(e.which === 9) { // tab (moves focus to next cell)
      e.preventDefault();
      e.stopPropagation();
      (<HTMLElement>document.getElementById(this.id)?.nextElementSibling?.firstChild).focus()
    }
  }

  onBlur = (e: any) => {
    e.target.value = this.evaluate();
  }


  evaluate = () : string => {
    if(this.value.trim()[0] === "=") {
      let expression = this.value.replace("=","");
      return eval(expression);
    }
    return this.value;
  }

}

export default Cell;