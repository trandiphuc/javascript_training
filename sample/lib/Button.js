import {Label} from "../lib/Label.js";

export class Button extends Label {
    constructor() {
        super();
    }
    _initElement() {
        this.elm = document.createElement("button");
        this.elm.node = this;
        this.elm.style.position = "absolute";
    }
}
