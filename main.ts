import { askQuestion, closeReader, startReader } from "./reader";

// initial application state
let exit = false;

(async () => {
  while (!exit) {
    console.log("hey");
    await startReader();

    // TODO: create help line to show how to use the commands
    const answer = await askQuestion(
      "What should we do with the Robot? PLACE, MOVE, REPORT, or EXIT?"
    );

    if (answer === "EXIT") {
      exit = true;
    }

    closeReader();
  }
  process.exit(0);
})();
