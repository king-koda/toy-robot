import { rotateDirections } from "./constants";
import Reader from "./Reader";
import { moveCommand } from "./commands/moveCommand";
import { placeCommand } from "./commands/placeCommand";
import { reportCommand } from "./commands/reportCommand";
import { rotateCommand } from "./commands/rotateCommand";
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
        reportCommand(currentLocation);
        break;
      case input.includes("PLACE"):
        currentLocation = placeCommand(currentLocation, input);
        break;
      case input === "MOVE":
        currentLocation = moveCommand(currentLocation);
        break;
      case rotateDirections[input as RotateDirection] !== undefined:
        currentLocation = rotateCommand(
          currentLocation,
          input as RotateDirection
        );
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
