import { getErrorMessage } from "../helpers/getErrorMessage.util";
import { moveToyRobot } from "../helpers/moveToyRobot";
import { RobotLocation } from "../types";

export const moveCommand = (currentLocation: RobotLocation): RobotLocation => {
  console.log("Moving Toy Robot...");
  try {
    const newLocation = moveToyRobot(currentLocation);
    currentLocation = newLocation ? newLocation : currentLocation;
    console.log("Toy Robot Moved Successfully.");
  } catch (error) {
    console.log(getErrorMessage(error));
    console.log("Toy Robot not Moved.");
  }
  return currentLocation;
};
