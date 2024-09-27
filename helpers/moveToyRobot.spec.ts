import { RobotLocation } from "../types";
import { moveToyRobot } from "./moveToyRobot";

describe("moveToyRobot", () => {
  describe("When trying to move the Robot", () => {
    it("If the robot hasn't already been placed, throw an error", () => {
      const location: RobotLocation = [0, 0, null];

      const expectedError =
        "Robot has not been placed yet, try placing it first.";

      expect(() => moveToyRobot(location)).toThrowError(expectedError);
    });

    it("If the robot's current location is invalid for some reason, throw an error", () => {
      const location: RobotLocation = [0, -1, "NORTH"];

      const expectedError = "Invalid location for the Robot.";

      expect(() => moveToyRobot(location)).toThrowError(expectedError);
    });

    it("If the robot's new location would be invalid from moving, throw an error", () => {
      const location: RobotLocation = [0, 0, "WEST"];

      const expectedError = "Invalid location for the Robot.";

      expect(() => moveToyRobot(location)).toThrowError(expectedError);
    });

    it("If the current location of the robot is valid and moving it wouldn't result in an invalid new location, return successfully with the new location", () => {
      const location: RobotLocation = [0, 0, "NORTH"];

      const expectedSuccess: RobotLocation = [0, 1, "NORTH"];

      expect(moveToyRobot(location)).toEqual(expectedSuccess);
    });
  });
});
