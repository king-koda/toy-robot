export type Direction = "NORTH" | "SOUTH" | "EAST" | "WEST";

export type Directions = {
  [D in Direction]: string;
};

export type RobotLocation = [number, number, Direction | null];

