import { Node } from "../lib/Node.js"
import { Label } from "../lib/Label.js";
import { Sprite } from "../lib/Sprite.js"


export class Card extends Node {
    constructor(index, value, face) {
        super();
        this._initCard(index, value, face);
        this._initImageCard();
        this._initIndexLabel(index);
        
    }
    _initCard(index, value, face) {
        this.index = index;
        this.value = value;
        this.face = face;
        this.cover = "./img/cardBg.jpg";
        this.width = 100;
        this.height = 100;
        this.x = 370;
        this.y = 200;
        this.opacity = 0;
        this.elm.style.border = "1px solid black";
    }

    _initIndexLabel(index) {
        this.indexLabel = new Label(index, "black", "32px");
        this.indexLabel.x = 35;
        this.indexLabel.y = 35;
        this.addChild(this.indexLabel);
    }

    _initImageCard() {
        this.image = new Sprite(this.cover);
        this.image.width = 100;
        this.image.height = 100;
        this.addChild(this.image);
    }

    showFace() {
        let timeline = gsap.timeline();
        timeline.to(this, {
            duration: 0.25,
            scaleX: 0,
        });
        timeline.set(this.indexLabel, {
            active: false,
        });
        timeline.set(this.image, {
            setImage: this.face
        });
        timeline.to(this, {
            duration: 0.25,
            scaleX: 1,
        });
    }

    showCover() {
        let timeline = gsap.timeline();
        timeline.to(this, {
            duration: 0.25,
            scaleX: 0,
        });
        timeline.set(this.indexLabel, {
            active: true,
        });
        timeline.set(this.image, {
            setImage: this.cover
        });
        timeline.to(this, {
            duration: 0.25,
            scaleX: 1,
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
