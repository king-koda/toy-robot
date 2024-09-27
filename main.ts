import { rotateDirections } from "./constants";
import { getErrorMessage } from "./helpers/getErrorMessage";
import { moveToyRobot } from "./helpers/moveToyRobot";
import { placeToyRobot } from "./helpers/placeToyRobot";
import { rotateToyRobot } from "./helpers/rotateToyRobot";
import { validateRobotLocation } from "./helpers/validateRobotLocation";
import Reader from "./Reader";
import { RobotLocation, RotateDirection } from "./types";

async function main() {
  // initial application state
  let exit = false;

  let currentLocation: RobotLocation = [0, 0, "DEFAULT"];

  while (!exit) {
    const reader = new Reader();

    // TODO: create help line to show how to use the commands
    const input = await reader
      .askQuestion(
        "What should we do with the Robot? PLACE, MOVE, REPORT, or EXIT?"
      )
      .then((input: string) => input.toUpperCase());

    switch (true) {
      case input === "EXIT":
        console.log("Exiting Application...");
        exit = true;
        break;
      case input === "REPORT":
        console.log("Reporting the Location of the Toy Robot...");
        try {
          validateRobotLocation(currentLocation);
          console.log(
            currentLocation[0] +
              "," +
              currentLocation[1] +
              "," +
              currentLocation[2]
          );
          console.log("Toy Robot Location Reported Successfully.");
        } catch (error) {
          console.log(getErrorMessage(error));
          console.log("Toy Robot Location not Reported.");
        }
        break;
      case input.includes("PLACE"):
        console.log("Placing Toy Robot...");
        try {
          const newLocation = await placeToyRobot(input, currentLocation);
          currentLocation = newLocation ? newLocation : currentLocation;
          console.log("Toy Robot Placed Successfully.");
        } catch (error) {
          console.log(getErrorMessage(error));
          console.log("Toy Robot not Placed.");
        }
        break;
      case input === "MOVE":
        console.log("Moving Toy Robot...");
        try {
          const newLocation = moveToyRobot(currentLocation);
          currentLocation = newLocation ? newLocation : currentLocation;
          console.log("Toy Robot Moved Successfully.");
        } catch (error) {
          console.log(getErrorMessage(error));
          console.log("Toy Robot not Moved.");
        }
        break;
      case rotateDirections[input as RotateDirection] !== undefined:
        console.log("Rotating Toy Robot...");
        try {
          const newLocation = rotateToyRobot(
            currentLocation,
            input as RotateDirection
          );
          currentLocation = newLocation ? newLocation : currentLocation;
          console.log("Toy Robot Rotated Successfully.");
        } catch (error) {
          console.log(getErrorMessage(error));
          console.log("Toy Robot not Rotated.");
        }
        break;
      default:
        console.log("Invalid command, try again.");
        break;
    }

    reader.closeReader();
  }
}

main();

export default main;
