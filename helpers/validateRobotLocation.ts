import { RobotLocation } from "../types";

export const validateRobotLocation = (location: RobotLocation) => {
  if (
    location[0] < 0 ||
    location[0] > 4 ||
    location[1] < 0 ||
    location[1] > 4
  ) {
    const error = "Invalid location for the Robot.";
    throw new Error(error);
  }
};
