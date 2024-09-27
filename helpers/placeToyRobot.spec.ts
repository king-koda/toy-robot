import { RobotLocation } from "../types";
import { placeToyRobot } from "./placeToyRobot";

describe("placeToyRobot", () => {
  describe("When trying to place the Robot", () => {
    it("If the robot has already been placed indicative by the direction paramater in the location, throw an error", async () => {
      const passingInput = "PLACE 2,3,NORTH";
      const location: RobotLocation = [0, 0, "NORTH"];

      const expectedError = "Robot already placed, try again.";

      expect(placeToyRobot(passingInput, location)).rejects.toThrowError(
        expectedError
      );
    });

    it("If the user's input results in more than 4 parameters, throw an error", async () => {
      const failingInput = "PLACE 2,3,NORTH,BYE";
      const location: RobotLocation = [0, 0, null];

      const expectedError = "Invalid PLACE command, try again.";

      expect(placeToyRobot(failingInput, location)).rejects.toThrowError(
        expectedError
      );
    });

    it("If the first value of the 4 parameters does not equal PLACE, throw an error", async () => {
      const failingInput = "INVALID 2,3,NORTH";
      const location: RobotLocation = [0, 0, null];

      const expectedError = "Invalid PLACE command, try again.";

      expect(placeToyRobot(failingInput, location)).rejects.toThrowError(
        expectedError
      );
    });

    it("If the second value of the 4 parameters does not equal a number, throw an error", async () => {
      const failingInput = "PLACE A,3,NORTH";
      const location: RobotLocation = [0, 0, null];

      const expectedError = "Invalid PLACE command, try again.";

      expect(placeToyRobot(failingInput, location)).rejects.toThrowError(
        expectedError
      );
    });

    it("If the third value of the 4 parameters does not equal a number, throw an error", async () => {
      const failingInput = "PLACE 2,A,NORTH";
      const location: RobotLocation = [0, 0, null];

      const expectedError = "Invalid PLACE command, try again.";

      expect(placeToyRobot(failingInput, location)).rejects.toThrowError(
        expectedError
      );
    });

    it("If the fourth value of the 4 parameters does not equal a valid direction, throw an error", async () => {
      const failingInput = "PLACE 2,A,WEAST";
      const location: RobotLocation = [0, 0, null];

      const expectedError = "Invalid PLACE command, try again.";

      expect(placeToyRobot(failingInput, location)).rejects.toThrowError(
        expectedError
      );
    });

    it("If the new location for the robot would out of bounds, throw an error", async () => {
      const failingInput = "PLACE -1,-1,EAST";
      const location: RobotLocation = [0, 0, null];

      const expectedError = "Invalid location for the Robot.";

      expect(placeToyRobot(failingInput, location)).rejects.toThrowError(
        expectedError
      );
    });

    it("If the command and placement location is valid, return the new location", async () => {
      const failingInput = "PLACE 2,2,EAST";
      const location: RobotLocation = [0, 0, null];

      const expectedSuccess = [2, 2, "EAST"];

      expect(placeToyRobot(failingInput, location)).resolves.toEqual(
        expectedSuccess
      );
    });
  });
});
