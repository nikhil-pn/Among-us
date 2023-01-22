import Phaser from "phaser";
import { io } from "socket.io-client";

import levelSprits from "./assets/ship.png";
import playerSprite from "./assets/player.png";

import {
  PLAYER_SPRITE_HEIGHT,
  PLAYER_SPRITE_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_START_X,
  PLAYER_START_Y,
} from "./constants";

import { movePlayer, movementAnimation } from "./utlis";

const playerOne = {};
const playerTwo = {};

let socket;
let pressedKeys = [];

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    socket = io("localhost:3000");
    this.load.image("ship", levelSprits);
    this.load.spritesheet("player", playerSprite, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
    this.load.spritesheet("otherplayer", playerSprite, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
    create();
    {
      const ship = this.add.image(0, 0, "ship");
      playerOne.sprite = this.add.sprite(
        PLAYER_START_X,
        PLAYER_START_Y,
        "player"
      );
      playerTwo.sprite = this.add.sprite(
        PLAYER_START_X,
        PLAYER_START_Y,
        "otherPlayer"
      );
      playerOne.sprite.displayHeight = PLAYER_HEIGHT;
      playerTwo.sprite.displayHeight = PLAYER_WIDTH;

      this.anims.create({
        key: "running",
        frames: this.anims.generateFrameNumbers("player"),
        frameRate: 60,
        repeat: -1,
      });

      this.input.keyboard.on("keydown", (e) => {
        if (!pressedKeys.includes(e.code)) {
          pressedKeys.push(e.code);
        }
      });
    }
    this.input.keyboard.on("keyup", (e) => {
      pressedKeys = pressedKeys.filter((key) => {
        key !== e.code;
      });
    });

    socket.on("move", ({ x, y }) => {
      if (playerTwo.sprite.x > x) {
        playerTwo.sprite.flipX = true;
      } else if (playerTwo.sprite.x < x) {
        playerTwo.sprite.flipX = true;
      }

      playerTwo.sprite.x = x;
      playerTwo.sprite.y = y;
      playerTwo.moving = true;
    });
  }
}
