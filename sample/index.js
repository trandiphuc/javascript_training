import {Game} from "./modules/Game.js";

var game = new Game();
var btn = document.createElement("button");
btn.textContent = "Play Again";
btn.style.position = "absolute";
btn.style.top = "100px";
btn.onclick = function() {
    location.reload();
    game.init()};
document.body.appendChild(game.elm);
document.body.appendChild(btn);
game.init();
