import { Sprite } from "../lib/Sprite.js"


export class Card extends Sprite {
    constructor(index, value, face) {
        super();
        this._initCard(index, value, face);
        this.elm.style.border = "1px solid black";
        this.isAnimating = false;
    }

    _initCard(index, value, face) {
        this.index = index;
        this.value = value;
        this.face = face;
        this.cover = "./img/cardBg.jpg";
        this.width = 100;
        this.height = 100;
        this.x = 20;
        this.y = 200;
        this.setImage(this.cover);
    }

    showFace() {
        let timeline = gsap.timeline();
        timeline.to(this, {
            duration: 0.25,
            scaleX: 0,
            isAnimating: true,
        });
        timeline.set(this, {
            setImage: this.face
        });
        timeline.to(this, {
            duration: 0.25,
            scaleX: 1,
            isAnimating: false,
        });
    }

    showCover() {
        let timeline = gsap.timeline();
        timeline.to(this, {
            duration: 0.25,
            scaleX: 0,
            isAnimating: true,
        });
        timeline.set(this, {
            setImage: this.cover
        });
        timeline.to(this, {
            duration: 0.25,
            scaleX: 1,
            isAnimating: false,
        });
    }
    hideCard() {
        let timeline = gsap.timeline();
        timeline.set(this, {
            zIndex: 1,
            delay: 0.2
        });
        timeline.to(this, {
            duration: 0.5,
            opacity: 0,
            scale: 3,
            active: false
        });
    }
}
