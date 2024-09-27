import { ReadLine, createInterface } from "readline";
import main from "./main";
import Reader from "./Reader";

// readline module mock with createInterface override
vi.mock("readline", async (importOriginal) => {
  // readline createInterface mock
  const mockReader = {
    question: vi.fn(),
    close: vi.fn(),
  };

  return {
    ...(await importOriginal()),
    createInterface: () => mockReader,
  };
});

describe("Main Tests", () => {
  let mockReader: Partial<ReadLine>;

  beforeEach(() => {
    vi.resetAllMocks(); // Reset all mocks before each test

    // Retrieve the mocked readline createInterface
    mockReader = createInterface({
      input: process.stdin,
      output: process.stdout,
    }) as Partial<ReadLine>;
  });

  describe("When running the Application", () => {
    describe("When trying to exit the Application", () => {
      it("If the user inputs 'exit' to the Application, the Application exits", async () => {
        const reader = new Reader();
        const expectedInput = "exit";

        mockReader.question = vi
          .fn()
          .mockImplementation((question, callback) => {
            callback("exit");
          });

        // expect the application to exit its loop and return
        expect(main()).resolves.toBeUndefined();

        // ensure that the user input returned with the expected value
        expect(reader.askQuestion("test")).resolves.toBe(expectedInput);
      });

      it("If the user inputs 'EXIT' to the Application, the Application exits", async () => {
        const reader = new Reader();
        const expectedInput = "EXIT";

        mockReader.question = vi
          .fn()
          .mockImplementation((question, callback) => {
            callback("EXIT");
          });

        // expect the application to exit its loop and return
        expect(main()).resolves.toBeUndefined();

        // ensure that the user input returned with the expected value
        expect(reader.askQuestion("test")).resolves.toBe(expectedInput);
      });
    });
  });
});
