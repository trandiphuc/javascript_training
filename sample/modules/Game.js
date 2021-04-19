import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";
import { Label } from "../lib/Label.js";
import { Card } from "../modules/Card.js";
export class Game extends Node {
    init() {
        this._initBackground();
        this._initScoreText()
        this._initCards();
        this.countClick = 0;
        this.firstCard = null;
        this.secondCard = null;
    }

    get score() {
        return this._score;
    }

    set score(points) {
        this._score = points;
    }

    _initBackground() {
        let background = new Sprite("./img/trucxanh_bg.jpg");
        this.addChild(background);
    }
    _initScoreText() {
        this._score = 1000;
        this.scoreText = new Label("Score: " + this._score, "blue", "40px");
        this.addChild(this.scoreText);
    }
    _initCards() {
        let cardsArray = [];
        for (let i = 0; i < 10; i++) {
            let card = {
                name: i,
                img: "./img/trucxanh" + (i + 1) + ".jpg"
            }
            cardsArray.push(card);
        }
        const shuffleCards = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
        this.createBoard(shuffleCards);
    }

    createBoard(array) {
        array.forEach((arr, index) => {
            let card = new Card(index, arr.name);
            card.face = arr.img;
            let column = index % 5;
            let row = Math.floor(index / 5);
            const SIZE_IMG = 100;
            let left = 150 + (SIZE_IMG * column);
            let top = 25 + (SIZE_IMG * row);
            card.x = left;
            card.y = top;
            this.addChild(card);
            card.on("mousedown", this.onClickCard.bind(this));
        });
    }

    onClickCard(evt) {
        this.countClick++;
        if (this.countClick === 1) {
            let card = evt.target.node;
            this.firstCard = card;
            this.firstCard.showFace();
        } else if (this.countClick === 2) {
            let card = evt.target.node;
            this.secondCard = card;
            this.secondCard.showFace();
            setTimeout(this.checkForMatch.bind(this), 500);
        } else if (this.countClick > 2) return;
    }

    checkForMatch() {
        if (this.firstCard.value === this.secondCard.value) {
            this.firstCard.active = false;
            this.secondCard.active = false;
            this.updateScore(200);
        } else {
            this.firstCard.showCover();
            this.secondCard.showCover();
            this.updateScore(-100);
        }
        this.countClick = 0;
        this.firstCard = null;
        this.secondCard = null;
    }

    updateScore(points) {
        this._score += points;
        this.scoreText.text = ("Score: " + this._score);
        if (this._score <= 0) {
            alert('You lose');
        }
    }
}