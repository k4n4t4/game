import Scene from "./../libs/scene.js";


export default class Main extends Scene {
  constructor(game, _config={}) {
    super(game, {
      name: "main",
      layerNum: 1,
    });
  }

  init() {
    super.init();
    this.player = {
      x: 0,
      y: 0,
    }
  }

  load() {
    const promises = [
      this.assets.loadImg("player", "./game/assets/main/player.png"),
      this.assets.loadImg("tile", "./game/assets/main/tile.png"),
    ];

    return super.load(promises);
  }

  update() {
    const game = this.game;
    const key = game.key;
    const player = this.player;

    if (key.down("ArrowRight")) {
      player.x++;
    }
    if (key.down("ArrowLeft")) {
      player.x--;
    }
    if (key.down("ArrowUp")) {
      player.y--;
    }
    if (key.down("ArrowDown")) {
      player.y++;
    }

    if (key.down("q")) {
      game.event.emit("scene", "title");
    }
  }

  draw() {
    const game = this.game;
    const ctx = this.layer[0].context;

    const player = this.player;

    ctx.fillStyle = "#4060A0";
    ctx.fillRect(0, 0, game.width, game.height);

    ctx.drawImage(
      this.assets.images.player,
      0, 0, 16, 16,
      player.x, player.y, 16, 16
    );

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 16; j++) {
        ctx.drawImage(
          this.assets.images.tile,
          0, 0, 16, 16,
          16 * j, 16 * 11 - 16 * i, 16, 16
        );
      }
    }

    super.draw();
  }
}
