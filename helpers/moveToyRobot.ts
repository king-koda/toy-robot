import { directionMap } from "../constants";
import { RobotLocation } from "../types";
import { validateRobotLocation } from "./validateRobotLocation";

export const moveToyRobot = (currentLocation: RobotLocation): RobotLocation => {
  const currentDirection = currentLocation[2];

  if (currentDirection === "DEFAULT") {
    const error = "Robot has not been placed yet, try placing it first.";
    throw new Error(error);
  }

  validateRobotLocation(currentLocation);

  const newLocationMatrice = directionMap[currentDirection]["DEFAULT"].matrice;
  const newLocation: RobotLocation = [
    currentLocation[0] + newLocationMatrice[0],
    currentLocation[1] + newLocationMatrice[1],
    currentDirection,
  ];

  validateRobotLocation(newLocation);

  return newLocation;
};
