import { ReadLine } from "readline";
import { createInterface } from "readline";

export class Reader {
  reader: ReadLine;

  constructor() {
    this.reader = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  closeReader = () => {
    if (this.reader) {
      this.reader.close();
    }
  };

  askQuestion = (question: string): Promise<string> =>
    new Promise((resolve) =>
      this.reader.question(question, (answer) => {
        resolve(answer);
      })
    );
}

export default Reader;
