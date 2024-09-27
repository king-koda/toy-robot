import { getErrorMessage } from "../helpers/getErrorMessage.util";
import { rotateToyRobot } from "../helpers/rotateToyRobot";
import { RobotLocation, RotateDirection } from "../types";

export const rotateCommand = (
  currentLocation: RobotLocation,
  rotateDirection: RotateDirection
): RobotLocation => {
  console.log("Rotating Toy Robot...");
  try {
    const newLocation = rotateToyRobot(currentLocation, rotateDirection);
    currentLocation = newLocation ? newLocation : currentLocation;
    console.log("Toy Robot Rotated Successfully.");
  } catch (error) {
    console.log(getErrorMessage(error));
    console.log("Toy Robot not Rotated.");
  }
  return currentLocation;
};
