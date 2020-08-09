
class Cell {
  id: string;
  value: string = "";
  getCellValue: any = null;
  classNames = ["cell"];
  column: string = "";
  row: number = 0;
  constructor(id: string, value: string = "", getCellValue: any) {
    this.id = id;
    this.value = value;
    this.getCellValue = getCellValue;
  }

  getHTMLElement = (): HTMLElement => {
    var cell = document.createElement("div");
    cell.className = this.classNames.join(" ");
    cell.setAttribute("data-row",this.row.toString());
    cell.setAttribute("data-column",this.column.toString().toUpperCase());
    cell.id = this.id;
    var input = document.createElement("input");
    input.addEventListener("keydown", this.onKeyDown);
    input.addEventListener("focus", this.onFocus);
    input.addEventListener("blur", this.onBlur);
    input.value = this.evaluate();
    cell.appendChild(input);
    return cell;
  }

  onFocus = (e: FocusEvent) => {
    const target = <HTMLInputElement> e.target;
    target.value = this.value;
    target.setSelectionRange(0, this.value.length);
  }

  onKeyDown = (e: KeyboardEvent) => {
    const target = <HTMLInputElement> e.target;
    const val = target.value;
    if(e.keyCode === 13) { // enter
      this.value = val;
      target.blur();
    } else if(e.keyCode === 27) { // escape
      target.value = this.value;
      target.blur();
    } else if(e.which === 9) { // tab (moves focus to next cell)
      e.preventDefault();
      e.stopPropagation();
      (<HTMLElement>document.getElementById(this.id)?.nextElementSibling?.firstChild).focus()
    }
  }

  onBlur = (e: FocusEvent) => {
    const target = <HTMLInputElement> e.target;
    target.value = this.evaluate();
  }


  evaluate = () : string => {
    if(this.value.trim()[0] === "=") {
      let expression = this.value.replace("=","");
      
      // Cell reference support
      var cvars = expression.match(/([a-z]+[0-9]+)(?=[\s\*\+\-\/\%]|$)/gi);
      if(cvars != null) {
        for(let k = 0; k < cvars.length; k++) {
          const val = this.getCellValue(cvars[k]);
          expression = expression.replace(new RegExp(cvars[k],"gi"),val);
        }
      }

      return eval(expression);
    }
    return this.value;
  }

  setTop = (val: string) => {
    this.classNames.push("top");
    this.column = val;
  }
  setSide = (val: number) => {
    this.classNames.push("side");
    this.row = val;
  }

}

export default Cell;