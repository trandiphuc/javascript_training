import {Label} from "./Label.js";

export class Button extends Label {
    constructor(text, color, fontsize) {
        super(text, color, fontsize);
    }
    _initElement() {
        this.elm = document.createElement("button");
        this.elm.node = this;
        this.elm.style.position = "absolute";
    }
}
