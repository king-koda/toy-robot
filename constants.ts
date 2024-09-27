import { DirectionMap, Directions } from "./types";

export const directions: Directions = {
  NORTH: "NORTH",
  SOUTH: "SOUTH",
  EAST: "EAST",
  WEST: "WEST",
};

export const directionMap: DirectionMap = {
  NORTH: {
    LEFT: { direction: "WEST", matrice: [-1, 0] },
    RIGHT: { direction: "EAST", matrice: [1, 0] },
    DEFAULT: { direction: "NORTH", matrice: [0, 1] },
  },
  SOUTH: {
    LEFT: { direction: "EAST", matrice: [1, 0] },
    RIGHT: { direction: "WEST", matrice: [-1, 0] },
    DEFAULT: { direction: "SOUTH", matrice: [0, -1] },
  },
  EAST: {
    LEFT: { direction: "NORTH", matrice: [0, 1] },
    RIGHT: { direction: "SOUTH", matrice: [0, -1] },
    DEFAULT: { direction: "EAST", matrice: [1, 0] },
  },
  WEST: {
    LEFT: { direction: "SOUTH", matrice: [0, -1] },
    RIGHT: { direction: "NORTH", matrice: [0, 1] },
    DEFAULT: { direction: "WEST", matrice: [-1, 0] },
  },
};
