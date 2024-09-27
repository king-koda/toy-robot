import { RobotLocation } from "../types";

export const validateNewRobotLocation = (newLocation: RobotLocation) => {
  if (
    newLocation[0] < 0 ||
    newLocation[0] > 4 ||
    newLocation[1] < 0 ||
    newLocation[1] > 4
  ) {
    const error = "Invalid new location for the Robot.";
    throw new Error(error);
  }
};
