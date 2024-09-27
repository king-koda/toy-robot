import { ReadLine, createInterface } from "readline";
import main from "../main";

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

describe("reportCommand", () => {
  let mockReader: Partial<ReadLine>;

  beforeEach(() => {
    vi.resetAllMocks(); // Reset all mocks before each test

    // Retrieve the mocked readline createInterface
    mockReader = createInterface({
      input: process.stdin,
      output: process.stdout,
    }) as Partial<ReadLine>;
  });

  describe("When trying to report the location of the Robot", () => {
    it("If the report command is valid, its location is reported, and application exits after being instructed", async () => {
      const testInput = "REPORT";
      const placementCommand = "PLACE 2,3,NORTH";
      const startLocation = "2,3,NORTH";

      mockReader.question = vi
        .fn()
        .mockImplementationOnce((question, callback) => {
          callback(placementCommand);
        })
        .mockImplementationOnce((question, callback) => {
          callback(testInput);
        })
        .mockImplementationOnce((question, callback) => {
          callback("exit");
        });

      const logSpy = vi.spyOn(console, "log");

      // expect the application to exit its loop and return after successfully running
      expect(await main()).toBeUndefined();

      expect(logSpy).toHaveBeenCalledTimes(6);
      expect(logSpy).toHaveBeenNthCalledWith(1, "Placing Toy Robot...");
      expect(logSpy).toHaveBeenNthCalledWith(
        2,
        "Toy Robot Placed Successfully."
      );
      expect(logSpy).toHaveBeenNthCalledWith(
        3,
        "Reporting the Location of the Toy Robot..."
      );
      expect(logSpy).toHaveBeenNthCalledWith(4, startLocation);
      expect(logSpy).toHaveBeenNthCalledWith(
        5,
        "Toy Robot Location Reported Successfully."
      );
      expect(logSpy).toHaveBeenNthCalledWith(6, "Exiting Application...");
    });

    it("If the report command is invalid, an error is thrown, and application exits after being instructed", async () => {
      const testInput = "REPORTED";
      const placementCommand = "PLACE 2,3,NORTH";
      const startLocation = "2,3,NORTH";

      mockReader.question = vi
        .fn()
        .mockImplementationOnce((question, callback) => {
          callback(placementCommand);
        })
        .mockImplementationOnce((question, callback) => {
          callback(testInput);
        })
        .mockImplementationOnce((question, callback) => {
          callback("exit");
        });

      const logSpy = vi.spyOn(console, "log");

      // expect the application to exit its loop and return after successfully running
      expect(await main()).toBeUndefined();

      expect(logSpy).toHaveBeenCalledTimes(4);
      expect(logSpy).toHaveBeenNthCalledWith(1, "Placing Toy Robot...");
      expect(logSpy).toHaveBeenNthCalledWith(
        2,
        "Toy Robot Placed Successfully."
      );
      expect(logSpy).toHaveBeenNthCalledWith(3, "Invalid command, try again.");
      expect(logSpy).toHaveBeenNthCalledWith(4, "Exiting Application...");
    });
  });
});
