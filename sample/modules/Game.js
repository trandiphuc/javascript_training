import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";
import { Label } from "../lib/Label.js";
import { Card } from "../modules/Card.js";
import { Button } from "../lib/Button.js";

export class Game extends Node {
    initNewGame() {
        this.countClick = 0;
        this.pairRemain = 10;
        this.firstCard = null;
        this.secondCard = null;
        this.freezeClick = false;
        this.score = 1000;
        this.timeline = gsap.timeline();
        this._initBoard();
        this._initCards();
        this._initScoreText();
        this.elm.addEventListener("mousedown", e => {
            if (this.freezeClick) {
                e.stopPropagation();
                e.preventDefault();
            }
        }, true); 
    }

    initPlayButton() {
        let btn = new Button("PLAY", "black", "56px");
        btn.x = 300;
        btn.y = 200;
        btn.elm.style.background = "transparent";
        btn.on("click", () => {
            this.resetGame();
            this.initBackground();
            this.initNewGame();
        });
        this.addChild(btn);
    }

    initBackground() {
        let background = new Sprite("./img/trucxanh_bg.jpg");
        this.addChild(background);
    }

    _initScoreText() {
        this.scoreText = new Label("Score: " + this.score, "red", "32px");
        this.scoreText.x = 32;
        this.scoreText.y = 32;
        this.addChild(this.scoreText);
    }
    _initBoard() {
        this.board = new Node();
        this.addChild(this.board);
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
        this.freezeClick = true;
        this.createBoard(shuffleCards);
        setTimeout(() => {
            this.freezeClick = false;
        }, 4000);
    }

    createBoard(array) {
        array.forEach((arr, index) => {
            let card = new Card(index, arr.name, arr.img);
            let column = index % 5;
            let row = Math.floor(index / 5);
            let widthStep = 110;
            let heightStep = 110;
            let left = 150;
            let top = 25;
            let x = left + (widthStep * column);
            let y = top + (heightStep * row);
            this.board.addChild(card);
            this.timeline.to(card, {
                duration: 0.2,
                x: x,
                y: y,
                ease: "back",
                onComplete: () => card.on("mousedown", this.onClickCard.bind(this))
            });
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
            if (card === this.firstCard) {
                this.countClick--;
                return;
            }
            this.secondCard = card;
            this.secondCard.showFace();
            this.freezeClick = true;
            setTimeout(this.checkForMatch.bind(this), 1000);
        } else if (this.countClick > 2) return;
    }

    checkForMatch() {
        if (this.firstCard.value === this.secondCard.value) {
            this.firstCard.hideCard();
            this.secondCard.hideCard();
            this.pairRemain--;
            this.updateScore(200);
        } else {
            this.firstCard.showCover();
            this.secondCard.showCover();
            this.updateScore(-100);
        }
        setTimeout(() => {
            this.countClick = 0;
            this.firstCard = null;
            this.secondCard = null;
            this.freezeClick = false;
        }, 700);

    }

    updateScore(points) {
        this.score += points;
        this.scoreText.text = ("Score: " + this.score);
        if (this.score <= 0) {
            this.showGameOverText("YOU LOSE");
            this.endGame();
        }
        if (this.pairRemain <= 0) {
            this.showGameOverText("YOU WIN");
            this.endGame();
        }
    }

    endGame() {
        while (this.board != null && this.board.elm.hasChildNodes()) {
            this.board.elm.removeChild(this.board.elm.lastChild);
        }
        this.initPlayButton();
    }
    resetGame() {
        while (this != null && this.elm.hasChildNodes()) {
            this.elm.removeChild(this.elm.lastChild);
        }
    }
    showGameOverText(value) {
        this.gameOverText = new Label();
        this.gameOverText.x = 200;
        this.gameOverText.y = 100;
        this.gameOverText.width = 440;
        this.gameOverText.height = 200;
        this.gameOverText.fontSize = "80px";
        this.gameOverText.color = "blue";
        this.gameOverText.text = value;
        this.addChild(this.gameOverText);
    }
}