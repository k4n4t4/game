import Game from "./game/index.js";

const game = new Game({
  canvas: {
    size: 16 * 16,
    aspect: 4 / 3,
  },
});

game.canvas.addEventListener('click', _ => {
  game.start();
});
