import { directionMap } from "../constants";
import { RobotLocation, RotateDirection } from "../types";
import { validateRobotLocation } from "./validateRobotLocation";

export const rotateToyRobot = (
  currentLocation: RobotLocation,
  rotateDirection: RotateDirection
): RobotLocation => {
  const currentDirection = currentLocation[2];

  if (currentDirection === null) {
    const error = "Robot has not been placed yet, try placing it first.";
    throw new Error(error);
  }

  validateRobotLocation(currentLocation);

  if (!directionMap[currentDirection][rotateDirection]?.direction) {
    const error = "Invalid rotate direction for the Robot.";
    throw new Error(error);
  }

  const newDirection =
    directionMap[currentDirection][rotateDirection].direction;

  const newLocation: RobotLocation = [
    currentLocation[0],
    currentLocation[1],
    newDirection,
  ];

  return newLocation;
};
