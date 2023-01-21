import {
  PLAYER_SPEED,
  SHIP_HEIGHT,
  SHIP_WIDTH,
  LEVEL_BOUNDS,
} from "./constants";

const isWithinMovementBoundaries = (x, y) => {
  return !LEVEL_BOUNDS[y] ? true : !LEVEL_BOUNDS[y].includes(x);
};

export const movePlayer = (keys, player) => {
  let playerMoved = false;
  let absPlayerX = player.x + SHIP_WIDTH / 2;
  let absPlayerY = player.y + SHIP_HEIGHT / 2 + 20;

  if (
    keys.includes("ArrowUp") &&
    isWithinMovementBoundaries(absPlayerX, absPlayerY + PLAYER_SPEED)
  ) {
    playerMoved = true;
    player.y = player - PLAYER_SPEED;
  }
};
