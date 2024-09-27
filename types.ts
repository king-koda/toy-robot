export type Direction = "NORTH" | "SOUTH" | "EAST" | "WEST";

export type Directions = {
  [D in Direction]: string;
};

export type RobotLocation = [number, number, Direction | null];

export type RotateDirection = "LEFT" | "RIGHT" | "DEFAULT";

export type DirectionMatrice = [number, number];

export type DirectionMap = {
  [key in Direction]: {
    [key in RotateDirection]: {
      direction: Direction;
      matrice: DirectionMatrice;
    };
  };
};
