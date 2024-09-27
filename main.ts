import { moveToyRobot } from "./helpers/moveToyRobot";
import { placeToyRobot } from "./helpers/placeToyRobot";
import Reader from "./Reader";
import { RobotLocation } from "./types";

async function main() {
  // initial application state
  let exit = false;

  let currentLocation: RobotLocation = [0, 0, null];

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
      case input.includes("PLACE"):
        console.info("Placing Toy Robot...");
        try {
          const newLocation = await placeToyRobot(input, currentLocation);
          currentLocation = newLocation ? newLocation : currentLocation;
        } catch (error) {
          console.log(error);
        }
        break;
      case input === "MOVE":
        console.info("Moving Toy Robot...");
        try {
          const newLocation = await moveToyRobot(currentLocation);
          currentLocation = newLocation ? newLocation : currentLocation;
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        console.log("Invalid command, try again.");
        break;
    }

    console.log("currentLocation", currentLocation);

    reader.closeReader();
  }
}

main();

export default main;
