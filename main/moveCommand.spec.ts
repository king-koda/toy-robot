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

describe("moveCommand", () => {
  let mockReader: Partial<ReadLine>;

  beforeEach(() => {
    vi.resetAllMocks(); // Reset all mocks before each test

    // Retrieve the mocked readline createInterface
    mockReader = createInterface({
      input: process.stdin,
      output: process.stdout,
    }) as Partial<ReadLine>;
  });

  describe("When trying to move the Robot", () => {
    it("If the move command is valid, and the new location is valid, the robot is moved, its location reported, and application exits after being instructed", async () => {
      const testInput = "MOVE";
      const placementCommand = "PLACE 2,3,NORTH";
      const startLocation = "2,3,NORTH";
      const endLocation = "2,4,NORTH";

      mockReader.question = vi
        .fn()
        .mockImplementationOnce((question, callback) => {
          callback(placementCommand);
        })
        .mockImplementationOnce((question, callback) => {
          callback("report");
        })
        .mockImplementationOnce((question, callback) => {
          callback(testInput);
        })
        .mockImplementationOnce((question, callback) => {
          callback("report");
        })
        .mockImplementationOnce((question, callback) => {
          callback("exit");
        });

      const logSpy = vi.spyOn(console, "log");

      // expect the application to exit its loop and return after successfully running
      expect(await main()).toBeUndefined();

      expect(logSpy).toHaveBeenCalledTimes(11);
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
      expect(logSpy).toHaveBeenNthCalledWith(6, "Moving Toy Robot...");
      expect(logSpy).toHaveBeenNthCalledWith(
        7,
        "Toy Robot Moved Successfully."
      );
      expect(logSpy).toHaveBeenNthCalledWith(
        8,
        "Reporting the Location of the Toy Robot..."
      );
      expect(logSpy).toHaveBeenNthCalledWith(9, endLocation);
      expect(logSpy).toHaveBeenNthCalledWith(
        10,
        "Toy Robot Location Reported Successfully."
      );
      expect(logSpy).toHaveBeenNthCalledWith(11, "Exiting Application...");
    });

    it("If the move command is invalid, an error is thrown, the robot isn't moved, its location reported, and application exits after being instructed", async () => {
      const testInput = "MOVE";
      const placementCommand = "PLACE 4,4,NORTH";
      const startLocation = "4,4,NORTH";
      const endLocation = "4,4,NORTH";

      mockReader.question = vi
        .fn()
        .mockImplementationOnce((question, callback) => {
          callback(placementCommand);
        })
        .mockImplementationOnce((question, callback) => {
          callback("report");
        })
        .mockImplementationOnce((question, callback) => {
          callback(testInput);
        })
        .mockImplementationOnce((question, callback) => {
          callback("report");
        })
        .mockImplementationOnce((question, callback) => {
          callback("exit");
        });

      const logSpy = vi.spyOn(console, "log");

      // expect the application to exit its loop and return after successfully running
      expect(await main()).toBeUndefined();

      expect(logSpy).toHaveBeenCalledTimes(12);
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
      expect(logSpy).toHaveBeenNthCalledWith(6, "Moving Toy Robot...");
      expect(logSpy).toHaveBeenNthCalledWith(
        7,
        "Invalid location for the Robot."
      );
      expect(logSpy).toHaveBeenNthCalledWith(8, "Toy Robot not Moved.");
      expect(logSpy).toHaveBeenNthCalledWith(
        9,
        "Reporting the Location of the Toy Robot..."
      );
      expect(logSpy).toHaveBeenNthCalledWith(10, endLocation);
      expect(logSpy).toHaveBeenNthCalledWith(
        11,
        "Toy Robot Location Reported Successfully."
      );
      expect(logSpy).toHaveBeenNthCalledWith(12, "Exiting Application...");
    });
  });
});
