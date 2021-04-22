import {Game} from "./modules/Game.js";
import {Button} from "./lib/Button.js";

var game = new Game();
var btn = new Button("PLAY", "black", "54px");

btn.zIndex = 99;
btn.x = 300;
btn.y = 200;
btn.elm.style.backgroundColor = "transparent";
document.body.appendChild(btn.elm);
document.body.appendChild(game.elm);
game._initBackground();
game._initScoreText();
btn.on("click", () => {
    game.init();
    btn.active = false;
});


//game.init();
