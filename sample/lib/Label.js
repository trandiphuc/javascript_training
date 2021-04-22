import { Node } from "../lib/Node.js";
export class Label extends Node {
    constructor(text, color, fontSize) {
        super();
        this._text = "";
        this._color = "";
        this._fontSize = "";
        this.fontStyle = [];
        this.elm.style.font = "bold 20px arial,serif";
        if(text) this.text = text;
        if(color) this.color = color;
        if(fontSize) this.fontSize = fontSize;
    }
    get text() {
        return this._text;
    }

    set text(stringValue) {
        this._text = stringValue;
        this.elm.innerHTML = this._text;
    }

    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        this.elm.style.color = this._color;
    }

    get fontSize() {
        return this._color;
    }
    set fontSize(value) {
        this._fontSize = value;
        this.elm.style.fontSize = this._fontSize;
    }
}