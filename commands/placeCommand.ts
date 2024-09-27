import { getErrorMessage } from "../helpers/getErrorMessage.util";
import { placeToyRobot } from "../helpers/placeToyRobot";
import { RobotLocation } from "../types";

export const placeCommand = (currentLocation: RobotLocation, input: string) => {
  console.log("Placing Toy Robot...");
  try {
    const newLocation = placeToyRobot(input, currentLocation);
    currentLocation = newLocation ? newLocation : currentLocation;
    console.log("Toy Robot Placed Successfully.");
  } catch (error) {
    console.log(getErrorMessage(error));
    console.log("Toy Robot not Placed.");
  }
  return currentLocation;
};
