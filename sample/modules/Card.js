import { Sprite } from "../lib/Sprite.js"

export class Card extends Sprite {
    constructor(index, value, face) {
        super();
        this._initScaleCard();
        this._initCard(index, value, face);
    }

    _initScaleCard() {
        this.width = 100;
        this.height = 100;
    }

    _initCard(index, value, face) {
        this.index = index;
        this.value = value;
        this.cover = "./img/cardBg.jpg";
        this.face = face;
        this.path = this.cover;
    }

    _initElement() {
        super._initElement();
    }

    showFace() {
        let timeline = gsap.timeline();
        timeline.to(this, {duration: 0.2, scaleX: 0});
        timeline.set(this, {setImage: this.face});
        timeline.to(this, {duration: 0.2, scaleX: 1});
    }

    showCover() {
        let timeline = gsap.timeline();
        timeline.to(this, {duration: 0.2, scaleX: 0});
        timeline.set(this, {setImage: this.cover});
        timeline.to(this, {duration: 0.2, scaleX: 1});
    }
    hideCard() {
        let timeline = gsap.timeline();
        timeline.set(this, {zIndex: 1, delay: 0.2});
        timeline.to(this, {duration: 0.5, opacity: 0, scale: 3, active: false});
        
    }
}
