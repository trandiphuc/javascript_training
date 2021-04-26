import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";
import { Label } from "../lib/Label.js";
import { Card } from "../modules/Card.js";
import { Button } from "../lib/Button.js";
import { Audio } from "../lib/Audio.js";

export class Game extends Node {
    initNewGame() {
        this.countClick = 0;
        this.pairRemain = 10;
        this.firstCard = null;
        this.secondCard = null;
        this.freezeClick = false;
        this.score = 1000;
        let themeSong = new Audio("./audio/theme_song.mp3");
        themeSong.playLoop();
        this.elm.addEventListener("mousedown", e => {
            if (this.freezeClick) {
                e.stopPropagation();
                e.preventDefault();
            }
        }, true);
        this.cardsGame = [];
        this._initBoard();
        this._initCards();
        this._initScoreText();
        this.initPlayButton("RESET", 20, 200, "24px")
    }

    initPlayButton(text, x, y, fontsize) {
        let btn = new Button(text, "black", fontsize);
        btn.x = x;
        btn.y = y;
        btn.elm.style.background = "transparent";
        btn.on("click", () => {
            let clickSound = new Audio("./audio/click.wav");
            clickSound.playOneShot();
            this.clearGame();
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
        this.freezeClick = true;
        let timeline = gsap.timeline();
        let cardsArray = [];
        for (let i = 1; i < 11; i++) {
            let card = {
                name: i,
                img: "./img/trucxanh" + i + ".jpg"
            }
            cardsArray.push(card);
        }

        const shuffleCards = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
        //render card
        shuffleCards.forEach((arr, index) => {
            let card = new Card(index, arr.name, arr.img);
            card.zIndex = 20 - index;
            this.cardsGame.push(card);
            timeline.to(card, {
                duration: 0.05,
                opacity: 1,
                onComplete: () => {
                    let shuffleSound = new Audio("./audio/shuffle.wav");
                    shuffleSound.playOneShot();
                }
            });
            timeline.to(card, {
                duration: 0.05,
                opacity: 0,
            });
            card.on('mousedown', this.onClickCard.bind(this, card.index, card.value));
            this.board.addChild(card);
        })
        //set all image appear
        timeline.set(this.cardsGame, {opacity: 1});
        //draw every card into board
        this.cardsGame.forEach((arr, index) => {
            let column = index % 5;
            let row = Math.floor(index / 5);
            let widthStep = 110;
            let heightStep = 110;
            let left = 150;
            let top = 25;
            let x = left + (widthStep * column);
            let y = top + (heightStep * row);
            timeline.to(arr, {
                duration: 0.3,
                zIndex: 0,
                x: x,
                y: y,
                ease: "back.inOut(2)",
                onComplete: () => {
                    let drawSound = new Audio("./audio/shuffle.wav");
                    drawSound.playOneShot();
                }
            });
        })
        //after complete draw card animation
        timeline.set(this, {
            onComplete: () => {
                this.freezeClick = false;
            }
        })
    }

    onClickCard(index, value) {
        let clickSound = new Audio("./audio/click.wav");
        clickSound.playOneShot();
        this.countClick++;
        console.log(index, value);
        if (this.countClick === 1) {
            this.firstCard = this.cardsGame[index];
            this.firstCard.showFace();
        } else if (this.countClick === 2) {
            if(index === this.firstCard.index){
                this.countClick--;
                return;
            } 
            this.freezeClick = true;
            this.secondCard = this.cardsGame[index];
            this.secondCard.showFace();
            setTimeout(this.checkForMatch.bind(this), 1000);
        } else if (this.countClick >= 2) return;

    }

    checkForMatch() {
        let sound = new Audio();
        if (this.firstCard.value === this.secondCard.value) {
            this.firstCard.hideCard();
            this.secondCard.hideCard();
            this.pairRemain--;
            sound.path = "./audio/bell.wav";
            sound.playOneShot();
            this.updateScore(200);
        } else {
            this.firstCard.showCover();
            this.secondCard.showCover();
            sound.path = "./audio/wrong.wav";
            sound.playOneShot();
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
        let score = this.score + points;
        let obj = {
            value: this.score
        }
        TweenLite.to(obj, 0.4, {
            value: score,
            roundProps: {
                value: 10
            },
            onUpdate: function () {
                this.scoreText.text = `Score: ${obj.value}`;
                this.score = obj.value;
            }.bind(this),
            onComplete: function () {
                if (this.score <= 0) {
                    this.showGameOverText("YOU LOSE");
                    this.endGame();
                }
                if (this.pairRemain <= 0) {
                    this.showGameOverText("YOU WIN");
                    this.endGame();
                }
            }.bind(this)
        });
    }

    endGame() {
        while (this.board != null && this.board.elm.hasChildNodes()) {
            this.board.elm.removeChild(this.board.elm.lastChild);
        }
        this.elm.removeChild(this.elm.querySelector("button"));
        this.initPlayButton("RESTART", 320, 200, "56px");
    }
    clearGame() {
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