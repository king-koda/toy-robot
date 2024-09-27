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

describe("placeCommand", () => {
  let mockReader: Partial<ReadLine>;

  beforeEach(() => {
    vi.resetAllMocks(); // Reset all mocks before each test

    // Retrieve the mocked readline createInterface
    mockReader = createInterface({
      input: process.stdin,
      output: process.stdout,
    }) as Partial<ReadLine>;
  });

  describe("When trying to place the Robot", () => {
    beforeEach(() => {
      vi.resetAllMocks();
    });

    it("If the place command is valid, the robot is placed, its location reported, and application exits after being instructed", async () => {
      const validInput = "PLACE 2,3,NORTH";
      const startLocation = "0,0,DEFAULT";
      const endLocation = "2,3,NORTH";

      mockReader.question = vi
        .fn()
        .mockImplementationOnce((question, callback) => {
          callback("report");
        })
        .mockImplementationOnce((question, callback) => {
          callback(validInput);
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

      expect(logSpy).toHaveBeenCalledTimes(9);
      expect(logSpy).toHaveBeenNthCalledWith(
        1,
        "Reporting the Location of the Toy Robot..."
      );
      expect(logSpy).toHaveBeenNthCalledWith(2, startLocation);
      expect(logSpy).toHaveBeenNthCalledWith(
        3,
        "Toy Robot Location Reported Successfully."
      );
      expect(logSpy).toHaveBeenNthCalledWith(4, "Placing Toy Robot...");
      expect(logSpy).toHaveBeenNthCalledWith(
        5,
        "Toy Robot Placed Successfully."
      );
      expect(logSpy).toHaveBeenNthCalledWith(
        6,
        "Reporting the Location of the Toy Robot..."
      );
      expect(logSpy).toHaveBeenNthCalledWith(7, endLocation);
      expect(logSpy).toHaveBeenNthCalledWith(
        8,
        "Toy Robot Location Reported Successfully."
      );
      expect(logSpy).toHaveBeenNthCalledWith(9, "Exiting Application...");
    });

    it("If the place command is invalid, error message is displayed, the robot isn't placed, its location reported, and application exits after being instructed", async () => {
      const testInput = "PLACE -1,3,NORTH";
      const expectedLocation = "0,0,DEFAULT";

      mockReader.question = vi
        .fn()
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

      expect(logSpy).toHaveBeenCalledTimes(7);
      expect(logSpy).toHaveBeenNthCalledWith(1, "Placing Toy Robot...");
      expect(logSpy).toHaveBeenNthCalledWith(
        2,
        "Invalid location for the Robot."
      );
      expect(logSpy).toHaveBeenNthCalledWith(3, "Toy Robot not Placed.");
      expect(logSpy).toHaveBeenNthCalledWith(
        4,
        "Reporting the Location of the Toy Robot..."
      );
      expect(logSpy).toHaveBeenNthCalledWith(5, expectedLocation);
      expect(logSpy).toHaveBeenNthCalledWith(
        6,
        "Toy Robot Location Reported Successfully."
      );
      expect(logSpy).toHaveBeenNthCalledWith(7, "Exiting Application...");
    });
  });
});
