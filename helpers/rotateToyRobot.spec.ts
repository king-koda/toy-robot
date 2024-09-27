import { RobotLocation, RotateDirection } from "../types";
import { rotateToyRobot } from "./rotateToyRobot";

describe("rotateToyRobot", () => {
  describe("When trying to rotate the Robot", () => {
    it("If the robot hasn't already been placed, throw an error", () => {
      const location: RobotLocation = [0, 0, null];
      const newDirection = "LEFT";

      const expectedError =
        "Robot has not been placed yet, try placing it first.";

      expect(() => rotateToyRobot(location, newDirection)).toThrowError(
        expectedError
      );
    });

    it("If the robot's current location is invalid for some reason, throw an error", async () => {
      const location: RobotLocation = [0, -1, "NORTH"];
      const newDirection = "LEFT";

      const expectedError = "Invalid location for the Robot.";

      expect(() => rotateToyRobot(location, newDirection)).toThrowError(
        expectedError
      );
    });

    it("If the robot's new location would be invalid from rotating, throw an error", async () => {
      const location: RobotLocation = [0, 0, "WEST"];
      const newDirection = "INVALID" as RotateDirection;

      const expectedError = "Invalid rotate direction for the Robot.";

      expect(() => rotateToyRobot(location, newDirection)).toThrowError(
        expectedError
      );
    });

    it("If the current location of the robot is valid and rotating it wouldn't result in an invalid new direction, return successfully with the new location and direction", async () => {
      const location: RobotLocation = [0, 0, "NORTH"];
      const newDirection = "LEFT";

      const expectedSuccess: RobotLocation = [0, 0, "WEST"];

      expect(rotateToyRobot(location, newDirection)).toEqual(expectedSuccess);
    });
  });
});
