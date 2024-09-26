import { ReadLine } from "readline";
import readline from "node:readline";

let reader: ReadLine;

export const startReader = async () => {
  reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  console.info("reader started");
  return reader;
};

export const closeReader = () => {
  if (reader) {
    reader.close();
    console.info("reader closed");
  }
};

export const askQuestion = (question: string): Promise<string> =>
  new Promise((answer) => reader.question(question, answer));
