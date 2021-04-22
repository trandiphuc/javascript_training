import {Game} from "./modules/Game.js";
import {Button} from "./lib/Button.js";
var game = new Game();
document.body.appendChild(game.elm);

game.initBackground();
game.initPlayButton();

