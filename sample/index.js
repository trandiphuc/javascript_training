import {Game} from "./modules/Game.js";

var game = new Game();
document.body.appendChild(game.elm);

game.initBackground();
game.initPlayButton();

