import { directions } from "../constants";
import { Direction, RobotLocation } from "../types";
import { validateRobotLocation } from "./validateRobotLocation";

export const placeToyRobot = (
  input: string,
  robotLocation: RobotLocation
): RobotLocation => {
  // check before placing if the robot has already been placed
  if (robotLocation[2] !== "DEFAULT") {
    const error = "Robot already placed, try again.";
    throw new Error(error);
  }

  // split the command input into an array, removing any whitespace or commas
  const inputArray = input.split(/[\s,]+/);

  const command = inputArray[0];
  const xPosition = parseInt(inputArray[1]);
  const yPosition = parseInt(inputArray[2]);
  const direction = inputArray[3];

  // validate the array values match the necessary parameters for the PLACE command
  if (
    // if the array has more than 4 values, exit
    inputArray.length !== 4 ||
    // if the command is not PLACE, exit
    command !== "PLACE" ||
    // if the x or y position are not numbers, exit
    isNaN(xPosition) ||
    isNaN(yPosition) ||
    // if the direction is not valid, exit
    directions[direction as Direction] === undefined
  ) {
    const error = "Invalid PLACE command, try again.";
    throw new Error(error);
  }

  validateRobotLocation([xPosition, yPosition, direction as Direction]);

  return [xPosition, yPosition, direction as Direction];
};
