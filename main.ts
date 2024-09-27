import Reader from "./Reader";

async function main() {
  // initial application state
  let exit = false;

  while (!exit) {
    const reader = new Reader();

    // TODO: create help line to show how to use the commands
    const answer = await reader
      .askQuestion(
        "What should we do with the Robot? PLACE, MOVE, REPORT, or EXIT?"
      )
      .then((answer: string) => answer.toUpperCase());

    if (answer === "EXIT") {
      exit = true;
    }

    reader.closeReader();
  }
  process.exit(0);
}

main();

export default main;
