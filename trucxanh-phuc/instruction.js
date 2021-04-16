let cardsArray = [
    { name: "peach", img: "./img/trucxanh0.jpg" },
    { name: "peach", img: "./img/trucxanh0.jpg" },
    { name: "grape", img: "./img/trucxanh1.jpg" },
    { name: "grape", img: "./img/trucxanh1.jpg" },
    { name: "apple", img: "./img/trucxanh2.jpg" },
    { name: "apple", img: "./img/trucxanh2.jpg" },
    { name: "lemon", img: "./img/trucxanh3.jpg" },
    { name: "lemon", img: "./img/trucxanh3.jpg" },
    { name: "fig", img: "./img/trucxanh4.jpg" },
    { name: "fig", img: "./img/trucxanh4.jpg" },
    { name: "orange", img: "./img/trucxanh5.jpg" },
    { name: "orange", img: "./img/trucxanh5.jpg" },
    { name: "kiwi", img: "./img/trucxanh6.jpg" },
    { name: "kiwi", img: "./img/trucxanh6.jpg" },
    { name: "mango", img: "./img/trucxanh7.jpg" },
    { name: "mango", img: "./img/trucxanh7.jpg" },
    { name: "lime", img: "./img/trucxanh8.jpg" },
    { name: "lime", img: "./img/trucxanh8.jpg" },
    { name: "melon", img: "./img/trucxanh9.jpg" },
    { name: "melon", img: "./img/trucxanh9.jpg" },
]
let imgs = [];
let cardsSelected = [];
let cardsId = [];
let cardWin = 10;
let cardCurrent = 0;
let score = 1000;

const game = document.createElement("div");
document.body.appendChild(game);
game.style.position = "relative";

const scoreText = document.createElement("div");
scoreText.innerHTML = "Score: " + score;
game.appendChild(scoreText);

const buttonPlayAgain = document.createElement("button");
buttonPlayAgain.textContent = "Play Again";
buttonPlayAgain.onclick = function () {

};

game.appendChild(buttonPlayAgain);
const bg = document.createElement("div");
const bg_pic = document.createElement("img");
bg_pic.src = "./img/trucxanh_bg.jpg";
bg.appendChild(bg_pic);
game.appendChild(bg);

createBoard(cardsArray);
shuffleCards();
imgs = document.querySelectorAll(".clickImg");
Array.from(imgs).forEach(img => {
    img.addEventListener("click", flipCard)
});

function createBoard(array) {
    array.forEach((arr, index) => {
        const topBoard = 50;
        const leftBoard = 120;
        const widthImage = 100;
        const heightImage = 100;
        let col = index % 5;
        let row = Math.floor(index / 5);
        let img = createImage("./img/cover.jpg", topBoard + (heightImage * row), leftBoard + (widthImage * col), widthImage, heightImage);
        img.setAttribute("data-id", index);
    })
}

function createImage(src, top, left, width, height) {
    const image = document.createElement("img");
    image.src = src;
    image.className = "clickImg";
    image.style.position = "absolute";
    width && (image.style.width = width + "px");
    height && (image.style.height = height + "px");
    image.style.top = top + "px";
    image.style.left = left + "px";
    game.appendChild(image);
    image.addEventListener("click", flipCard)
    return image;
}


function shuffleCards() {
    cardsArray.sort(() => 0.5 - Math.random());
}

function flipCard() {
    let selected = this.dataset.id;
    cardsSelected.push(cardsArray[selected].name);
    cardsId.push(selected);
    this.classList.add("flip");
    this.setAttribute("src", cardsArray[selected].img);
    if (cardsId.length === 2) {
        game.style.pointerEvents = "none";
        setTimeout(checkForMatch, 500);
    }
}
function checkForMatch() {
    let firstCard = cardsId[0];
    let secondCard = cardsId[1];
    if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
        imgs[firstCard].style.display = "none";
        imgs[secondCard].style.display = "none";
        cardCurrent++;
        updateScore(200);
        checkWin();
    }
    else {
        imgs[firstCard].classList.remove("flip");
        imgs[firstCard].setAttribute("src", "./img/cover.jpg");
        imgs[secondCard].classList.remove("flip");
        imgs[secondCard].setAttribute("src", "./img/cover.jpg");
        updateScore(-50)
        checkLose();
    }
    cardsId = [];
    cardsSelected = [];
    game.style.pointerEvents = "auto";
}

function updateScore(points) {
    score += points;
    scoreText.innerHTML = "Score: " + score;
}

function checkWin() {
    if (cardCurrent === cardWin) alert("Win");
}

function checkLose() {
    if (score === 0) alert("Lose");
}