import { directionMap } from "../constants";
import { RobotLocation } from "../types";
import { validateRobotLocation } from "./validateRobotLocation";

export const moveToyRobot = async (
  currentLocation: RobotLocation
): Promise<RobotLocation> => {
  const currentDirection = currentLocation[2];

  if (currentDirection === null) {
    const error = "Robot has not been placed yet.";
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
