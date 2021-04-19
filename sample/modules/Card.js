import { Sprite } from "../lib/Sprite.js"

export class Card extends Sprite {
    constructor(index, value) {
        super();
        this._initScaleCard();
        this._initCard(index, value);
    }

    _initScaleCard() {
        this.width = 100;
        this.height = 100;
    }

    _initCard(index, value) {
        this._index = index;
        this._value = value;
        this._cover = "./img/cardBg.jpg";
        this._face = "";
        this.path = this._cover;
    }

    _initElement() {
        super._initElement();
        this.elm.style.border = "1px solid black";
    }

    showFace() {
        this.path = this._face;
    }

    showCover() {
        this.path = this._cover;
    }

    set face(img) {
        return this._face = img;
    }

    get value () {
        return this._value;
    }

    get index () {
        return this._index;
    }
}
