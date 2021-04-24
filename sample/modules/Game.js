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
        this.timeline1 = gsap.timeline();
        this._initBoard();
        this._initCards();
        this._initScoreText();
        this.initPlayButton("RESET", 20, 200, "24px")
        this.elm.addEventListener("mousedown", e => {
            if (this.freezeClick) {
                e.stopPropagation();
                e.preventDefault();
            }
        }, true); 
    }

    initPlayButton(text, x, y, fontsize) {
        let btn = new Button(text, "black", fontsize);
        btn.x = x;
        btn.y = y;
        btn.elm.style.background = "transparent";
        btn.on("click", () => {
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
        let cardsArray = [];
        for (let i = 1; i < 11; i++) {
            let card = {
                name: i,
                img: "./img/trucxanh" + i + ".jpg"
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
            let card = new Card((index + 1), arr.name, arr.img);
            card.zIndex = 20 - index;
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
                duration: 0.05,
                opacity: 1,
            })
            this.timeline.to(card, {
                duration: 0.05,
                opacity: 0,
                onComplete: function() {
                    this.timeline1.to(card, {
                        duration: 0.1,
                        opacity:1,
                    })
                    this.timeline1.to(card, {
                        duration: 0.2,
                        x: x,
                        y: y,
                        zIndex: 0,
                        ease: "back",
                        delay: 1
                    })
                }.bind(this)
            })
        });
    }
    onClickCard(evt) {
        this.countClick++;
        if (this.countClick === 1) {
            this.firstCard = evt.target.parentNode.node;
            this.firstCard.showFace();
        } else if (this.countClick === 2) {
            let card = evt.target.parentNode.node;
            if (card.index === this.firstCard.index) {
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
        let score = this.score + points;
        let obj = {
            value: this.score
        }
        TweenLite.to(obj, 0.4, {
            value: score,
            roundProps: {
                value: 10
            },
            onUpdate: function() {
                this.scoreText.text = `Score: ${obj.value}`;
                this.score = obj.value;
            }.bind(this),
            onComplete: function() {
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
        this.initPlayButton("PLAY AGAIN", 300, 200), "56px";
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